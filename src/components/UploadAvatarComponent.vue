<template>
  <div>
    <input type="file" @change="onImageChange($event)" />
    <img v-if="imageUrl" :src="imageUrl" style="width: 100px; overflow: hidden; margin: 0;"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { ActionTypes } from '@/constant'

interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}

@Component
export default class UploadAvatarComponent extends Vue {
  isUploading: boolean = false
  imageUrl: string = ''

  @Watch('imageUrl')
  imageChange (newVal: any, oldVal: any) {
    this.imageUrl = this.$store.state.profile.avatar_url
  }

  checkImage () {
    this.imageUrl = this.$store.state.profile.avatar_url
  }

  onImageChange (event: HTMLInputEvent) {
    debugger
    const files = event.target.files || null
    if (files === null) {
      return
    }

    if (!files.length) {
      return
    }

    this.isUploading = true
    this.$store.dispatch(ActionTypes.UPLOAD_AVATAR, { file: files[0] }).then((success) => {
      debugger
      this.checkImage()
      this.isUploading = false
    })
  }

  beforeMount () {
    this.checkImage()
  }
}
</script>

<style>
  input[type="file"] {
    opacity:0;
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
  }
</style>

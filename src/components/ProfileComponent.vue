<template>
  <div class="row">
    <div class="col-md-auto ml-3 mr-3">
      <UploadAvatarComponent v-if="imageUrl !== ''" :imageUrl="imageUrl"/>
    </div>

    <div class="col">
      <h4 class="text-white">Profile</h4>
      <p class="text-light mb-1">{{username}}</p>
      <p class="text-light mb-1">{{email}}<small class="text-muted pl-5">join on {{createdAt | formatDate}}</small></p>
    </div>

    <div class="col col-md-4 text-right mr-3">
      <ul class="list-unstyled" style="margin-bottom: 0px! important;">
        <li style="padding: .15rem 0">
          <router-link :to="{ name: 'my-recipes' }" class="text-white">My recipes</router-link>
        </li>
        <li style="padding: .15rem 0">
          <a @click.stop="logoutUser()" href="" class="text-white">Logout</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { ActionTypes } from '@/constant'
import UploadAvatarComponent from '@/components/UploadAvatarComponent.vue'

@Component({
  components: {
    UploadAvatarComponent
  }
})
export default class ProfileComponent extends Vue {
  username: string = ''
  email: string = ''
  createdAt: string = ''
  imageUrl: string = ''

  updateUser () {
    this.username = this.$store.state.profile.username
    this.email = this.$store.state.profile.email
    this.createdAt = this.$store.state.profile.createdAt
    this.imageUrl = this.$store.state.profile.imageUrl
  }

  checkProfile () {
    if (this.$store.state.isLogin) {
      this.$store.dispatch(ActionTypes.GET_USER, { username: 'me' }).then((success) => {
        this.updateUser()
      })
    }
  }

  logoutUser() {
    this.$store.dispatch(ActionTypes.LOGOUT).then((success) => {
      this.$router.push({name: 'home'})
    })
    // add emit
  }

// Object.keys(this.$store.state.profile).length === 0
  beforeMount () {
    this.checkProfile()
  }

  destoryed () {
  }
}
</script>

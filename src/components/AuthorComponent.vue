<template>
<div class="col-md-12">
  <div class="media">
    <img width="64px" height="64px" :src="author.avatar_url" class="mr-3" alt="">
    <div class="media-body">
      <h5 class="mt-0">{{author.username}}</h5>
      join smile cook on {{author.created_at | formatDate}}.
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { ActionTypes } from '@/constant'
import { UserItem } from '@/response'

@Component({
  props: {
    username: String
  }
})
export default class AuthorComponent extends Vue {

  get author () : UserItem | null {
    try {
      return (<any>this.$store.state).author
    } catch (e) {
      return null
    }
  }

  fetchAuthor () {
    this.$store.dispatch(ActionTypes.GET_AUTHOR, { username: this.$props.username }).then(() => {

    })
  }

  beforeMount () {
    this.fetchAuthor()
  }
}
</script>

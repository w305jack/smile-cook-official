<template>
<div class="row mb-2">
    <div class="col-md-12 pb-3 pl-3 pr-3">
      <h2>Author</h2>
    </div>

    <AuthorComponent :username="username"/>

    <div class="col-md-12 pt-5">
      <h2>His creation</h2>
    </div>

    <SearchComponent />
    <RecipeItemComponent v-for="recipeItem in recipes" :recipeItem="recipeItem" :key="recipeItem.id" />
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ActionTypes } from '@/constant'
import { UserItem, RecipeItem } from '@/response'
import AuthorComponent from '@/components/AuthorComponent.vue'
import RecipeItemComponent from '@/components/RecipeItemComponent.vue'
import SearchComponent from '@/components/SearchComponent.vue'

@Component({
  components: {
    AuthorComponent,
    RecipeItemComponent,
    SearchComponent
  }
})
export default class AuthorView extends Vue {

  page: number = 1
  perPage: number = 10
  sort: string = 'created_at'
  order: string = 'desc'
  visibility: string = 'public'

  get recipes () : Array<RecipeItem> {
    try{
      return (<any>this.$store.state).recipeList;
    } catch (e) {
      return []
    }      
  }





  username : string = ''

  fetchRecipeList () {
    this.$store.dispatch(ActionTypes.GET_USER_RECIPE_LIST, { username: this.username, page: this.page, perPage: this.perPage, sort: this.sort, order: this.order, visibility: this.visibility }).then(() => {

    })
  }

  beforeMount () {
    this.username = this.$route.params['username']
    this.fetchRecipeList()
  }
}
</script>

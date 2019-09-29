<template>
<div class="row mb-2">
    <SearchComponent />
    <RecipeItemComponent v-for="recipeItem in recipes" :recipeItem="recipeItem" :key="recipeItem.id" />
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ActionTypes } from '@/constant'
import { RecipeItem } from '@/response'
import RecipeItemComponent from '@/components/RecipeItemComponent.vue'
import SearchComponent from '@/components/SearchComponent.vue'

@Component({
  components: {
    RecipeItemComponent,
    SearchComponent
  }
})
export default class MyRecipeListView extends Vue {

  page: number = 1
  perPage: number = 10
  sort: string = 'created_at'
  order: string = 'desc'
  visibility: string = 'all'

  get recipes () : Array<RecipeItem> {
    try{
      return (<any>this.$store.state).recipeList;
    } catch (e) {
      return []
    }      
  }

  beforeMount () {
    this.$store.dispatch(ActionTypes.GET_USER_RECIPE_LIST, { username: 'me', page: this.page, perPage: this.perPage, sort: this.sort, order: this.order, visibility: this.visibility }).then(() => {})
  }
}
</script>

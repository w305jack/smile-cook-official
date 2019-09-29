<template>
  <!-- <div class="row">
    <div v-for="recipe in recipes" class="col-md-4">
      <div class="card mb-4 shadow-sm">
        <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail">
          <title></title>
          <rect width="100%" height="100%" fill="#55595c"></rect>
          <text x="10%" y="10%" fill="#eceeef" dy=".3em">{{recipe.name}}</text>
        </svg>
        <div class="card-body">
          <p class="card-text">{{recipe.description}}</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <p>{{recipe.cook_time}} mins</p>
              <!-- <button type="button" class="btn btn-sm btn-outline-secondary">View</button> -->
              <!-- <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button> -->
            <!-- </div>
            <small class="text-muted">{{recipe.created_at | formatDate}}</small>
          </div>
        </div>
      </div>
    </div>
  </div> -->
<div class="row mb-2">
  <SearchComponent />
  <RecipeItemComponent v-for="recipeItem in recipes" :recipeItem="recipeItem" :key="recipeItem.id" />
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import RecipeItemComponent from '@/components/RecipeItemComponent.vue'
import SearchComponent from '@/components/SearchComponent.vue'


@Component({
  components: {
    RecipeItemComponent,
    SearchComponent
  }
})
export default class RecipeListView extends Vue {
  page = 1
  perPage = 9
  sort = 'created_at'
  order = 'desc'

  get recipes () : Array<object> {
    try{
      return (<any>this.$store.state).recipeList;
    } catch (e) {
      return []
    } 
  }

  beforeMount () {
    this.$store.dispatch('GET_RECIPE_LIST', { page: this.page, perPage: this.perPage, sort: this.sort, order: this.order }).then(() => {})
  }
}
</script>

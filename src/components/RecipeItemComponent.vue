<template>
  <div class="col-md-12">
    <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
      <div class="col p-4 d-flex flex-column position-static">
        <div class="row">
          <div class="col">
            <h3 class="mb-2">{{recipeItem.name}}</h3>
          </div>
          <div v-if="isAuthor()" class="col-2 badge">
            <span v-if="!recipeItem.is_publish" class="badge badge-danger">close</span>
            <span v-if="recipeItem.is_publish" class="badge badge-success">open</span>
          </div>
        </div>
        <div class="row mb-auto mt-3">
          <div class="col-10">
            <p class="card-text">{{recipeItem.description}}...&nbsp;<router-link :to="{ name: 'recipe-detail', params: { recipeId: recipeItem.id }}" class="stretched-link">See more</router-link></p>
          </div>
        </div>
        <div class="mb-0 text-muted">Cooking in <strong>{{recipeItem.cook_time}}</strong> min(s) and offer <strong>{{recipeItem.num_of_servings}}</strong> people.</div>
      </div>
      <div class="col-auto d-none d-lg-block">
        <svg class="bd-placeholder-img" width="250" height="250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ActionTypes } from '@/constant'
import { RecipeItem } from '@/response'

@Component({
  props: {
    recipeItem: Object
  }
})
export default class RecipeItemComponent extends Vue {
  isAuthor () : boolean {
    return (this.$store.state.profile.username === this.$props.recipeItem.author.username && this.$route.name === 'my-recipes')
  }

  beforeMount () {
  }
}
</script>

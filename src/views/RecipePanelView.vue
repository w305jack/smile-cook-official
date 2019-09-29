<template>
  <div class="row">
    <div class="col-md-12">
      <h4 v-if="mode === 'create'" class="py-3 text-center">Create recipe</h4>
      <h4 v-if="mode === 'edit'" class="py-3 text-center">Edit recipe</h4>

      <form class="needs-validation" novalidate="">
        <div class="row justify-content-center py-3">
          <div class="col-md-6">
            <label for="name">Name</label>
            <input v-model="inputItem.name" type="text" class="form-control" id="name" />
            <div class="invalid-feedback">
              Please enter name.
            </div>
          </div>
        </div>

        <div class="row justify-content-center py-3">
          <div class="col-md-6">
            <label for="description">Description</label>
            <textarea v-model="inputItem.description" type="text" class="form-control" id="description" placeholder=""/>
            <div class="invalid-feedback">
              Please enter description.
            </div>
          </div>
        </div>


        <div class="row justify-content-center py-3">
          <div class="col-md-6">
            <label for="num_of_servings">Number of servings</label>
            <input v-model="inputItem.num_of_servings" type="text" class="form-control" id="num_of_servings" placeholder=""/>
            <div class="invalid-feedback">
              Please enter number of servings.
            </div>
          </div>
        </div>

        <div class="row justify-content-center py-3">
          <div class="col-md-6">
            <label for="cook_time">Cook time</label>
            <input v-model="inputItem.cook_time" type="text" class="form-control" id="cook_time" placeholder=""/>
            <div class="invalid-feedback">
              Please enter cook_time.
            </div>
          </div>
        </div>

        <div class="row justify-content-center py-3">
          <div class="col-md-6">
            <label for="directions">Directions</label>
            <input v-model="inputItem.directions" type="text" class="form-control" id="directions" placeholder=""/>
            <div class="invalid-feedback">
              Please enter directions.
            </div>
          </div>
        </div>

        <hr class="mb-4 col-md-6 justify-content-center">

        <div class="row pb-3 justify-content-center">
          <div class="col-md-6">
            <button @click.once="submitRecipe()" class="btn btn-primary btn-lg btn-block" type="button">submit</button>
          </div>
        </div>
      </form>
    </div>

    
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { router } from '@/router'
import { ActionTypes } from '@/constant'

export interface InputItem {
  id: number | null
  name: string
  description: string
  num_of_servings: number
  cook_time: number
  directions: string
}

@Component
export default class LoginView extends Vue {
  inputItem = <InputItem>{}
  // confirmPassword: string = ''

  mode : string = 'create'


  submitRecipe() {
    const recipe = {
      id: this.inputItem.id || null,
      name: this.inputItem.name || '',
      description: this.inputItem.description || '',
      num_of_servings: this.inputItem.num_of_servings || 1,
      cook_time: this.inputItem.cook_time || 1,
      directions: this.inputItem.directions || ''
    }
    if (this.mode === 'create') {
      this.$store.dispatch(ActionTypes.CREATE_RECIPE, { recipe: recipe }).then((success)=>{
        router.back()
      })
    } else {
      this.$store.dispatch(ActionTypes.UPDATE_RECIPE, { recipe: recipe }).then((success)=>{
        router.back()
      })
    }
  }

  checkMode () {
    if (this.$route.name === 'edit-recipe') {
      this.mode = 'edit'
    }
  }

  preEdit () {
    this.inputItem = { ...this.$store.state.recipe }
  }

  fetchRecipe () {
    if (this.mode === 'edit') {
      const recipeId = this.$route.params['recipeId']
      if (String(this.$store.state.recipe.id) !== recipeId) {
        this.$store.dispatch(ActionTypes.GET_RECIPE, { recipeId: recipeId }).then((success)=>{
          this.preEdit()
        })
      }
    }
  }

  beforeMount () {
    this.checkMode()
    if (this.mode === 'edit') {
      this.fetchRecipe()
    }
    // this.$store.dispatch('GET_RECIPE_LIST', {page: this.page, perPage: this.perPage, sort: this.sort, order: this.order}).then(() => {})
  }
}
</script>

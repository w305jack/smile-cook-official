<template>
<div class="row">
  <div class="col-12 blog-main">
    <div class="blog-post">
      <div class="row pt-3 pb-3">
        <div class="col">
          <h1 class="blog-post-title">{{recipe.name}}</h1>
        </div>

        <div v-if="isAuthor" class="btn-group col-auto mt-auto mb-auto" role="group" aria-label="Basic example">
          <button v-if="!recipe.is_publish" @click.stop="setConfirmDialog('publish', publishRecipe)" class="btn btn-outline-success">Publish</button>
          <button v-if="recipe.is_publish" @click.stop="setConfirmDialog('unpublish', unpublishRecipe)" class="btn btn-outline-danger">Unpublish</button>
          <router-link :to="{ name: 'edit-recipe' , params: { recipeId: recipe.id }}" class="btn btn-outline-secondary">Edit</router-link>
          <button @click.stop="setConfirmDialog('delete', deleteRecipe)" class="btn btn-outline-secondary">Delete</button>
        </div>
      </div>


      <div class="row">
        <div class="col mb-auto mt-auto">
          <p class="blog-post-meta">last update on {{recipe.updated_at | formatDate}} by <router-link :to="{ name: 'author', params: { username: username }}">{{username}}</router-link></p>
        </div>

        <div class="col-3 text-right">
          <p class="text-info">serving: {{recipe.num_of_servings}} people</p>
          <p class="text-info">cooking time: {{recipe.cook_time}} min(s)</p>
        </div>
      </div>

      <hr>
      <h4>Description</h4>
      <p>{{recipe.description}}</p>

      <hr>
      <h4>Let do it</h4>
      <p>{{recipe.directions}}</p>
    </div>
  </div>

  <div :class="{ show: showComfirmDialog}" class="modal fade" tabindex="-1" role="dialog" :style="{ display: confirmDialogDisplay }" >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{confirmDialog.title}}</h5>
          <button @click.stop="closeConfirmDialog()" type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span>&times;</span>
          </button>
        </div>
        <div class="modal-body">
          {{confirmDialog.msg}}
        </div>
        <div class="modal-footer">
          <button @click.stop="closeConfirmDialog()" type="button" class="btn btn-secondary" data-dismiss="modal" >No</button>
          <button @click.stop="confirmDialog.callback()" type="button" class="btn btn-primary">Yes</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ActionTypes } from '@/constant'
import { RecipeItem, AlertItem } from '@/response'

export interface ConfirmDialogItem {
  status: string,
  title: string,
  msg: string,
  hasConfirmButton: boolean,
  hasCancelButton: boolean,
  callback: any
}

@Component 
export default class RecipeDetailView extends Vue {
  username : String = ''
  showComfirmDialog : boolean = false
  confirmDialogDisplay = 'none'
  confirmDialog: ConfirmDialogItem = {}
  recipeId: string | null = null 

  get recipe () : RecipeItem {
    try{
      return (<any>this.$store.state).recipe;
    } catch (e) {
      return <RecipeItem>{}
    }      
  }



  get isAuthor () : boolean {
    return (this.$store.state.profile.username === this.username)
  }


  setUsername () {
    this.username = this.recipe.author.username
  }

  // switchDialog ()

  openConfirmDialog () {
    this.showComfirmDialog = true
    this.confirmDialogDisplay = 'block'
  }

  closeConfirmDialog () {
    this.showComfirmDialog = false
    this.confirmDialogDisplay = 'none'
  }

  setConfirmDialog (useStatus: string, callback: any) {
    switch (useStatus) {
      case 'publish':
        this.confirmDialog = {
          status: 'publish',
          title: 'Confirm publish',
          msg: 'Are you sure to change recipe status for publish?',
          hasConfirmButton: true,
          hasCancelButton: true,
          callback: callback
        }
        break

      case 'unpublish':
          this.confirmDialog = {
          status: 'unpublish',
          title: 'Confirm unpublish',
          msg: 'Are you sure to change recipe status for unpublish?',
          hasConfirmButton: true,
          hasCancelButton: true,
          callback: callback
        }
        break

      case 'delete':
        this.confirmDialog = {
          status: 'delete',
          title: 'Confrim delete',
          msg: 'Are you sure to delete?',
          hasConfirmButton: true,
          hasCancelButton: true,
          callback: callback
        }
        break

      default:
        return
    } 
    this.openConfirmDialog()
  }

  publishRecipe () {
    this.$store.dispatch(ActionTypes.PUBLISH_RECIPE, { recipeId: this.recipeId }).then(() => {
      this.closeConfirmDialog()
    })
  }

  unpublishRecipe () {
    this.$store.dispatch(ActionTypes.UNPUBLISH_RECIPE, { recipeId: this.recipeId }).then(() => {
      this.closeConfirmDialog()
    })
  }

  deleteRecipe () {
    this.$store.dispatch(ActionTypes.DELETE_RECIPE, { recipeId: this.recipeId }).then(() => {

    })
  }

  fetchRecipe () {
    this.recipeId = this.$route.params['recipeId']
    this.$store.dispatch(ActionTypes.GET_RECIPE, { recipeId: this.recipeId }).then(() => {
      this.setUsername()
    })
  }

  beforeMount () {
    this.fetchRecipe()
  }
}
</script>

import Vue from 'vue'
import Vuex from 'vuex'

import { UserItem, RecipeListItem, PaginationItem, TokenItem, RecipeItem, AlertItem } from '@/response'

import * as api from '@/api'
// import { errorHandler } from '@/errorHandle'
import { MutationTypes, ActionTypes } from '@/constant'
import { localforage } from '@/auth'
import { router } from '@/router'
import { AxiosResponse } from 'axios'

Vue.use(Vuex)


export const errorHandler = (response: AxiosResponse | boolean) =>{
  debugger
  if (typeof response === 'boolean') {
    router.replace({ name: 'internal-server-error'})
  } else {
    debugger
    switch (response.status) {
      case 400:
        router.replace("/")
        debugger

      case 401:
        router.replace({ name: 'login'})
        break

      case 403:
        router.replace({ name: 'not-found'})
        break

      case 404:
        router.replace({ name: 'not-found'})
        break
      
      case 422:
        router.replace("/")
        break

      case 500:
        router.replace({ name: 'internal-server-error'})
        break

      default:
        router.replace("/")
        break
    }
  }
}

const store = new Vuex.Store({
  state: {
    isLogin: false,
    loginRedirect: 'home',
    recipeList: <Array<RecipeListItem>>[],
    pagination: <PaginationItem>{},
    recipe: <RecipeItem>{},
    loginStatus: '',
    profile: <UserItem>{},
    author: <UserItem>{},
    header: {},
    tokenData: <TokenItem>{
      access_token: localStorage.getItem('_ACCESS_TOKEN') || '',
      refresh_token: localStorage.getItem('_REFRESH_TOKEN') || '',
      token: '',
      status: '',
      hasRequestOnce: false 
    },
    alert: <AlertItem>{
      show: true,
      message: 'alert-success',
      style: 'alert-success'
    }
  },

  mutations: {
    [MutationTypes.SET_LOGIN_REDIRECT]: (state, { loginRedirect }) => {
      state.loginRedirect = loginRedirect
    },

    [MutationTypes.SET_ALERT]: (state, { alert }) => {
      state.alert = alert
    },

    [MutationTypes.RESET_ALERT]: (state) => {
      state.alert = <AlertItem>{
        show: false,
        message: '',
        style: ''
      }
    },

    [MutationTypes.SET_RECIPE_LIST]: (state, { resp }) => {
      state.recipeList = resp.data
      state.pagination = { ...resp }
    },

    [MutationTypes.SET_RECIPE]: (state, { resp }) => {
      state.recipe = resp
    },

    [MutationTypes.SET_RECIPE_PUBLISH_STATUS]: (state, isPublish) => {
      state.recipe.is_publish = isPublish
    },

    // token
    [MutationTypes.REQUEST_TOKEN]: (state) => {
      state.tokenData.status = 'request'
    },

    // token
    [MutationTypes.SET_TOKEN]: (state, { resp }) => {
      state.tokenData = { 
        access_token: resp.access_token,
        refresh_token: resp.refresh_token,
        token: resp.access_token,
        status: 'success',
        hasRequestOnce: true
      }
    },

    // token
    [MutationTypes.REQUEST_TOKEN_ERROR]: (state) => {
      state.tokenData.status = 'error'
      state.tokenData.hasRequestOnce = true
    },

    // token
    [MutationTypes.CLEAR_TOKEN]: (state) => {
      state.tokenData = <TokenItem>{}
    },

    // login status
    [MutationTypes.SET_LOGIN_STATUS]: (state, loginStatus) => {
      state.isLogin = loginStatus
    },

    [MutationTypes.REQUEST_USER]: (state) => {
      state.loginStatus = 'request'
    },    

    [MutationTypes.SET_USER]: (state, { resp }) => {
      state.loginStatus = 'login'
      state.profile = { ...resp }
    },

    [MutationTypes.REQUEST_USER_ERROR]: (state) => {
      state.loginStatus = 'error'
      state.profile = <UserItem>{}
    },
    
    [MutationTypes.CLEAR_USER]: (state) => {
      state.loginStatus = 'logout'
      state.profile = <UserItem>{}
    },

    [MutationTypes.SET_AUTHOR]: (state, { resp }) => {
      state.author = { ...resp }
    },

    [MutationTypes.SET_AVATAR]: (state, { resp }) => {
      state.profile.avatar_url = resp.avatar_url || ''
    }
  },

  actions: {
    [ActionTypes.LOGIN_REDIRECT]: ({ commit, dispatch, state }, { loginRedirect }) => {
      commit(MutationTypes.SET_LOGIN_REDIRECT, { loginRedirect })
    },

    [ActionTypes.CLOSE_ALERT]: ({ commit, dispatch, state }) => {
      commit(MutationTypes.RESET_ALERT)
    },

    [ActionTypes.REGISTER]: ({ commit, dispatch, state }, { profile }) => {
      return api.registerUser(profile)
        .then((resp) => {
          // showSomething
          // commit()
        }, errorHandler)
    },

    [ActionTypes.LOGIN]: ({ commit, dispatch, state }, { account }) => {
      return new Promise((resolve, reject) => {
        commit(MutationTypes.REQUEST_TOKEN)
        api.loginUser(account).then((resp) => {
          localStorage.setItem('_ACCESS_TOKEN', resp.access_token)
          localStorage.setItem('_REFRESH_TOKEN', resp.refresh_token)

          commit(MutationTypes.SET_TOKEN, { resp })
          commit(MutationTypes.SET_LOGIN_STATUS, true)
          dispatch(ActionTypes.GET_USER, { username: 'me' })

          resolve(resp)
        }).catch(error => {
          debugger
          localStorage.removeItem('_ACCESS_TOKEN')
          localStorage.removeItem('_REFRESH_TOKEN')

          commit(MutationTypes.REQUEST_TOKEN_ERROR)

          reject(error)
        })
      })
    },

    [ActionTypes.LOGOUT]: ({ commit, dispatch, state }) => {
      return new Promise((resolve, reject) => {
        commit(MutationTypes.CLEAR_USER)
        commit(MutationTypes.SET_LOGIN_STATUS, false)

        localStorage.removeItem('_ACCESS_TOKEN')
        localStorage.removeItem('_REFRESH_TOKEN')

        api.logoutUser().then((resp) => {
          resolve(true)
        }).catch(error => {
          reject(error)
        })
      })
    },

    [ActionTypes.GET_USER]: ({ commit, dispatch, state }, { username }) => {
      commit(MutationTypes.REQUEST_USER)
      return api.getUser(username).then((resp) => {
          commit(MutationTypes.SET_USER, { resp })
        }).catch(error => {
          commit(MutationTypes.REQUEST_USER_ERROR)
      })
    },

    [ActionTypes.GET_AUTHOR]: ({ commit, dispatch, state }, { username }) => {
      return api.getUser(username)
        .then((resp) => {
          commit(MutationTypes.SET_AUTHOR, { resp })
        }, errorHandler)
    },

    [ActionTypes.GET_USER_RECIPE_LIST]: ({ commit, dispatch, state }, { username, page, perPage, sort, order, visibility }) => {
      return api.getUserRecipeList(username, page, perPage, sort, order, visibility)
        .then((resp) => {
          commit(MutationTypes.SET_RECIPE_LIST, { resp })
        }, errorHandler)
    },

    [ActionTypes.UPLOAD_AVATAR]: ({ commit, dispatch, state }, { file }) => {
      return api.uploadUserAvatar(file)
        .then((resp) => {
          commit(MutationTypes.SET_AVATAR, { resp })
        }, errorHandler)
    },

    [ActionTypes.GET_RECIPE_LIST]: ({ commit, dispatch, state }, { q, page, perPage, sort, order }) => {
      return api.getRecipeList(q, page, perPage, sort, order)
        .then((resp) => {
          commit('SET_RECIPE_LIST', { resp })
        }, errorHandler)
    },

    [ActionTypes.GET_RECIPE]: ({ commit, dispatch, state }, { recipeId }) => {
      return api.getRecipe(recipeId)
        .then((resp) => {
          commit(MutationTypes.SET_RECIPE, { resp })
        }, errorHandler)
    },

    [ActionTypes.CREATE_RECIPE]: ({ commit, dispatch, state }, { recipe }) => {
      return api.createRecipe(recipe)
        .then((resp) => {
          commit(MutationTypes.SET_RECIPE, { resp })
        }, errorHandler)
    },

    [ActionTypes.UPDATE_RECIPE]: ({ commit, dispatch, state }, { recipe }) => {
      return api.updateRecipe(recipe)
        .then((resp) => {
          commit(MutationTypes.SET_RECIPE, { resp })
        }, errorHandler)
    },

    [ActionTypes.DELETE_RECIPE]: ({ commit, dispatch, state }, { recipeId }) => {
      return api.deleteRecipe(recipeId)
        .then((resp) => {
          // commit(MutationTypes.SET_RECIPE, { resp })
        }, errorHandler)
    },

    [ActionTypes.PUBLISH_RECIPE]: ({ commit, dispatch, state }, { recipeId }) => {
      return api.publishRecipe(recipeId)
        .then((resp) => {
          commit(MutationTypes.SET_RECIPE_PUBLISH_STATUS, true)
        }, errorHandler)
    },

    [ActionTypes.UNPUBLISH_RECIPE]: ({ commit, dispatch, state }, { recipeId }) => {
      return api.unpublishRecipe(recipeId)
        .then((resp) => {
          commit(MutationTypes.SET_RECIPE_PUBLISH_STATUS, false)
        }, errorHandler)
    }
  }
})

export { store }

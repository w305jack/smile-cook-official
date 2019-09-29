import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import RecipeListView from '@/views/RecipeListView.vue'
import RegisterView from '@/views/RegisterView.vue'
import EmailAlertView from '@/views/EmailAlertView.vue'
import LoginView from '@/views/LoginView.vue'
import RecipePanelView from '@/views/RecipePanelView.vue'
import MyRecipeListView from '@/views/MyRecipeListView.vue'
import RecipeDetailView from '@/views/RecipeDetailView.vue'
import AuthorView from '@/views/AuthorView.vue'
import { authStatusCheck, isLoginStatus } from '@/auth'
import { store } from '@/store'
import { ActionTypes } from '@/constant'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/recipes',
      name: 'recipe-list',
      component: RecipeListView
    },
    {
      path: '/create-recipe',
      name: 'create-recipe',
      component: RecipePanelView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit-recipe/:recipeId',
      name: 'edit-recipe',
      component: RecipePanelView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/recipes/:recipeId',
      name: 'recipe-detail',
      component: RecipeDetailView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/email-alert',
      name: 'email-alert',
      component: EmailAlertView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/my-recipes',
      name: 'my-recipes',
      component: MyRecipeListView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/author/:username',
      name: 'author',
      component: AuthorView
    },
    // {
    //   name: 'not-found-wildcard',
    //   path: '*',
    //   component: NotFoundView,
    //   meta: {
    //       scrollToTop: true,
    //       mobileAlternative: 'mobile-not-found'
    //   }
    // }
  ]
})

router.beforeEach ((to, from, next) => {
  // if (to.name === 'login') {
  //   const loginRedirect = from.name || 'home'
  //   store.dispatch(ActionTypes.LOGIN_REDIRECT, { loginRedirect: loginRedirect }).then((success)=>{
  //   })
  // }

  store.dispatch(ActionTypes.CURRENT_ROUTE, { routeMap: { to: to.name, from: from.name }})

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (isLoginStatus()) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }


  // if (to.matched.some(record => record.meta.requireAuth)) {
  //   oauthRequiredAction((beenAuth) => {
  //     if(beenAuth) {
  //         next()
  //     } else {
  //         router.app.$store.commit(StoreTypes.MutationTypes.SET_LOGIN_STATUS, { loginStatus: false, userProfile:null })
  //         router.replace({ name: 'landing-page'})
  //     }
  //   })
  // } else {
  //   next()
  // }

})

export { router }

<template>
<div id="app">
  <header>
    <div v-if="isLogin && showCollapse" :class="{ show: showCollapse }" class="collapse bg-dark" id="navbarHeader" style="padding: .5rem 1rem;">
      <div class="container">
        <ProfileComponent />
      </div>
    </div>

    <div class="navbar navbar-dark bg-dark shadow-sm">
      <div class="container">
        <div class="row" style="display: contents;">
          <div class="col-md-auto">
            <router-link :to="{ name: 'home'}" class="navbar-brand d-flex align-items-center">
              <strong>Smile Cook</strong>
            </router-link>
          </div>

          <div class="col pt-1">
            <router-link :to="{ name: 'recipe-list' }" class="btn btn-sm btn-outline-light">Recipes</router-link>
          </div>

          <div v-if="!isLogin" class="col col-md-4 text-right">
            <router-link :to="{ name: 'login' }" class="ml-2 btn btn-light">Log in</router-link>
            <router-link :to="{ name: 'register' }" class="ml-2 btn btn-primary">Sign up</router-link>
          </div>

          <div v-if="isLogin" class="col col-md-4 text-right">
            <router-link :to="{ name: 'create-recipe' }" class="ml-2 btn btn-primary">Create recipe</router-link>
            <button @click.stop="switchCollapse()" class="ml-2 navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>

  <main role="main">
    <div class="py-3 bg-light">    
      <div class="container">
        <div class="row fade pb-2" :class="{ show: alert.show }">
          <div class="col-12">
            <div class="alert" :class="alert.style" role="alert" style="height: 50px;">
              {{alert.message}}
              <button @click.once="closeAlert()" type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
        </div>

        <!-- main view -->
        <router-view/>
      </div>
    </div>
  </main>

  <footer class="text-muted" style="padding-top: 3rem; padding-bottom: 3rem;">
    <div class="container">
      <p class="float-right">
        <a href="#">Back to top</a>
      </p>
      <p>Copyright © 2019 Smile Cook, take a smile and be relax for yourself!</p>
    </div>
  </footer>
</div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { ActionTypes } from '@/constant'
import ProfileComponent from '@/components/ProfileComponent.vue'

@Component({
  components: {
    ProfileComponent
  }
})
export default class AppView extends Vue {
  showCollapse = false
  isLogin = false

  username: string = ''
  email: string = ''
  createdAt: string = ''
  imageUrl: string = ''

  get alert () : AlertItem {
    if ( (<any>this.$store.state).alert.show === true) {
      setTimeout(() => {
        this.closeAlert()
      }, 5000)
    } 
    return (<any>this.$store.state).alert
  }

  closeAlert () {
    this.$store.dispatch(ActionTypes.CLOSE_ALERT)
  }

  @Watch('$route')
  routeChange (newVal: any, oldVal: any) {
    this.checkLogin()
  }

  checkLogin () {
    if (this.$store.state.isLogin) {
      this.isLogin = this.$store.state.isLogin
    }
  }

  switchCollapse () {
    this.showCollapse = !this.showCollapse
  }

  beforeMount () {
    this.checkLogin()
  }
}
</script>

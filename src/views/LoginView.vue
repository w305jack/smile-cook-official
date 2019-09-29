<template>
  <div class="row">
    <div class="col-md-12">
      <h4 class="py-3 text-center">Login</h4>

      <form class="needs-validation" novalidate="">
        <div class="row justify-content-center py-3">
          <div class="col-md-6">
            <label for="email">Email</label>
            <input v-model="inputItem.email" type="email" class="form-control" id="email" />
            <div class="invalid-feedback">
              Please enter a valid email address.
            </div>
          </div>
        </div>

        <div class="row justify-content-center py-3">
          <div class="col-md-6">
            <label for="password">Password</label>
            <input v-model="inputItem.password" type="password" class="form-control" id="password" placeholder="" required="" />
            <div class="invalid-feedback">
              Please enter your password.
            </div>
          </div>
        </div>

        <hr class="mb-4 col-md-6 justify-content-center">

        <div class="row pb-3 justify-content-center">
          <div class="col-md-6">
            <button @click.stop="submitAccount()" class="btn btn-primary btn-lg btn-block" type="button">Sign in</button>
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

export interface loginItem {
  email: string
  password: string
}

@Component({
  components: {
  }
})
export default class LoginView extends Vue {
  inputItem = <loginItem>{}
  // confirmPassword: string = ''

  navigatePrevPage () {
    if (this.$store.state.loginRedirect !== ''){
      this.$router.push({name: this.$store.state.loginRedirect})
    } else {
      this.$router.push({name: 'home'})
    }
  }

  submitAccount() {
    this.$store.dispatch(ActionTypes.LOGIN, { account: this.inputItem }).then((success)=>{
      this.navigatePrevPage()
    })
    
  }

  checkLoginStatus() {
    if (this.$store.state.isLogin === true) {
      this.$router.push({name: 'home'})
    }
  }

  beforeMount () {
    this.checkLoginStatus()
  }

  // checkPassword() {
  //   if (this.confirmPassword !== this.inputItem.password) {
  //       return false
  //   }
  // }

  // beforeMount () {
  //   // this.$store.dispatch('GET_RECIPE_LIST', {page: this.page, perPage: this.perPage, sort: this.sort, order: this.order}).then(() => {})
  // }
}
</script>

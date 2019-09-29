<template>
  <div class="row">
    <div class="col-md-12">
      <h4 class="py-3 text-center">Login</h4>

      <form class="needs-validation" :class="{ 'was-validated': showValidated }" novalidate="">
        <div class="row justify-content-center py-3">
          <div class="col-md-6">
            <label for="email">Email</label>
            <input v-model="inputItem.email" type="email" class="form-control" id="email" required=""/>
            <div v-if="!emailValidated" class="invalid-feedback">
              Please enter a valid email address.
            </div>
          </div>
        </div>

        <div class="row justify-content-center py-3">
          <div class="col-md-6">
            <label for="password">Password</label>
            <input v-model="inputItem.password" type="password" class="form-control" id="password" required="" />
            <div v-if="!passwordValidated" class="invalid-feedback">
              Please enter your password.
            </div>
          </div>
        </div>

        <hr class="mb-4 col-md-6 justify-content-center">

        <div class="row pb-3 justify-content-center">
          <div class="col-md-6">
            <button @click.stop="formCheck()" class="btn btn-primary btn-lg btn-block" type="button">Sign in</button>
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
  showValidated = false
  emailValidated = true
  passwordValidated = true 

  validEmail (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  }

  formCheck () {
    debugger
    if (this.inputItem.email && this.validEmail(this.inputItem.email) && this.inputItem.password) {
      this.submitLogin()
      return
    }

    if (!this.inputItem.email){
      this.emailValidated = false
    }

    if (this.validEmail(this.inputItem.email)){
      this.emailValidated = false
    }

    if (!this.inputItem.password) {
      this.passwordValidated = false
    }

    this.showValidated = true
  }

  submitLogin() {
    this.$store.dispatch(ActionTypes.LOGIN, { account: this.inputItem }).then((success)=>{
      this.$router.push({name: this.$store.state.routeMap.from || 'home'})
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

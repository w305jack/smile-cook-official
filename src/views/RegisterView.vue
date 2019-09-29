<template>
  <div class="row">
    <div class="col-md-12">
      <h4 class="mb-3">Register</h4>
      <form class="needs-validation" novalidate="">
        <div class="mb-3">
          <label for="username">Username</label>
          <div class="input-group">
            <input v-model="inputItem.username" type="text" class="form-control" id="username" placeholder="Username" required="" />
            <div class="invalid-feedback" style="width: 100%;">
              Your username is required.
            </div>
          </div>
        </div>

        <div class="mb-3">
          <label for="email">Email</label>
          <input v-model="inputItem.email" type="email" class="form-control" id="email" placeholder="you@example.com" />
          <div class="invalid-feedback">
            Please enter a valid email address.
          </div>
        </div>

        <div class="mb-3">
          <label for="password">Password</label>
          <input v-model="inputItem.password" type="password" class="form-control" id="password" placeholder="" required="" />
          <div class="invalid-feedback">
            Please enter your password.
          </div>
        </div>

        <!-- <div class="mb-3">
          <label for="password">Confirm password</label>
          <input @blur="checkPassword()" type="text" class="form-control" id="password" placeholder="" required="">
          <div class="invalid-feedback">
            Please enter your password.
          </div>
        </div> -->

        <hr class="mb-4">

        <button @click.stop="submitProfile()" class="btn btn-primary btn-lg btn-block" type="button">Confirm</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { router } from '@/router'

export interface registerItem {
    username: string,
    email: string
    password: string
}

@Component({
  components: {
  }
})
export default class RegisterView extends Vue {
  inputItem = <registerItem>{}
  // confirmPassword: string = ''

  submitProfile() {
    this.$store.dispatch('REGISTER', { profile: this.inputItem }).then((success)=>{
      debugger
      router.replace({ name: 'email-alert'})
    })    
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

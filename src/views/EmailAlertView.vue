<template>
  <div class="row">
    <div class="col-md-12">
      <h2 class="mb-3 text-center">Thank you!</h2>

      <div class="row justify-content-center text-center">
        <div v-if="mode==='register'" class="col-md-6 py-3">
          <p>Thank you for registration an account.</p>
          <p>We've sent you a active email, to verify your email address.</p>
          <p><strong>You'll be able to use some behavor until your email is verified.</strong></p>
        </div>
      </div>

      <div class="row justify-content-center text-center">
        <div class="col-md-6 py-3">
          <router-link :to="{ name: 'login' }" class="btn btn-primary btn-lg">Login</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { router } from '@/router'

@Component({
  components: {
  }
})
export default class EmailAlertView extends Vue {
  mode: string = 'register'

  beforeMount () {
    this.mode = this.$route.params.mode || 'register'
  }
}
</script>

import Vue from 'vue'
import VueHead from 'vue-head'
import App from './App.vue'
import { router } from './router'
import { mapState } from 'vuex'
import { store } from './store'
import moment from 'moment'
import { Component, Prop } from 'vue-property-decorator'

import RecipeList from '@/components/RecipeList.vue'
import HelloWorld from '@/components/HelloWorld.vue'

Vue.config.productionTip = false

Vue.use(VueHead)

Vue.filter('formatDate', function (value: string) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY')
  }
  return ''
})

const app = new Vue({
  router: router,
  store: store,

  head: {
    title: {
      inner: 'Smile Cook'
    },

    link: [
      {
        rel: 'stylesheet', href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'
      }
    ]
  },

  data: {
    // isLogin: false
  },

  // props: [
  //   'isLogin'
  // ],
  // computed: {
  //   isLoggin: function(): boolean {
  //     return this.isLogin === true;
  //   },
  // },

  methods: {
    // checkLogin: function(): boolean {
    //   debugger
    //   return this.isLogin === true;
    // },
  },

  beforeMount: function () : any {
    // isLogin () {
    //   debugger
    //   return store.state.isLogin
    // }
    // isLogin: function(): boolean {
    //   debugger
    //   return this.$store.state.isLogin;
    // },
    // ...mapState({
    //   isLogin: state => store.state.isLogin
    // })
    // ...mapState([
    //   'isLogin',
    // ]),
    // debugger
    // this.isLogin = this.$store.state.isLogin
  },

  watch: {
    // checkLogin: function () {
    //   return this.$store.state.isLogin;
    // }
  },

  render: h => h(App)

}).$mount('#app')

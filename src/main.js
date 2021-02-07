import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import _ from 'lodash'
import axios from 'axios'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  _,
  axios,
  render: h => h(App)
}).$mount('#app')

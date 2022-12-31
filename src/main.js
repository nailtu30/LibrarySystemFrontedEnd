import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'

// please change the baseURL with your own base API address 
axios.defaults.baseURL = 'your backend API address'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

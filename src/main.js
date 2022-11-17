import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { routes } from './router'

import SupplierUI from '../src/index'

Vue.use(SupplierUI, {
  routes,
  baseUrl: '/supplier/api',
  settings: {
    title: '供应商管理系统'
  }
})

Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

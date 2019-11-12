import Vue from 'vue'
import App from './App.vue'

import store from './store'
import vuetify from './plugins/vuetify'
import { router } from './router'

import './registerServiceWorker'

Vue.config.productionTip = false
Vue.prototype.history = window.history

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

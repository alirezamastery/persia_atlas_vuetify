import '@/assets/scss/main.scss'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axiosInstance from './services/axios'
import VueAxios from 'vue-axios'
import FontAwesomeIcon from '@/components/fontawsome-icons'
import i18n from '@/i18n'
import '@/modules/filters'
import api from '@/modules/api'

Vue.config.productionTip = false

Vue.use(VueAxios, axiosInstance)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.prototype.$api = api

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  i18n,
}).$mount('#app')

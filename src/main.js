import '@/assets/scss/main.scss'
import '@/plugins/validate'
import '@/modules/filters'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axiosInstance from './services/axios'
import VueAxios from 'vue-axios'
import FontAwesomeIcon from '@/components/fontawsome-icons'
import i18n from '@/i18n'
import api from '@/modules/api'
import VeeValidate from 'vee-validate';
import {ValidationObserver, ValidationProvider} from 'vee-validate'

Vue.config.productionTip = false

Vue.use(VueAxios, axiosInstance)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

Vue.prototype.$api = api

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  i18n,
}).$mount('#app')

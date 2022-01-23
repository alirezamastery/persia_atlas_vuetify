import '@/assets/scss/main.scss'
import '@/plugins/validate'
import '@/modules/filters'
import 'vue-advanced-cropper/dist/style.css'
import 'vue-advanced-cropper/dist/theme.classic.css'
import '@/mixins/notifs'
import '@/modules/initialSetup'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axiosInstance from './services/axios'
import VueAxios from 'vue-axios'
import api from '@/modules/api'
import logger from '@/modules/logging'
import FontAwesomeIcon from '@/components/fontawsome-icons'
import i18n from '@/i18n'
import {ValidationObserver, ValidationProvider} from 'vee-validate'
import {Cropper} from 'vue-advanced-cropper'
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import '@/plugins/datePicker'
Vue.config.productionTip = false

Vue.use(VueAxios, axiosInstance)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('Cropper', Cropper)
// Vue.component('persian-date-picker', VuePersianDatetimePicker)

Vue.prototype.$api = api
Vue.prototype.$logger = logger

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  i18n,
}).$mount('#app')

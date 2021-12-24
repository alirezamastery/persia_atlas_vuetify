import '@/assets/scss/main.scss'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axiosInstance from "./services/axios";
import VueAxios from 'vue-axios'
import FontAwesomeIcon from '@/components/fontawsome-icons';

Vue.config.productionTip = false

Vue.use(VueAxios, axiosInstance)
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

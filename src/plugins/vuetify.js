import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export const localeRTL = {
  'fa': true,
  'en': false,
}

export default new Vuetify({
  rtl: true,
  theme: {
    dark: true,
  },
})

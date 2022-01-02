import Vue from 'vue'
import VueI18n from 'vue-i18n'
import farsi from '@/locales/farsi/index'

const LOCALE = 'fa'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: LOCALE,
  fallbackLocale: 'en',
  messages: {fa: farsi}
})

export default i18n
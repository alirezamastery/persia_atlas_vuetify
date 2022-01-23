import Vue from 'vue'
import VueI18n from 'vue-i18n'
import fa from '@/locales/farsi/index'

const LOCALE = 'fa'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: LOCALE,
  fallbackLocale: 'en',
  messages: {fa: fa}
})

export default i18n
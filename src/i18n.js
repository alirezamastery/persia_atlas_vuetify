import Vue from 'vue'
import VueI18n from 'vue-i18n'
import fa from '@/locales/farsi/index'
import en from '@/locales/en/index'

const LOCALE = 'fa'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: LOCALE,
  fallbackLocale: 'en',
  messages: {fa: fa, en: en},
})

export const siteTitle = {
  'fa': 'پرشیا اطلس',
  'en': 'Persia Atlas',
}

export const updateI18nLocale = locale => i18n.locale = locale


export default i18n

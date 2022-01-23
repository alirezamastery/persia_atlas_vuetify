<template>
  <v-menu
      v-model="showMenu"
      offset-x
      offset-y
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          v-bind="attrs"
          v-on="on"
          small
          icon
      >
        <v-icon>
          mdi-web
        </v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item
          v-for="(value,key) in locales"
          :key="key"
          @click="handleLocaleSelect(key)"
      >
        {{ value }}
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import {updateI18nLocale} from '@/i18n'
import {localeRTL} from '@/plugins/vuetify'
import {setVeeValidateLocale} from '@/plugins/validate'

export default {
  name: 'SelectLocale',
  data() {
    return {
      showMenu: false,
      locales: {
        fa: 'فارسی',
        en: 'English',
      },
    }
  },
  methods: {
    handleLocaleSelect(locale) {
      console.log('locale', locale)
      updateI18nLocale(locale)
      this.$store.dispatch('SetLocale', locale)
      this.$vuetify.rtl = localeRTL[locale]
      setVeeValidateLocale(locale)
      // if (locale === 'fa') {
      //   // document.body.style.direction = 'rtl'
      //   this.$vuetify.rtl = true
      // } else if (locale === 'en') {
      //   // document.body.style.direction = 'ltr'
      //   this.$vuetify.rtl = false
      //   // document.getElementsByTagName('body')[0].style.direction = 'ltr'
      // }
    },
  },
}
</script>

<style scoped>

</style>
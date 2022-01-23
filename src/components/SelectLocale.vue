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
import {localize as datePickerLocalize} from '@/plugins/datePicker'

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
      setVeeValidateLocale(locale)
      datePickerLocalize(locale)
      this.$vuetify.rtl = localeRTL[locale]
      this.$store.dispatch('SetLocale', locale)
      if (locale === 'fa') {
        this.$vuetify.rtl = true
        document.body.classList.remove('ltr')
      } else if (locale === 'en') {
        this.$vuetify.rtl = false
        document.body.classList.add('ltr')
      }
    },
  },
}
</script>

<style scoped>

</style>
<template>
  <v-app>
    <v-progress-linear
        :active="hasHttpRequestWaiting"
        :indeterminate="hasHttpRequestWaiting"
        color="yellow darken-2"
        :fixed="true"
        style="z-index: 10000"
    />

    <HeaderBar v-if="showAppLayout"/>

    <Sidebar v-if="showAppLayout"/>

    <v-main>
      <v-container class="rounded-0" style="padding: 40px 20px">
        <v-alert
            v-for="(alert,index) in alerts"
            :key="index"
            :type="alert.type"
            dismissible
            @input="handleAlertDismiss(alert)"
        >
          {{ alert.data }}
        </v-alert>

        <router-view/>

      </v-container>
    </v-main>

    <v-snackbar
        v-if="snackbar"
        v-model="snackbar"
        :color="snackbar.color"
        style="z-index: 10000"
        app
        right
        top
    >
      {{ snackbar.data }}
      <template v-slot:action="{ attrs }">
        <v-btn
            color="white"
            icon
            v-bind="attrs"
            @click="snackbar = null"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>

  </v-app>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import Sidebar from '@/components/layout/Sidebar'
import HeaderBar from '@/components/layout/HeaderBar'
import {updateI18nLocale} from '@/i18n'
import {localeRTL} from '@/plugins/vuetify'
import {setVeeValidateLocale} from '@/plugins/validate'
import {localize as datePickerLocalize} from '@/plugins/datePicker'

export default {
  name: 'App',
  components: {
    HeaderBar,
    Sidebar,
  },
  data() {
    return {
      snackbarOpen: true,
    }
  },
  computed: {
    ...mapState({
      isAuthenticated: state => state.user,
      alerts: state => state.alerts,
      locale: state => state.locale,
    }),
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
      hasHttpRequestWaiting: 'hasHttpRequestWaiting',
    }),
    snackbar: {
      get() {
        return this.$store.state.snackbar
      },
      set(value) {
        this.$store.dispatch('HandleSettingSnackbar', value)
      },
    },
    showAppLayout() {
      const noAuthRoutes = ['404', 'Login', 'justRain']
      return this.isAuthenticated && !noAuthRoutes.includes(this.$route.name)
    },
    pageDirection() {
      return this.$vuetify.rtl
    },
  },
  created() {
    this.setInitialLocale()

    window.addEventListener('resize', this.handleWindowResize)
    this.$broadcast.addBroadcastCallback('LOGOUT', () => {
      this.$store.dispatch('auth/LogOut')
    })
  },
  destroyed() {
    window.removeEventListener('resize', this.handleWindowResize)
  },
  methods: {
    setInitialLocale() {
      console.log('locale:', this.locale)
      // updateI18nLocale(this.locale)
      this.$i18n.locale = this.locale
      this.$vuetify.rtl = localeRTL[this.locale]
      setVeeValidateLocale(this.locale)
      datePickerLocalize(this.locale)
      if (this.locale === 'en')
        document.body.classList.add('ltr')
    },
    handleWindowResize() {
      this.$store.commit('SET_WINDOW_WIDTH', window.innerWidth)
    },
    handleAlertDismiss(alert) {
      console.log('close alert', alert)
      this.$store.dispatch('HandleRemovingAlert', alert)
    },
  },
}
</script>

<style lang="scss">
//$body-font-family: Samim, Roboto-Regular;
//$title-font: Samim, Roboto-Regular;

//.v-application {
//  font-family: Samim, sans-serif !important;
//
//  *[class^="title"] {font-family: Samim, sans-serif !important;}
//
//  *[class^="text"] {font-family: Samim, sans-serif !important;}
//}
</style>
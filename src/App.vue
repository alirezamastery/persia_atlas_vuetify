<template>
  <v-app>
    <v-progress-linear
        :active="hasHttpRequestWaiting"
        :indeterminate="hasHttpRequestWaiting"
        color="yellow darken-2"
        :fixed="true"
        style="z-index: 10000"
    />

    <HeaderBar v-if="isAuthenticated"/>

    <Sidebar v-if="isAuthenticated"/>

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

    <v-footer v-if="isAuthenticated" app>
      {{ $t('general.legal') }}
    </v-footer>

  </v-app>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import Sidebar from '@/components/layout/Sidebar'
import HeaderBar from '@/components/layout/HeaderBar'

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
      requestQueueLength: state => state.httpRequestQueue,
      alerts: state => state.alerts,
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
  },
  created() {
    this.handleWindowResize()
    window.addEventListener('resize', this.handleWindowResize)
  },
  destroyed() {
    window.removeEventListener('resize', this.handleWindowResize)
  },
  methods: {
    handleWindowResize() {
      this.$store.commit('SET_WINDOW_WIDTH', window.innerWidth)
    },
    handleAlertDismiss(alert) {
      console.log('close alert', alert)
      this.$store.dispatch('HandleRemovingAlert', alert)
    },
    handleSnackDismiss(snack) {
      console.log('close snack', snack)
      this.$store.dispatch('HandleRemovingSnackbar', snack)
    },
  },
}
</script>

<style lang="scss">
$body-font-family: Samim;
$title-font: Samim;

.v-application {
  font-family: $body-font-family, sans-serif !important;

  *[class^="title"] {font-family: $title-font, sans-serif !important;}

  *[class^="text"] {font-family: $title-font, sans-serif !important;}

  //.title {font-family: $title-font, sans-serif !important;}
  //
  //.text-h1 {font-family: $title-font, sans-serif !important;}
  //
  //.text-h2 {font-family: $title-font, sans-serif !important;}
  //
  //.text-h3 {font-family: $title-font, sans-serif !important;}
  //
  //.text-h4 {font-family: $title-font, sans-serif !important;}
  //
  //.text-h5 {font-family: $title-font, sans-serif !important;}
  //
  //.text-h6 {font-family: $title-font, sans-serif !important;}
}
</style>
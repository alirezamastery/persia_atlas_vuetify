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
<!--      <v-container class="rounded-0" style="padding: 40px 20px">-->
        <router-view/>
<!--      </v-container>-->
    </v-main>

    <v-footer v-if="isAuthenticated" app>
      کلیه حقوق سایت متعلق به خودمونه
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
      links: [
        {title: 'خانه', url: '/'},
        {title: 'خروج', url: '/logout', color: 'red'},
      ],
    }
  },
  computed: {
    ...mapState({
      isAuthenticated: state => state.user,
      requestQueueLength: state => state.httpRequestQueue,
    }),
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
      hasHttpRequestWaiting: 'hasHttpRequestWaiting',
    }),
  },
  methods: {
    handleWindowResize() {
      this.$store.commit('SET_WINDOW_WIDTH', window.innerWidth)
    },
  },
  created() {
    this.handleWindowResize()
    window.addEventListener('resize', this.handleWindowResize)
  },
  destroyed() {
    window.removeEventListener('resize', this.handleWindowResize)
  },
}
</script>

<style lang="scss">
$body-font-family: Samim;
$title-font: Samim;

.v-application {
  font-family: $body-font-family, sans-serif !important;

  .title {font-family: $title-font, sans-serif !important;}

  .text-h1 {font-family: $title-font, sans-serif !important;}

  .text-h2 {font-family: $title-font, sans-serif !important;}

  .text-h3 {font-family: $title-font, sans-serif !important;}

  .text-h4 {font-family: $title-font, sans-serif !important;}

  .text-h5 {font-family: $title-font, sans-serif !important;}

  .text-h6 {font-family: $title-font, sans-serif !important;}
}
</style>
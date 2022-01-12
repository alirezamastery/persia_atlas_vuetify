<template>
  <v-app-bar
      app
      dense
      flat
  >

    <v-toolbar-title class="mx-1">پرشیا اطلس</v-toolbar-title>

    <v-spacer/>

    <v-btn icon v-if="!$vuetify.theme.dark" @click="toggleTheme()">
      <v-icon class="mr-1" color="blue-grey darken-4">mdi-theme-light-dark</v-icon>
    </v-btn>
    <v-btn icon v-if="$vuetify.theme.dark" @click="toggleTheme()">
      <v-icon color="yellow darken-3">mdi-theme-light-dark</v-icon>
    </v-btn>

    <v-btn
        v-if="!isMobileWidth"
        small
        depressed
        color="red lighten-1"
        class="mx-3"
        @click="logout"
    >
      {{ $t('general.routes.logout') }}
    </v-btn>

    <v-app-bar-nav-icon v-if="isMobileWidth" @click="handleNavClick"/>

  </v-app-bar>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'HeaderBar',
  computed: {
    ...mapGetters({
      isMobileWidth: 'isMobileWidth',
    }),
  },
  methods: {
    handleNavClick() {
      this.$store.dispatch('HandleSidebarOpenStatus', true)
    },
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
    async logout(){
      await this.$store.dispatch('auth/LogOut')
      await this.$router.push({name: 'Login'})
    }
  },
}
</script>

<style scoped>

</style>
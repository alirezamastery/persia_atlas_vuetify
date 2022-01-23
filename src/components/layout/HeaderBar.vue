<template>
  <v-app-bar app dense flat>

    <v-toolbar-title class="mx-1">{{ $t('general.siteHeader') }}</v-toolbar-title>

    <v-spacer/>

    <SelectLocale/>

    <ThemeToggle/>

    <v-btn
        v-if="!isMobileWidth"
        small
        depressed
        color="red lighten-1"
        :to="{name: 'Logout'}"
    >
      {{ $t('general.routes.logout') }}
    </v-btn>

    <v-app-bar-nav-icon v-if="isMobileWidth" @click="handleNavClick"/>

  </v-app-bar>
</template>

<script>
import {mapGetters} from 'vuex'
import SelectLocale from '@/components/SelectLocale'
import ThemeToggle from '@/components/layout/ThemeToggle'

export default {
  name: 'HeaderBar',
  components: {
    SelectLocale,
    ThemeToggle,
  },
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
  },
}
</script>

<style scoped>

</style>
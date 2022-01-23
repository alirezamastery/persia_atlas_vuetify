<template>
  <v-btn
      v-if="$vuetify.theme.dark"
      icon
      small
      class="mx-5"
      @click="toggleTheme()"
  >
    <v-icon color="yellow darken-3">mdi-white-balance-sunny</v-icon>
  </v-btn>
  <v-btn
      v-else
      icon
      small
      class="mx-5"
      @click="toggleTheme()"
  >
    <v-icon class="mr-1" color="blue-grey darken-4">mdi-weather-night</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'ThemeToggle',
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
  },
}
</script>

<style scoped>

</style>
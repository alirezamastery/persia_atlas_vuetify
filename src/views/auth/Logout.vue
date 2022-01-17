<template>
  <v-card max-width="500">
    <v-card-title>{{ $t('general.Q.logout') }}</v-card-title>
    <v-card-text>
      <v-row class="p-20">
        <v-btn
            color="red"
            @click="logout"
        >
          {{ $t('general.yes') }}
        </v-btn>
        <v-spacer/>
        <v-btn
            color="primary"
            @click="goBack"
        >
          {{ $t('general.no') }}
        </v-btn>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Logout',
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    async logout() {
      await this.$store.dispatch('auth/LogOut')
      await this.$router.push({name: 'Login'})
    },
  },
}
</script>

<style scoped>

</style>
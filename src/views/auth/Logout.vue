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
import broadcastMixin from '@/mixins/broadcast'

export default {
  name: 'Logout',
  mixins: [broadcastMixin],
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    async logout() {
      await this.$store.dispatch('auth/LogOut')
      this.$broadcast.sendBroadcastMessage('LOGOUT', {})
    },
  },
}
</script>

<style scoped>

</style>
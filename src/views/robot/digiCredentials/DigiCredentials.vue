<template>
  <v-card>
    <v-card-title>{{ $t('general.routes.digiPassword') }}</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="handleSubmit">
        <v-container>
          <v-row>
            <v-col cols="12" sm="8" md="5" lg="3">
              <v-text-field
                  v-model="username"
                  :disabled="!editUsername"
                  :label="$t('general.username')"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="10" sm="8" md="5" lg="3">
              <v-text-field
                  v-model="password"
                  :disabled="!editPassword"
                  :solo-inverted="editPassword"
                  :label="$t('general.password')"
              />
            </v-col>
            <v-col cols="2" md="1" lg="1">
              <v-switch
                  v-model="editPassword"
                  color="red"
                  :success="!editPassword"
              />
            </v-col>
          </v-row>
        </v-container>
        <v-btn type="submit" color="green">{{ $t('general.submit') }}</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'DigiCredentials',
  data() {
    return {
      username: '',
      password: '',
      editUsername: false,
      editPassword: false,
    }
  },
  created() {
    this.axios.get(this.$api.digiCreds)
        .then(res => {
          this.username = res.data.digi_username
          this.password = res.data.digi_password
        })
  },
  methods: {
    handleSubmit() {
      const data = {
        'digi_username': this.username,
        'digi_password': this.password,
      }
      this.axios.post(this.$api.digiCreds, data)
          .then(res => {
            console.log('digi password', res)
            this.editPassword = false
            this.addSnackbar('green', this.$t('general.snack.saveSuccess'))
          })
          .catch(err => {
            this.addSnackbar('red', err.response)
          })
    },
  },
}
</script>

<style scoped>

</style>
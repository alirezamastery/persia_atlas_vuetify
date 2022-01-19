<template>
  <v-card>
    <v-card-title>{{ $t('general.routes.digiPassword') }}</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="handleSubmit">
        <v-container>
          <v-row>
            <v-col cols="10" sm="8" md="5" lg="3">
              <v-text-field
                  v-model="newUsername"
                  :disabled="!editUsername"
                  :label="$t('general.username')"
                  class="latin-text-font"
              />
            </v-col>
            <v-col cols="2" md="1" lg="1">
              <v-switch
                  v-model="editUsername"
                  color="red"
                  :success="!editUsername"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="10" sm="8" md="5" lg="3">
              <v-text-field
                  v-model="newPassword"
                  :disabled="!editPassword"
                  :label="$t('general.password')"
                  class="latin-text-font"
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
        <v-btn
            type="submit"
            color="orange"
            :disabled="!hasChange"
            style="color: black"
        >
          {{ $t('general.submit') }}
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'DigiCredentials',
  data() {
    return {
      oldUsername: '',
      oldPassword: '',
      editUsername: false,
      editPassword: false,
      newUsername: '',
      newPassword: '',
    }
  },
  computed: {
    hasChange() {
      return this.newUsername !== this.oldUsername || this.newPassword !== this.oldPassword
    },
  },
  created() {
    this.axios.get(this.$api.digiCreds)
        .then(res => {
          this.oldUsername = res.data.digi_username
          this.newUsername = this.oldUsername
          this.oldPassword = res.data.digi_password
          this.newPassword = this.oldPassword
        })
  },
  methods: {
    handleSubmit() {
      const data = {
        'digi_username': this.newUsername,
        'digi_password': this.newPassword,
      }
      this.axios.post(this.$api.digiCreds, data)
          .then(res => {
            console.log('digi password', res)
            this.editUsername = false
            this.editPassword = false
            this.oldUsername = res.data.digi_username
            this.newUsername = this.oldUsername
            this.oldPassword = res.data.digi_password
            this.newPassword = this.oldPassword
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
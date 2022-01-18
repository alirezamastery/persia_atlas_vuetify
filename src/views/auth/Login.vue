<template>
  <div class="login-container">
    <MatrixRain/>
    <v-card
        width="350"
        class="p-10 justify-center my-auto"
        style="z-index: 10000;max-height: max-content"
    >
      <v-card-text>
        <div v-if="errors">
          <v-alert type="error" v-for="error in errors" :key="error">
            {{ error }}
          </v-alert>
        </div>
        <validation-observer ref="form" v-slot="{ invalid }">
          <v-form
              @submit.prevent="handleSubmit"
              class="d-flex flex-column justify-center"
          >
            <ValidationProvider name="Mobile" rules="required" v-slot="{ errors }">
              <v-text-field
                  v-model="mobile"
                  :label="$t('general.mobile')"
                  prepend-inner-icon="mdi-account-circle"
                  solo-inverted
                  :error-messages="errors"
              />
            </ValidationProvider>
            <ValidationProvider name="Password" rules="required" v-slot="{ errors }">
              <v-text-field
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  :label="$t('general.password')"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  prepend-inner-icon="mdi-lock"
                  solo-inverted
                  @click:append="showPassword = !showPassword"
                  :error-messages="errors"
              />
            </ValidationProvider>
            <v-btn
                large
                type="submit"
                color="#00ff1c"
                style="color: black"
                :disabled="invalid"
            >
              {{ $t('general.routes.login') }}
            </v-btn>
          </v-form>
        </validation-observer>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import MatrixRain from '@/components/MatrixRain'

export default {
  name: 'Login',
  components: {
    MatrixRain,
  },
  data() {
    return {
      pwInputType: 'password',
      showPassword: false,
      eyeSlash: false,
      errors: null,
      mobile: '',
      password: '',
    }
  },
  methods: {
    handleSubmit() {
      if (!(this.mobile && this.password)) return
      this.axios.post('token/', {
        mobile: this.mobile,
        password: this.password,
      }).then(res => {
        console.log('Login', res)
        this.loginHandler(res.data)
      }).catch(err => {
        console.log('axios error:', err.response.data)
        this.errors = err.response.data
      })
    },
    loginHandler(data) {
      localStorage.setItem('access_token', data.access)
      localStorage.setItem('refresh_token', data.refresh)
      this.axios.defaults.headers['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
      this.$store.dispatch('auth/LogIn', this.mobile)
      this.$router.push({path: '/'})
      this.getUserData()
    },
    getUserData() {
      this.axios.get(this.$api.userProfile)
          .then(res => {
            this.$store.dispatch('auth/SetProfile', res.data)
          })
          .catch(err => {
            console.log('getUserData error', err)
            this.addSnackbar('red', err.response.data)
          })
    },
  },
}
</script>

<style scoped lang="scss">
.login-container {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 90vh;
  //height: max-content;
  background-color: transparent;
  color: white;
  z-index: 2;
  margin-right: auto;
}
</style>
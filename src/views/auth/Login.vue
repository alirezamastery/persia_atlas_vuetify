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
            {{error}}
          </v-alert>
        </div>
        <v-form
            @submit.prevent="handleSubmit"
            v-model="formIsValid"
            class="d-flex flex-column justify-center"
        >
          <v-text-field
              v-model="mobile"
              :label="$t('general.mobile')"
              :rules="mobileRules"
              prepend-inner-icon="mdi-account-circle"
              solo-inverted
          />
          <v-text-field
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              :label="$t('general.password')"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="mobileRules"
              prepend-inner-icon="mdi-lock"
              solo-inverted
              @click:append="showPassword = !showPassword"
          />
          <v-btn
              large
              type="submit"
              color="#00ff1c"
              style="color: black"
              :disabled="!formIsValid"
          >
            {{ $t('general.routes.login') }}
          </v-btn>
        </v-form>
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
      // TODO: use vee-validate
      mobileRules: [
        value => !!value || 'this field is required',
      ],
      password: '',
      passwordRules: [
        value => !!value || 'this field is required',
      ],
      formIsValid: false,
    }
  },
  methods: {
    handleSubmit() {
      if (!(this.mobile && this.password)) return
      this.axios.post('token/', {
        mobile: this.mobile,
        password: this.password,
      }).then(res => {
        console.log(res)
        localStorage.setItem('access_token', res.data.access)
        localStorage.setItem('refresh_token', res.data.refresh)
        this.axios.defaults.headers['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
        this.$store.dispatch('auth/LogIn', this.mobile)
        this.$router.push({path: '/'})
      }).catch(err => {
        console.log('axios error:', err.response.data)
        this.errors = err.response.data
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
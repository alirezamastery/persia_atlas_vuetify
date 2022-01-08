<template>
  <div class="login-container">
    <MatrixRain/>
    <v-card
        width="350"
        class="p-10 justify-center my-auto"
        style="z-index: 10000;max-height: max-content"
    >
      <v-card-text>
<!--        <div class="alert alert-error" v-if="errors">{{ errors }}</div>-->
        <div v-if="errors">
          <v-alert type="error" v-for="error in errors" :key="error">
            {{error}}
          </v-alert>
        </div>
        <v-form @submit.prevent="handleSubmit" v-model="formIsValid">
          <v-text-field
              :label="$t('general.mobile')"
              prepend-icon="mdi-account-circle"
              v-model="mobile"
              :rules="mobileRules"
              solo-inverted
          />
          <v-text-field
              :type="showPassword ? 'text' : 'password'"
              :label="$t('general.password')"
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              v-model="password"
              :rules="mobileRules"
              solo-inverted
          />
          <v-btn
              large
              type="submit"
              color="#00ff1c"
              class="m-10"
              style="color: black"
              :disabled="!formIsValid"
          >
            {{ $t('general.routes.login') }}
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
    <!--    <form method="post" class="form-struct login-form" @submit.prevent="handleSubmit">-->
    <!--      <input type="text" class="login-input" placeholder="Mobile" v-model="mobile">-->
    <!--      <div class="password-input">-->
    <!--        <input :type="pwInputType" class="login-input" placeholder="Password" v-model="password">-->
    <!--        <div class="visibility-btn" @click="handleShowPassword">-->
    <!--          <font-awesome-icon :icon="['fa', 'eye-slash']" v-if="eyeSlash"></font-awesome-icon>-->
    <!--          <font-awesome-icon :icon="['fa', 'eye']" v-else></font-awesome-icon>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <button type="submit" class="form-submit login-btn">Login</button>-->
    <!--    </form>-->
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
    handleShowPassword() {
      if (this.pwInputType === 'password') {
        this.pwInputType = 'text'
        this.eyeSlash = true
      } else {
        this.pwInputType = 'password'
        this.eyeSlash = false
      }
    },
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
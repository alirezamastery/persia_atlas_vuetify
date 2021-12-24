<template>
  <div class="login-container">
    <MatrixRain/>
    <div class="alert alert-error" v-if="errors">{{ errors }}</div>
    <form method="post" class="form-struct login-form" @submit.prevent="handleSubmit">
      <input type="text" class="login-input" placeholder="Mobile" v-model="mobile">
      <div class="password-input">
        <input :type="pwInputType" class="login-input" placeholder="Password" v-model="password">
        <div class="visibility-btn" @click="handleShowPassword">
          <font-awesome-icon :icon="['fa', 'eye-slash']" v-if="eyeSlash"></font-awesome-icon>
          <font-awesome-icon :icon="['fa', 'eye']" v-else></font-awesome-icon>
        </div>
      </div>
      <button type="submit" class="form-submit login-btn">Login</button>
    </form>
  </div>
</template>

<script>
import MatrixRain from "@/components/MatrixRain";

export default {
  name: "Login",
  components: {
    MatrixRain
  },
  data() {
    return {
      pwInputType: 'password',
      eyeSlash: false,
      mobile: '',
      password: '',
      errors: null
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
      this.axios.post('token/', {
        mobile: this.mobile,
        password: this.password,
      }).then(res => {
        console.log(res)
        localStorage.setItem('access_token', res.data.access)
        localStorage.setItem('refresh_token', res.data.refresh)
        this.axios.defaults.headers['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');
        this.$store.dispatch('auth/LogIn', this.mobile)
        this.$router.push({path: '/'})
      }).catch(err => {
        console.log('axios error:', err)
      })
    }
  }
}
</script>

<style scoped>

</style>
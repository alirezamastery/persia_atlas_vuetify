<template>
  <v-card>
    <v-card-title>
      {{ $t('general.profile') }}
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4" lg="2">
              <div class="user-avatar">
                <img
                    v-if="form.avatar"
                    :src="avatarSrc"
                    alt=""
                    class="avatar-img"
                >
                <img v-else src="@/assets/svg/blank-user.svg" alt="">
                <v-icon class="camera-icon">mdi-camera</v-icon>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6" lg="3">
              <v-text-field
                  v-model="form.first_name"
                  :label="$t('general.name')"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6" lg="3">
              <v-text-field
                  v-model="form.last_name"
                  :label="$t('general.family')"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {
      form: {
        first_name: null,
        last_name: null,
        avatar: null,
      },
    }
  },
  computed: {
    avatarSrc() {
      return process.env.VUE_APP_SERVER_BASE_URL + this.form.avatar
    },
  },
  created() {
    this.axios.get(this.$api.userProfile)
        .then(res => {
          console.log('Profile', res)
          this.form = res.data
        })
        .catch(err => {
          console.log('Profile', err)
        })
  },
  methods: {
    handleAvatarClick() {
      this.$refs.avatarInput.$el.firstChild.click()
      // console.log(this.$refs.avatarInput.$el.firstChild.click())
    },
  },
}
</script>

<style scoped>

</style>
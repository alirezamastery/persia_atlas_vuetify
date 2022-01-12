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
                    @click="handleImageSelect"
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
    <v-dialog
        v-model="dialogOpen"
        fullscreen
    >
      <v-btn
          icon
          dark
          @click="dialogOpen = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <Cropper
          :src="imageObjectURL"
          :stencil-component="$options.components.CircleStencil"
          :stencil-props="{
		aspectRatio: 1/1,
		resizable: true
	}"
          @change="handleChange"
      />
    </v-dialog>
  </v-card>
</template>

<script>

import {CircleStencil, Cropper} from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'


export default {
  name: 'Profile',
  components: {
    Cropper,
  },
  data() {
    return {
      form: {
        first_name: null,
        last_name: null,
        avatar: null,
      },
      imageObjectURL: null,
      imageInput: null,
      validExtensions: ['png', 'jpg', 'jpeg', 'JPG', 'JPEG'],
      dialogOpen: false,
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
    handleImageSelect() {
      this.imageInput = document.createElement('input')
      this.imageInput.type = 'file'
      this.imageInput.addEventListener('change', this.handleImageSelected)
      this.imageInput.click()
    },
    handleImageSelected(event) {
      console.log('handleImageSelected', event)
      const file = event.target.files[0]
      const extension = file.name.split('.').pop()
      if (!this.validExtensions.includes(extension)) {
        this.$store.dispatch('HandleSettingSnackbar', {
          color: 'red',
          data: this.$t('general.snack.fileFormatError'),
        })
        return
      }

      this.imageObjectURL = window.URL.createObjectURL(file)
      this.dialogOpen = true
      console.log('imgURL', this.imageObjectURL)
    },
    handleChange({coordinates, canvas}) {
      this.coordinates = coordinates
      // You able to do different manipulations at a canvas
      // but there we just get a cropped image, that can be used
      // as src for <img/> to preview result
      this.image = canvas.toDataURL()
    },
  },
}
</script>

<style scoped>

</style>
<template>
  <v-card>
    <v-card-title>
      {{ $t('general.profile') }}
    </v-card-title>
    <v-card-text>

      <v-form @submit.prevent="handleFormSubmit">
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4" lg="2">
              <div class="user-avatar">
                <img
                    v-if="avatarSrc"
                    :src="avatarSrc"
                    alt=""
                    class="avatar-img"
                    @click="handleImageSelect"
                >
                <img
                    v-else
                    src="@/assets/svg/user-blank.svg"
                    alt=""
                    class="avatar-img"
                    @click="handleImageSelect"
                >
                <div class="action-icons">
                  <v-menu
                      v-model="showAvatarMenu"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                          v-bind="attrs"
                          v-on="on"
                          small
                          fab
                          color="primary"
                      >
                        <v-icon>
                          mdi-image-filter-none
                        </v-icon>
                      </v-btn>
                    </template>

                    <v-list>
                      <v-list-item @click="handleImageSelect">
                        <v-list-item-icon>
                          <v-icon>mdi-pencil</v-icon>
                        </v-list-item-icon>
                        {{ $t('general.select') }}
                      </v-list-item>
                      <v-list-item @click="handleImageDelete">
                        <v-list-item-icon>
                          <v-icon>mdi-delete</v-icon>
                        </v-list-item-icon>
                        {{ $t('general.delete') }}
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>

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
        <v-btn
            type="submit"
            color="green darken-2"
        >
          {{ $t('general.submit') }}
        </v-btn>
      </v-form>
    </v-card-text>

    <v-dialog
        v-model="dialogOpen"
        style="max-width: 100vw;max-height: 100vh"
    >
      <v-card>
        <v-btn
            icon
            @click="handleCropperCancel"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-card-text>
          <Cropper
              ref="cropper"
              :src="cropperImageObjectURL"
              :stencil-props="{aspectRatio: 1, resizable: true}"
              stencil-component="circle-stencil"
              :canvas="{minHeight: 0, minWidth: 0, maxHeight: 200, maxWidth: 200}"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn
              color="primary"
              x-large
              @click="handleCropperSubmit"
          >
            {{ $t('general.submit') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-card>
</template>

<script>
export default {
  name: 'Profile',
  data() { // TODO : fix large image overflow
    return {
      validExtensions: ['png', 'jpg', 'jpeg', 'JPG', 'JPEG'],
      form: {
        first_name: null,
        last_name: null,
        avatar: null,
      },
      avatarSrc: null,
      hasCroppedImage: false,
      cropperImageObjectURL: null,
      imageInput: null,
      dialogOpen: false,
      showAvatarMenu: false,
      deletedImage: false,
    }
  },
  created() {
    this.avatarSrc = this.$store.state.auth.profile.avatar
    console.log('avatarSrc', this.avatarSrc)
    this.axios.get(this.$api.userProfile)
        .then(res => {
          console.log('Profile response', res)
          this.form = res.data
        })
        .catch(err => {
          console.log('Profile error', err)
        })
  },
  methods: {
    handleCropperCancel() {
      this.dialogOpen = false
      this.hasCroppedImage = false
    },
    handleCropperSubmit() {
      this.dialogOpen = false
      const {canvas} = this.$refs.cropper.getResult()
      this.avatarSrc = canvas.toDataURL()
      this.hasCroppedImage = true
    },
    handleImageSelect() {
      this.imageInput = document.createElement('input')
      this.imageInput.type = 'file'
      this.imageInput.addEventListener('change', this.handleImageSelected)
      this.imageInput.click()
    },
    handleImageDelete() {
      const data = {
        'avatar': null,
      }
      this.axios.patch(this.$api.userProfile, data)
          .then(res => {
            console.log('delete response', res)
            this.avatarSrc = null
            this.$store.dispatch('auth/SetProfileKeyValue', 'avatar', null)
            this.addSnackbar('success', this.$t('general.snack.saveSuccess'))
          })
          .catch(err => {
            console.log('delete error', err)
            this.addSnackbar('red', err.response.data)
          })
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

      this.cropperImageObjectURL = window.URL.createObjectURL(file)
      this.dialogOpen = true
      console.log('imgURL', this.cropperImageObjectURL)
    },
    handleFormSubmit() {
      if (this.hasCroppedImage) {
        const {canvas} = this.$refs.cropper.getResult()
        const form = new FormData()
        form.append('first_name', this.form.first_name)
        form.append('last_name', this.form.last_name)
        canvas.toBlob(blob => {
          form.append('avatar', blob, `avatar_${this.$store.state.auth.user}.png`)
          this.axios.patch(this.$api.userProfile, form, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }).then(res => {
            console.log('form patch response', res)
            this.addSnackbar('success', this.$t('general.snack.saveSuccess'))
            // const url = process.env.VUE_APP_SERVER_BASE_URL + res.data.avatar
            // this.$store.dispatch('auth/SetAvatar', url)
            this.$store.dispatch('auth/SetProfile', res.data)
          }).catch(err => {
            console.log('file upload error', err)
            this.addSnackbar('red', err.response.data)
          })
        })
      } else {
        const data = {
          'first_name': this.form.first_name,
          'last_name': this.form.last_name,
        }
        this.axios.patch(this.$api.userProfile, data)
            .then(res => {
              console.log('simple patch response', res)
              this.addSnackbar('success', this.$t('general.snack.saveSuccess'))
              this.$store.dispatch('auth/SetProfile', res.data)
            })
            .catch(err => {
              console.log('simple patch error', err)
              this.addSnackbar('red', err.response.data)
            })
      }
    },
  },
}
</script>

<style scoped>

</style>
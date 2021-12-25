<template>
  <div class="interaction-container">
    <div class="btn primary-btn" @click="getDownloadPath">محاسبه صورت حساب</div>
    <a v-if="downloadPath"
       class="btn primary-btn"
       :href="`${serverBaseURL}/${downloadPath}`"
       download>
      download
    </a>
    <div v-if="isLoading">
      <div class="display-flex w-100p">
        <LoadingDots_1></LoadingDots_1>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import axiosInstance from "../../services/axios";
import LoadingDots_1 from "../../components/animation/LoadingDots_1";

export default {
  name: "Panel",
  components: {
    LoadingDots_1
  },
  setup() {

    let downloadPath = ref('')
    let isLoading = ref(false)
    const serverBaseURL = process.env.VUE_APP_WEBSITE_BASE_URL

    const getDownloadPath = () => {
      const url = 'products/invoice-excel/'
      // const url = 'products/file-test/'
      isLoading.value = true
      axiosInstance.get(url)
          .then(res => {
            isLoading.value = false
            downloadPath.value = res.data.path
            const link = document.createElement('a')
            link.href = `${serverBaseURL}/${res.data.path}`
            link.download = ''
            link.click()
          })
          .catch(err => {
            isLoading.value = false
            console.log(err)
          })
    }

    return {
      serverBaseURL,
      downloadPath,
      isLoading,
      getDownloadPath,
    }
  }
}
</script>

<style scoped>

</style>
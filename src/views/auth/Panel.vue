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
import axiosInstance from "../../services/axios";
import LoadingDots_1 from "../../components/animation/LoadingDots_1";

export default {
  name: "Panel",
  components: {
    LoadingDots_1
  },
}
</script>

<style scoped>

</style>
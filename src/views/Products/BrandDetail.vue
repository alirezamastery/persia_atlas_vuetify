<template>
  <div class="variants-page">
    <router-link :to="{name:'Brands'}" class="btn primary-btn">برندها</router-link>
    <Errors v-if="errors" :errors="errors"></Errors>
    <div v-if="isLoading">
      <LoadingSpinner></LoadingSpinner>
    </div>
    <div class="variants-container" :class="{'dark-theme':isDarkTheme}" v-else>
      <h1 v-if="brand">{{ brand.title }}</h1>
      <div class="variant-row" v-for="product in brand.actual_products" :key="product.id">
        <router-link :to="{name:'ActualProductDetail',
         params:{id:product.id, brandTitle:brand.title, brandId:brand.id}}"
                     class="btn primary-btn">
          {{ product.title }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {computed} from "vue";
import Errors from "../../components/Errors";
import LoadingSpinner from "../../components/animation/LoadingSpinner";

export default {
  name: "BrandDetail",
  components: {
    Errors,
    LoadingSpinner,
  },
  setup() {
    const store = useStore()

    const isDarkTheme = computed(() => store.getters.isDarkThemeSet)

    return {
      isDarkTheme
    }
  },
  data() {
    return {
      brand: Object,
      isLoading: Boolean,
      errors: ''
    }
  },
  mounted() {
    const productID = this.$route.params.id
    this.isLoading = true
    this.axios.get(`/products/brands/${productID}/`)
        .then(res => {
              // console.log(res)
              this.isLoading = false
              this.brand = res.data
            }
        ).catch(
        err => {
          console.log(err)
          this.isLoading = false
          this.errors = err.response?.data
        }
    )
  },
}
</script>

<style scoped>

</style>
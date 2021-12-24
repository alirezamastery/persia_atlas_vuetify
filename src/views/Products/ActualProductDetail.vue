<template>
  <div class="variants-page">
    <router-link :to="{name:'Brands'}" class="btn primary-btn">برندها</router-link>
    <!--    <router-link :to="{name:'BrandDetail',params:{id:brandId}}" class="btn product-btn">-->
    <!--      {{ brandTitle }}-->
    <!--    </router-link>-->
    <Errors v-if="errors" :errors="errors"></Errors>
    <div v-if="isLoading">
      <LoadingSpinner></LoadingSpinner>
    </div>
    <div class="variants-container" :class="{'dark-theme':isDarkTheme}" v-else>
      <h1 v-if="product">{{ product.title }}</h1>
      <div class="variant-card" :class="{'dark-theme':isDarkTheme}"
           v-for="(variant , index) in variants" :key="variant.id">
        <Variant :variant="variant" :index="index+1"></Variant>
      </div>
    </div>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {computed} from "vue";
import LoadingSpinner from "../../components/animation/LoadingSpinner";
import Variant from "../../components/products/Variant";
import Errors from "../../components/Errors";

export default {
  name: "ActualProductDetail",
  components: {
    LoadingSpinner,
    Variant,
    Errors
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
      product: Object,
      variants: Array,
      isLoading: Boolean,
      errors: '',
      // brandId: Number,
      // brandTitle: String,
    }
  },
  // created() {
  //   this.brandId = this.$route.params.brandId
  //   this.brandTitle = this.$route.params.brandTitle
  // },
  watch: {
    '$route.params.id': {
      handler() {
        const productID = this.$route.params.id
        this.isLoading = true
        this.axios.get(`/products/actual-product-variants/${productID}/`)
            .then(res => {
              // console.log(res)
              this.isLoading = false
              this.product = res.data.product
              this.variants = res.data.variants
            })
            .catch(err => {
              console.log(err)
              this.isLoading = false
              this.errors = err.response?.data
            })
      }
    }
  },
  mounted() {
    const productID = this.$route.params.id
    this.isLoading = true
    this.axios.get(`/products/actual-product-variants/${productID}/`)
        .then(res => {
          // console.log(res)
          this.isLoading = false
          this.product = res.data.product
          this.variants = res.data.variants
        })
        .catch(err => {
          console.log(err)
          this.isLoading = false
          this.errors = err.response?.data
        })
  },
}
</script>

<style scoped>

</style>
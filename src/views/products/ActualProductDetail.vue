<template>
  <v-sheet
      :color="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4'"
      class="m-50 p-30"
  >
    <v-btn
        :to="{name:'Brands'}"
        color="primary"
        x-large
    >
      برندها
    </v-btn>
    <Errors v-if="errors" :errors="errors"></Errors>
    <div v-if="isLoading">
      <LoadingSpinner></LoadingSpinner>
    </div>
    <div class="d-flex flex-column align-center justify-center" v-else>
      <h1 v-if="product">{{ product.title }}</h1>
      <Variant
          v-for="(variant , index) in variants"
          :key="variant.id"
          :variant="variant"
          :index="index+1"
      />
    </div>
  </v-sheet>
</template>

<script>
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
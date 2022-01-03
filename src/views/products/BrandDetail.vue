<template>
  <v-sheet
      class="container"
      :color="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4'"
  >
    <v-btn
        :to="{name:'Brands'}"
        x-large
        color="primary"
    >
      برندها
    </v-btn>
    <Errors v-if="errors" :errors="errors"></Errors>
    <div v-if="isLoading">
      <LoadingSpinner></LoadingSpinner>
    </div>
    <div class="d-flex flex-column justify-center align-center" v-else>
      <div class="text-h3 mb-20" v-if="brand">{{ brand.title }}</div>
      <div class="variant-row" v-for="product in brand.actual_products" :key="product.id">
        <v-btn
            :to="{name:'ActualProductDetail', params:{id:product.id, brandTitle:brand.title, brandId:brand.id}}"
            tile
            x-large
            elevation="2"
            color="success"
        >
          {{ product.title }}
        </v-btn>
      </div>
    </div>
  </v-sheet>
</template>

<script>
import Errors from "../../components/Errors";
import LoadingSpinner from "../../components/animation/LoadingSpinner";

export default {
  name: "BrandDetail",
  components: {
    Errors,
    LoadingSpinner,
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
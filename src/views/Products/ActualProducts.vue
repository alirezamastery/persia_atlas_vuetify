<template>
  <div class="variants-page">
    <h1>Actual Products</h1>
    <div class="variants-container" v-if="products">
      <div v-for="product in this.products" :key="product.id">
        <router-link :to="{name:'ActualProductDetail', params:{id:product.id}}">
          <div class="btn primary-btn">
            {{ product.title }}
          </div>
        </router-link>
      </div>
    </div>
    <div v-else>
      تنوع هایی که میخواستی یکی باشن اول ثبت کن بعد بیا اینجا عزیز من
    </div>
  </div>
</template>

<script>
export default {
  name: "ActualProducts",
  data() {
    return {
      products: [],
    }
  },
  mounted() {
    this.axios.get(`/products/actual-products/`)
        .then(res => {
              console.log(res)
              this.products = res.data
            }
        )
  },
  methods: {}
}
</script>

<style scoped>

</style>
<template>
  <v-container>
    <h1>برندها</h1>
    <Errors v-if="errors" :errors="errors"/>
    <div v-if="isLoading">
      <LoadingSpinner/>
    </div>
    <div class="variants-container" v-else>
      <!--      <div v-for="brand in brands" :key="brand.id">-->
      <!--        <router-link :to="{name:'BrandDetail', params:{id:brand.id}}">-->
      <!--          <div class="btn primary-btn">-->
      <!--            {{ brand.title }}-->
      <!--          </div>-->
      <!--        </router-link>-->
      <!--      </div>-->
      <v-btn
          v-for="brand in brands"
          :key="brand.id"
          class="m-3"
          color="primary"
          @click="handleBrandSelect(brand.id)"
      >
        {{ brand.title }}
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import LoadingSpinner from "../../components/animation/LoadingSpinner";
import Errors from "../../components/Errors";

export default {
  name: "Brands",
  components: {
    LoadingSpinner,
    Errors
  },
  data() {
    return {
      brands: Array,
      isLoading: Boolean,
      errors: ''
    }
  },
  mounted() {
    this.isLoading = true
    this.axios.get('products/brands/')
        .then(res => {
          console.log(res)
          this.isLoading = false
          this.brands = res.data
        })
        .catch(err => {
          console.log(err)
          this.isLoading = false
          this.errors = err.response?.data
        })
  },
  methods:{
    handleBrandSelect(id){
      console.log(id)
    }
  }
}
</script>

<style scoped>

</style>
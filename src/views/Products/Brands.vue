<template>
  <v-sheet
      :color="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4'"
      class="m-50 p-30"
  >
    <div class="text-h3 transition-swing" v-text="$t('general.brands')"></div>
    <Errors v-if="errors" :errors="errors"/>
    <div v-if="isLoading">
      <LoadingSpinner/>
    </div>
    <div class="d-flex flex-column justify-center align-center" v-else>
      <v-btn
          v-for="brand in brands"
          :key="brand.id"
          class="m-3 w-100"
          color="primary"
          @click="handleBrandSelect(brand.id)"
          :to="{name: 'BrandDetail', params: {id: brand.id}}"
      >
        {{ brand.title }}
      </v-btn>
    </div>
  </v-sheet>
</template>

<script>
import LoadingSpinner from "../../components/animation/LoadingSpinner";
import Errors from "../../components/Errors";
import {mapGetters, mapState} from 'vuex'

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
  computed: {
    ...mapState({
      sidebarOpen: state => state.sidebarOpen,
    }),
    ...mapGetters({
      isMobileWidth: 'isMobileWidth',
    }),
  },
  mounted() {
    this.isLoading = true
    console.log('gettin brands')
    this.axios.get('products/brands/')
        .then(res => {
          console.log('brands response:', res)
          this.isLoading = false
          this.brands = res.data
        })
        .catch(err => {
          console.log('brands error:', err)
          this.isLoading = false
          this.errors = err.response?.data
        })
  },
  methods: {
    handleBrandSelect(id) {
      console.log(id)
    }
  }
}
</script>

<style scoped>

</style>
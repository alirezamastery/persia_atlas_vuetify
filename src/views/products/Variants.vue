<template>
  <div class="variants-page">
    <h1>variants page</h1>
    <all-variants :variants="variants"></all-variants>
  </div>
</template>

<script>
import AllVariants from "../../components/products/AllVariants";

export default {
  name: "Variants",
  components: {
    AllVariants
  },
  data() {
    return {
      variants: [],
    }
  },
  mounted() {
    this.axios.get('/products/variants/')
        .then(res => {
              console.log(res)
              this.variants = res.data
            }
        )
  },
  methods: {}
}
</script>

<style scoped>

</style>
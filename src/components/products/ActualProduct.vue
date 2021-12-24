<template>
  <div>
    {{ this.product.title }}
<!--    <router-link :to="{name:'ActualProductDetail' , params: {id: this.product.id}}"></router-link>-->
  </div>
</template>

<script>
export default {
  name: "ActualProduct",
  props: {
    product: Object,
    index: Number
  }
}
</script>

<style scoped>

</style>
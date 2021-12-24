<template>
  <div v-if="errors">
<!--    {{errors}}-->
    <div class="alert alert-error" v-for="error in errors" :key="error">
      {{ error }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Errors",
  props: {
    errors: Object
  }
}
</script>

<style scoped>

</style>
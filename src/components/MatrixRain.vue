<template>
  <div id="rain-canvas"></div>
</template>

<script>
import makeItRain from '@/modules/makeItRain';

export default {
  name: "MatrixRain",

  beforeMount() {
    document.body.classList.add('matrix')
  },
  async mounted() {
    await makeItRain()
  },
  beforeDestroy() {
    document.body.classList.remove('matrix')
  }
}
</script>

<style scoped>

</style>
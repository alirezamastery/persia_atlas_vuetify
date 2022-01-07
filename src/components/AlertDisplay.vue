<template>
<div></div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'AlertDisplay',
  computed: {
    ...mapState({
      alerts: 'alerts',
    }),
  },
}
</script>

<style scoped>

</style>
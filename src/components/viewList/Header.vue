<template>
  <v-toolbar class="elevation-2">
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-spacer/>
    <v-btn
        v-if="!hideCreateBtn"
        color="primary"
        class="mr-2"
        dark
        @click="$router.push({name: addRoute})"
    >
      {{ $t('general.create') }}
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  name: 'Header',
  props: {
    title: {
      type: String,
      required: false,
    },
    addRoute: {
      type: String,
      required: true,
    },
    hideCreateBtn: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
}
</script>

<style scoped>

</style>
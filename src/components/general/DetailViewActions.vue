<template>
  <v-sheet class="mt-10">
    <v-toolbar flat>
      <v-btn
          v-if="showDelete"
          color="red darken-2"
          @click="$emit('delete')"
      >
        {{ $t('general.delete') }}
      </v-btn>
      <v-spacer/>
      <v-btn
          type="submit"
          :disabled="saveDisabled"
          color="green darken-2"
          @click="$emit('save')"
      >
        {{ $t('general.save') }}
      </v-btn>
    </v-toolbar>
  </v-sheet>
</template>

<script>
export default {
  name: 'DetailViewActions',
  props: {
    saveDisabled: {
      type: Boolean,
      default: false,
      required: false,
    },
    showDelete: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
}
</script>

<style scoped>

</style>
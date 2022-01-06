<template>
  <v-dialog v-model="toggle" max-width="500px" @input="handleInput">
    <v-card>
      <v-card-title class="text-h5">
        {{ $t('general.itemDeleteQ').replace('{0}', itemTitle) }}
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue" @click="handleCancel">{{ $t('general.cancel') }}</v-btn>
        <v-btn color="red" @click="$emit('delete')">{{ $t('general.yes') }}</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DetailViewDeleteDialog',
  props: ['value', 'itemTitle'],
  data() {
    return {
      deleteDialog: false,
      toggle: this.value,
    }
  },
  watch: {
    value(newValue) {
      this.toggle = newValue
    },
  },
  methods: {
    handleCancel() {
      this.toggle = false
      this.$emit('input', this.toggle)
    },
    handleInput(e) {
      this.$emit('input', this.toggle)
    },
  },
}
</script>

<style scoped>

</style>
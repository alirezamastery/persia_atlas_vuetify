<template>
  <v-sheet rounded>
    <v-card-actions>
      <v-btn
          color="red darken-2"
          @click="$emit('delete')"
      >
        {{ $t('general.delete') }}
      </v-btn>
      <v-spacer/>
      <v-btn
          color="green darken-2"
          @click="$emit('save')"
      >
        {{ $t('general.save') }}
      </v-btn>
    </v-card-actions>
  </v-sheet>
</template>

<script>
export default {
  name: 'DetailViewActions',
}
</script>

<style scoped>

</style>
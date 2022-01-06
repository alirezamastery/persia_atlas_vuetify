<template>
  <v-dialog v-model="dialogDelete" max-width="500px">
    <v-card>
      <v-card-title class="text-h5">
        {{ $t('general.itemDeleteQ').replace('{0}', editedItem.title) }}
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue" @click="closeDelete">{{ $t('general.cancel') }}</v-btn>
        <v-btn color="red" @click="handleItemDeletion">{{ $t('general.yes') }}</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ListViewDeleteDialog',
}
</script>

<style scoped>

</style>
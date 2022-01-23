<template>
  <Table
      :title="$t('acc.costTypes')"
      :headers="headers"
      :api-root="apiRoot"
      :edit-route="editRoute"
      :add-route="addRoute"
  >
    <template v-slot:col-title="{ item }">
      <v-btn text :to="{name: editRoute, params: {id: item.id}}">
        {{ item.title }}
      </v-btn>
    </template>
  </Table>
</template>

<script>
import Table from '@/components/viewList/Table'

export default {
  name: 'List',
  components: {
    Table,
  },
  data() {
    return {
      apiRoot: this.$api.costTypes,
      editRoute: 'costTypeEdit',
      addRoute: 'costTypeAdd',
      headers: [
        {text: this.$t('general.title'), value: 'title', sortable: false, type: 'text'},
      ],
      editedItem: {
        title: null,
      },
    }
  },
}
</script>

<style scoped>

</style>
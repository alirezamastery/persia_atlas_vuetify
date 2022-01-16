<template>
  <Table
      :title="$t('products.brands')"
      :headers="headers"
      :api-root="apiRoot"
      :edit-route="editRoute"
      :add-route="addRoute"
      hide-search
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
      apiRoot: this.$api.brands,
      editRoute: 'brandEdit',
      addRoute: 'brandAdd',
      headers: [
        {text: this.$t('general.title'), value: 'title', sortable: false},
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
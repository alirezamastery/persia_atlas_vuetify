<template>
  <Table
      :title="$t('products.productTypes')"
      :headers="headers"
      :api-root="apiRoot"
      :edit-route="editRoute"
      :add-route="addRoute"
  >
    <template v-slot:col-title="{ item }">
      <v-btn text :to="{name: editRoute, params:{id:item.id}}">
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
      apiRoot: this.$api.productTypes,
      editRoute: 'productTypeEdit',
      addRoute: 'productTypeAdd',
      headers: [
        {text: this.$t('general.title'), value: 'title', sortable: false},
      ],
      editedItem: {
        title: '',
        selectors: [],
      },
    }
  },
}
</script>

<style scoped>

</style>
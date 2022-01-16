<template>
  <Table
      :title="$t('products.actualProducts')"
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

    <template v-slot:col-brand="{ item }">
      {{ item.brand ? item.brand.title : '-' }}
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
      apiRoot: this.$api.actualProducts,
      editRoute: 'actualProductEdit',
      addRoute: 'actualProductAdd',
      headers: [
        {text: this.$t('general.title'), value: 'title', sortable: false},
        {text: this.$t('products.brand'), value: 'brand', sortable: false},
      ],
      editedItem: {
        title: null,
        brand: {},
      },
    }
  },
}
</script>

<style scoped>

</style>
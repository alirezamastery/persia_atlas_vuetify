<template>
  <Table
      :title="$t('products.productTypeSelectors')"
      :headers="headers"
      :api-root="apiRoot"
      :edit-route="editRoute"
      :add-route="addRoute"
  >
    <template v-slot:col-title="{ item }">
      <v-btn text :to="{name: editRoute, params:{id:item.id}}" class="text-none">
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
      apiRoot: this.$api.productTypeSelectors,
      editRoute: 'productTypeSelectorEdit',
      addRoute: 'productTypeSelectorAdd',
      headers: [
        {text: this.$t('general.title'), value: 'title', sortable: false},
      ],
      editedItem: {
        title: '',
      },
    }
  },
}
</script>

<style scoped>

</style>
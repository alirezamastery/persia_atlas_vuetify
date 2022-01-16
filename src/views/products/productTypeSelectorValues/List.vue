<template>
  <Table
      :title="$t('products.productTypeSelectorValues')"
      :headers="headers"
      :api-root="apiRoot"
      :edit-route="editRoute"
      :add-route="addRoute"
  >
    <template v-slot:item.digikala_id="{ item }">
      <v-btn text :to="{name: editRoute, params: {id: item.id}}">
        {{ item.digikala_id }}
      </v-btn>
    </template>

    <template v-slot:item.value="{ item }">
      {{ item.value }}
    </template>

    <template v-slot:item.selector="{ item }">
      {{ item.selector.title }}
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
      apiRoot: this.$api.productTypeSelectorValues,
      editRoute: 'productTypeSelectorValueEdit',
      addRoute: 'productTypeSelectorValueAdd',
      headers: [
        {text: this.$t('general.digikalaId'), value: 'digikala_id', sortable: true},
        {text: this.$t('general.value'), value: 'value', sortable: true},
        {text: this.$t('products.selector'), value: 'selector', sortable: false},
      ],
    }
  },
}
</script>

<style scoped>

</style>
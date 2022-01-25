<template>
  <Table
      :title="$t('acc.costTypes')"
      :headers="headers"
      :api-root="apiRoot"
      :edit-route="editRoute"
      :add-route="addRoute"
      :filters="filters"
  >
    <template v-slot:col-amount="{ item }">
      <v-btn text :to="{name: editRoute, params: {id: item.id}}">
        {{ item.amount | price }}
      </v-btn>
    </template>

    <template v-slot:col-date="{ item }">
      {{ item.date | persianDate }}
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
      apiRoot: this.$api.productCosts,
      editRoute: 'productCostEdit',
      addRoute: 'productCostAdd',
      headers: [
        {text: this.$t('general.amountToman'), value: 'amount', sortable: false},
        {text: this.$t('general.date'), value: 'date', sortable: false},
      ],
      filters: [
        {
          type: 'date',
          queryParam: 'date_gte',
          label:'general.fromDate'
        },
        {
          type: 'date',
          queryParam: 'date_lte',
          label:'general.untilDate'
        },
      ],
    }
  },
}
</script>

<style scoped>

</style>
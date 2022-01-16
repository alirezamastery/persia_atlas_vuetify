<template>
  <Table
      :title="$t('acc.costs')"
      :headers="headers"
      :api-root="apiRoot"
      :edit-route="editRoute"
      :add-route="addRoute"
  >
    <template v-slot:col-type="{ item }">
      <v-btn text :to="{name: editRoute, params: {id: item.id}}">
        {{ item.type.title }}
      </v-btn>
    </template>

    <template v-slot:col-amount="{ item }">
      {{ item.amount | price }}
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
      apiRoot: this.$api.costs,
      editRoute: 'costEdit',
      addRoute: 'costAdd',
      headers: [
        {text: this.$t('general.type'), value: 'type', sortable: false},
        {text: this.$t('general.amount'), value: 'amount', sortable: false},
        {text: this.$t('general.date'), value: 'date', sortable: false},
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
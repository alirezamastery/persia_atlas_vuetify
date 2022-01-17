<template>
  <Table
      :title="$t('products.variants')"
      :headers="headers"
      :api-root="apiRoot"
      :edit-route="editRoute"
      :add-route="addRoute"
      :filters="filters"
  >
    <template v-slot:col-product="{ item }">
      <v-btn text :to="{name: editRoute, params:{id:item.id}}">
        {{ item.product.title }}
      </v-btn>
    </template>

    <template v-slot:col-price_min="{ item }">
      {{ item.price_min | price }}
    </template>

    <template v-slot:col-selector="{ item }">
      {{ item.selector_values[0].value }}
    </template>

    <template v-slot:col-is_active="{ item }">
      <v-icon v-if="item.is_active" right small color="green">
        mdi-checkbox-marked-circle
      </v-icon>
      <v-icon v-else right small color="red">
        mdi-cancel
      </v-icon>
    </template>

    <template v-slot:col-has_competition="{ item }">
      <v-icon v-if="item.has_competition" right small color="red">
        mdi-sword-cross
      </v-icon>
      <v-icon v-else right small color="green">
        mdi-sleep
      </v-icon>
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
      apiRoot: this.$api.variants,
      editRoute: 'variantEdit',
      addRoute: 'variantAdd',
      headers: [
        {text: this.$t('products.product'), value: 'product', sortable: false},
        {text: this.$t('products.DKPC'), value: 'dkpc', align: 'start'},
        {text: this.$t('products.selector'), value: 'selector', sortable: false},
        {text: this.$t('products.priceMin'), value: 'price_min'},
        {text: this.$t('products.hasCompetition'), value: 'has_competition'},
        {text: this.$t('products.isActive'), value: 'is_active'},
      ],
      editedItem: {
        product: null,
        dkpc: '',
        price_min: 0,
        is_active: true,
        selector_values: [],
        actual_product: 0,
      },
      filters: [
        {
          type: 'boolean',
          queryParam: 'is_active',
          label:'general.isActive'
        },
        {
          type: 'boolean',
          queryParam: 'has_competition',
          label:'general.hasCompetition'
        },
      ],
    }
  },
}
</script>

<style scoped>

</style>
<template>
  <v-card flat>
    <v-card-title>
    </v-card-title>
    <v-card-text>
      <v-data-table
          :headers="headers"
          :items="items"
          :items-per-page="100"
          item-key="id"
          class="elevation-1"
          dense
          multi-sort
      >
        <!-- Customize table header START -->
        <template v-slot:top>
          <ListViewTableHeader
              :title="$t('general.routes.variants')"
              :api-root="apiRoot"
              :add-route="'variantAdd'"
              v-on:search-result="items = $event"
          />
        </template>
        <!-- Customize table header END -->

        <!-- Customize how each row is displayed START -->
        <template v-slot:item.product="{ item }">
          <v-btn text :to="{name: editRoute, params:{id:item.id}}">
            {{ item.product.title }}
          </v-btn>
        </template>

        <template v-slot:item.price_min="{ item }">
          {{ item.price_min | price }}
        </template>

        <template v-slot:item.selector="{ item }">
          {{ item.selector_values[0].value }}
        </template>

        <template v-slot:item.is_active="{ item }">
          <v-icon
              v-if="item.is_active"
              right
              small
              color="green"
          >
            mdi-checkbox-marked-circle
          </v-icon>
          <v-icon
              v-else
              right
              small
              color="red"
          >
            mdi-cancel
          </v-icon>
        </template>

        <template v-slot:item.has_competition="{ item }">
          <v-icon
              v-if="item.has_competition"
              right
              small
              color="red"
          >
            mdi-sword-cross
          </v-icon>
          <v-icon
              v-else
              right
              small
              color="green"
          >
            mdi-sleep
          </v-icon>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon
              small
              @click="$router.push({name: editRoute, params: {id: item.id}})"
          >
            mdi-pencil
          </v-icon>
        </template>
        <!-- Customize how each row is displayed END -->

        <template v-slot:no-data>
          {{ $t('general.noItemsFound') }}
        </template>

      </v-data-table>

      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="text-h5">
            {{ $t('general.itemDeleteQ').replace('{0}', editedItem.dkpc) }}
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue" @click="closeDelete">{{ $t('general.cancel') }}</v-btn>
            <v-btn color="red" @click="handleItemDeletion">{{ $t('general.yes') }}</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-card-text>
  </v-card>
</template>

<script>
import {listViewMixin} from '@/modules/mixins'
import ListViewTableHeader from '@/components/general/ListViewTableHeader'

export default {
  name: 'List',
  components: {
    ListViewTableHeader,
  },
  mixins: [listViewMixin],
  data() {
    return {
      apiRoot: this.$api.variants,
      editRoute: 'variantEdit',
      headers: [
        {text: this.$t('products.product'), value: 'product', sortable: false},
        {text: this.$t('products.DKPC'), value: 'dkpc', align: 'start'},
        {text: this.$t('products.selector'), value: 'selector'},
        {text: this.$t('products.priceMin'), value: 'price_min'},
        {text: this.$t('products.hasCompetition'), value: 'has_competition'},
        {text: this.$t('products.isActive'), value: 'is_active'},
        {text: this.$t('products.tools'), value: 'actions', sortable: false},
      ],
      editedItem: {
        product: null,
        dkpc: '',
        price_min: 0,
        is_active: true,
        selector_values: [],
        actual_product: 0,
      },
    }
  },
}
</script>

<style scoped>

</style>
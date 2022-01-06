<template>
  <v-card flat>
    <v-card-title>
    </v-card-title>
    <v-card-text>
      <v-data-table
          :headers="headers"
          :items="items"
          :items-per-page="100"
          item-key="name"
          class="elevation-1"
          dense
          multi-sort
      >
        <!-- Customize table header START -->
        <template v-slot:top>
          <ListViewTableHeader
              :title="$t('general.routes.actualProducts')"
              :api-root="apiRoot"
              :detail-view-route="detailViewRoute"
              v-on:search-result="items = $event"
          />
        </template>
        <!-- Customize table header END -->

        <!-- Customize how each row is displayed START -->
        <template v-slot:item.title="{ item }">
          <v-btn text :to="{name: detailViewRoute, params: {id: item.id}}">
            {{ item.title }}
          </v-btn>
        </template>

        <template v-slot:item.brand="{ item }">
          {{ item.brand ? item.brand.title : '-' }}
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon
              small
              @click="$router.push({name: detailViewRoute, params: {id: item.id}})"
          >
            mdi-pencil
          </v-icon>
          <v-icon
              small
              class="mr-3"
              @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>

        <template v-slot:no-data>
          {{ $t('general.noItemsFound') }}
        </template>
        <!-- Customize how each row is displayed END -->
      </v-data-table>
    </v-card-text>

    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">
          {{ $t('general.itemDeleteQ').replace('{0}', editedItem.title) }}
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue" @click="closeDelete">{{ $t('general.cancel') }}</v-btn>
          <v-btn color="red" @click="handleItemDeletion">{{ $t('general.yes') }}</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-card>
</template>

<script>
import ListViewTableHeader from '@/components/general/ListViewTableHeader'
import {listViewMixin} from '@/modules/mixins'

export default {
  name: 'List',
  components: {
    ListViewTableHeader,
  },
  mixins: [listViewMixin],
  data() {
    return {
      apiRoot: this.$api.actualProducts,
      detailViewRoute: 'actualProductsDetail',
      headers: [
        {text: this.$t('general.title'), value: 'title', sortable: false},
        {text: this.$t('products.brand'), value: 'brand', sortable: false},
        {text: this.$t('products.tools'), value: 'actions', sortable: false},
      ],
      editedItem: {
        title: null,
        brand: {},
      },
      defaultItem: {
        title: '',
        brand: {},
      },
    }
  },
}
</script>

<style scoped>

</style>
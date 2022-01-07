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
              :add-route="'productTypeAdd'"
              v-on:search-result="items = $event"
          />
        </template>
        <!-- Customize table header END -->

        <!-- Customize how each row is displayed START -->
        <template v-slot:item.title="{ item }">
          <v-btn text :to="{name: editRoute, params:{id:item.id}}">
            {{ item.title }}
          </v-btn>
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
      apiRoot: this.$api.productTypes,
      editRoute: 'productTypeEdit',
      headers: [
        {text: this.$t('general.title'), value: 'title', sortable: false},
        {text: this.$t('products.tools'), value: 'actions', sortable: false},
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
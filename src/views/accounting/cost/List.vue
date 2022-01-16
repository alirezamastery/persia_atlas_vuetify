<template>
  <v-card flat>
    <v-card-title>
      <v-toolbar>
        {{ $t('acc.costs') }}
      </v-toolbar>
    </v-card-title>
    <v-card-text>
      <v-data-table
          :headers="headers"
          :items="data.items"
          :server-items-length="data.count"
          item-key="id"
          class="elevation-1"
          hide-default-footer
          dense
          multi-sort
          @update:options="handleUpdate"
      >
        <!-- Customize table header START -->
        <template v-slot:top>
          <ListViewTableHeader
              :title="$t('acc.costs')"
              :api-root="apiRoot"
              :add-route="addRoute"
              v-on:search-input="searchPhrase = $event"
              hide-search
          />
        </template>
        <!-- Customize table header END -->

        <!-- Customize how each row is displayed START -->
        <template v-slot:item.type="{ item }">
          <v-btn text :to="{name: editRoute, params: {id: item.id}}">
            {{ item.type.title }}
          </v-btn>
        </template>

        <template v-slot:item.amount="{ item }">
          {{ item.amount | price }}
        </template>

        <template v-slot:item.date="{ item }">
          {{ item.date | persianDate }}
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

      <ListPagination
          :page="page"
          :page-size="pageSize"
          :table-loading="loading"
          :page-count="data.page_count"
          @page-select="handlePageSelect"
          @page-size-select="pageSize = $event"
      />

    </v-card-text>
  </v-card>
</template>

<script>
import {listViewMixin} from '@/mixins/listViewMixin'
import ListViewTableHeader from '@/components/viewList/TableHeader'
import ListPagination from '@/components/viewList/Pagination'

export default {
  name: 'List',
  components: {
    ListViewTableHeader,
    ListPagination,
  },
  mixins: [listViewMixin],
  data() {
    return {
      apiRoot: this.$api.costs,
      editRoute: 'costEdit',
      addRoute: 'costAdd',
      headers: [
        {text: this.$t('general.type'), value: 'type', sortable: false},
        {text: this.$t('general.amount'), value: 'amount', sortable: false},
        {text: this.$t('general.date'), value: 'date', sortable: false},
        {text: this.$t('products.tools'), value: 'actions', sortable: false},
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
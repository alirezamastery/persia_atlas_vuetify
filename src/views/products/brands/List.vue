<template>
  <v-card flat>
    <v-card-title>
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
              :title="$t('general.routes.brands')"
              :api-root="apiRoot"
              :add-route="'brandAdd'"
              v-on:search-input="searchPhrase = $event"
          />
        </template>
        <!-- Customize table header END -->

        <!-- Customize how each row is displayed START -->
        <template v-slot:item.title="{ item }">
          <v-btn text :to="{name: editRoute, params: {id: item.id}}">
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
import ListViewTableHeader from '@/components/general/ListViewTableHeader'
import ListPagination from '@/components/general/ListPagination'

export default {
  name: 'List',
  components: {
    ListViewTableHeader,
    ListPagination,
  },
  mixins: [listViewMixin],
  data() {
    return {
      apiRoot: this.$api.brands,
      editRoute: 'brandEdit',
      headers: [
        {text: this.$t('general.title'), value: 'title', sortable: false},
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
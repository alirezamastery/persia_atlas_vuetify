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
              :title="$t('general.routes.productTypeSelectorValues')"
              :api-root="apiRoot"
              :add-route="addRoute"
              v-on:search-input="searchPhrase = $event"
              :show-create-btn="false"
          />
        </template>
        <!-- Customize table header END -->

        <!-- Customize how each row is displayed START -->
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
    ListPagination
  },
  mixins: [listViewMixin],
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
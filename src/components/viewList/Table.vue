<template>
  <v-card flat>
    <v-card-title>
      <Header
          :title="title"
          :add-route="addRoute"
      />
    </v-card-title>
    <v-card-text>
      <v-data-table
          :headers="finalHeaders"
          :items="data.items"
          :server-items-length="data.count"
          item-key="id"
          class="elevation-1"
          hide-default-footer
          :dense="denseRows"
          multi-sort
          @update:options="handleUpdate"
      >
        <template v-slot:top v-if="!hideSearch">
          <slot name="header">
            <TableHeader
                :api-root="apiRoot"
                :add-route="addRoute"
                v-on:search-input="searchPhrase = $event"
            />
          </slot>
        </template>

        <!-- Customize how each row is displayed START -->
        <template
            v-for="(column) in headers"
            v-slot:[`item.${column.value}`]="{ item }"
        >
          <slot :name="`col-${column.value}`"
                v-bind:item="item"
                v-bind:data="data"
          >
            {{ item[column.value] }}
          </slot>
        </template>
        <!-- Customize how each row is displayed END -->

        <template v-slot:no-data>
          {{ $t('general.noItemsFound') }}
        </template>

        <template
            v-if="showActions"
            v-slot:item.actions="{item}"
        >
          <v-icon
              small
              @click="$router.push({name: editRoute, params: {id: item.id}})"
          >
            mdi-pencil
          </v-icon>
        </template>

      </v-data-table>

      <slot name="pagination">
        <ListPagination
            :page="page"
            :page-size="pageSize"
            :table-loading="loading"
            :page-count="data.page_count"
            @page-select="handlePageSelect"
            @page-size-select="pageSize = $event"
        />
      </slot>

    </v-card-text>
  </v-card>
</template>

<script>
import {listViewMixin} from '@/mixins/listViewMixin'
import TableHeader from '@/components/viewList/TableHeader'
import ListPagination from '@/components/viewList/Pagination'
import Header from '@/components/viewList/Header'

export default {
  name: 'Table',
  components: {
    Header,
    TableHeader,
    ListPagination,
  },
  mixins: [listViewMixin],
  props: {
    title: {type: String, required: true},
    apiRoot: {type: String, required: true},
    editRoute: {type: String, required: true},
    addRoute: {type: String, required: true},
    showActions: {type: Boolean, required: false, default: true},
    denseRows: {type: Boolean, required: false, default: true},
    hideSearch: {type: Boolean, required: false, default: false},
    headers: {type: Array, required: true},
  },
  computed: {
    finalHeaders() {
      const h = this.headers
      if (this.showActions)
        h.push({
          text: this.$t('products.tools'),
          value: 'actions',
          sortable: false,
        })
      console.log(h)
      return h
    },
  },
}
</script>

<style scoped>

</style>
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
              :title="$t('general.routes.products')"
              :api-root="apiRoot"
              :add-route="'productAdd'"
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

        <template v-slot:item.dkp="{ item }">
          {{ item.dkp }}
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

        <template v-slot:item.type="{ item }">
          {{ item.type.title | price }}
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

      <v-container class="pt-5">
        <v-row>
          <v-col cols="12" sm="9" lg="10">
            <v-pagination
                v-model="page"
                :length="data.page_count"
                :total-visible="totalPaginationVisible"
                :disabled="loading"
                @input="reFetchData"
            />
          </v-col>
          <v-spacer/>
          <v-col cols="4" sm="3" lg="2" style="max-width: 100px">
            <v-select
                v-model="pageSize"
                :items="pageSizeOptions"
                :disabled="loading"
                solo-inverted
            />
          </v-col>
        </v-row>
      </v-container>

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
      apiRoot: this.$api.products,
      editRoute: 'productEdit',
      headers: [
        {text: this.$t('general.title'), value: 'title', sortable: false},
        {text: this.$t('general.dkp'), value: 'dkp'},
        {text: this.$t('general.isActive'), value: 'is_active'},
        {text: this.$t('general.type'), value: 'type', sortable: false},
        {text: this.$t('products.tools'), value: 'actions', sortable: false},
      ],
      editedItem: {
        title: null,
        dkp: null,
        is_active: null,
        type: null,
      },
    }
  },
}
</script>

<style scoped>

</style>
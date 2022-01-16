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

        <template v-slot:item.price_step="{ item }">
          <v-select
              v-model="item.price_step"
              :items="priceStepOptions"
              :loading="item.loading"
              :disabled="item.loading"
              dense
              flat
              hide-details
              solo
              outlined
              style="max-width: 100px"
              @change="handlePriceStepChange(item.id, $event)"
          />
        </template>

        <template v-slot:item.is_active="{ item }">
          <v-icon v-if="item.is_active" right small color="green">
            mdi-checkbox-marked-circle
          </v-icon>
          <v-icon v-else right small color="red">
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
import {v4 as uuid4} from 'uuid'

export default {
  name: 'List',
  components: {
    ListViewTableHeader,
    ListPagination,
  },
  mixins: [listViewMixin],
  data() {
    return {
      apiRoot: this.$api.products,
      editRoute: 'productEdit',
      headers: [
        {text: this.$t('general.title'), value: 'title', sortable: false},
        {text: this.$t('general.dkp'), value: 'dkp', sortable: false},
        {text: this.$t('general.priceStep'), value: 'price_step', sortable: false},
        {text: this.$t('general.isActive'), value: 'is_active', sortable: false},
        {text: this.$t('general.type'), value: 'type', sortable: false},
        {text: this.$t('products.tools'), value: 'actions', sortable: false},
      ],
      editedItem: {
        title: null,
        dkp: null,
        is_active: null,
        type: null,
      },
      priceStepOptions: [100, 200, 300, 400, 500],
    }
  },
  methods: {
    handlePriceStepChange(id, event) {
      console.log(id, event)
      const row = this.data.items.find(item => item.id === id)
      const rowIndex = this.data.items.findIndex(item => item.id === id)
      row['price_step'] = event
      console.log(row)

      const url = this.apiRoot + id + '/'
      console.log('url:', url)
      const data = {
        'price_step': event,
      }
      // this.$set(this.data.items[rowIndex], 'loading', false)
      // when changing 'is_active', reactivity for 'loading' works ???!!!
      // this.$set(this.data.items[rowIndex], 'is_active', false)
      // console.log(this.data.items[rowIndex])
      this.axios.patch(url, data)
          .then(res => {
            console.log('res', res)
            // console.log(this.data.items[rowIndex])
            this.addSnackbar('green', res.statusText)
          })
          .catch(err => {
            console.log('err', err)
            this.addSnackbar('red', err.response.data)
          })

    },
  },
}
</script>

<style scoped>

</style>
<template>
  <Table
      :title="$t('products.products')"
      :headers="headers"
      :add-route="addRoute"
      :edit-route="editRoute"
      :api-root="apiRoot"
      :denseRows="false"
      :filters="filters"
  >
    <template v-slot:col-title="{ item }">
      <v-btn text :to="{name: editRoute, params: {id: item.id}}">
        {{ item.title }}
      </v-btn>
    </template>

    <template v-slot:col-dkp="{ item }">
      {{ item.dkp }}
    </template>

    <template v-slot:col-price_step="{ item , data }">
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
          @change="handlePriceStepChange(item.id, data, $event)"
      />
    </template>

    <template v-slot:col-is_active="{ item }">
      <v-icon v-if="item.is_active" right small color="green">
        mdi-checkbox-marked-circle
      </v-icon>
      <v-icon v-else right small color="red">
        mdi-cancel
      </v-icon>
    </template>

    <template v-slot:col-type="{ item }">
      {{ item.type.title }}
    </template>
  </Table>
</template>

<script>
import {listViewMixin} from '@/mixins/listViewMixin'
import Table from '@/components/viewList/Table'

export default {
  name: 'List',
  components: {
    Table,
  },
  mixins: [listViewMixin],
  data() {
    return {
      apiRoot: this.$api.products,
      editRoute: 'productEdit',
      addRoute: 'productAdd',
      headers: [
        {text: this.$t('general.title'), value: 'title', sortable: false},
        {text: this.$t('general.dkp'), value: 'dkp', sortable: false},
        {text: this.$t('general.priceStep'), value: 'price_step', sortable: false},
        {text: this.$t('general.isActive'), value: 'is_active', sortable: false},
        {text: this.$t('general.type'), value: 'type', sortable: false},
      ],
      editedItem: {
        title: null,
        dkp: null,
        is_active: null,
        type: null,
      },
      priceStepOptions: [100, 200, 300, 400, 500],
      filters: [
        {
          type: 'boolean',
          queryParam: 'is_active',
          label:'general.isActive'
        },
        {
          type: 'select',
          queryParam: 'price_step',
          label:'general.priceStep',
          options: [100, 200, 300, 400, 500],
        },
      ],
    }
  },
  methods: {
    handlePriceStepChange(id, tableData, event) {
      console.log(id, event)
      const row = tableData.items.find(item => item.id === id)
      const rowIndex = tableData.items.findIndex(item => item.id === id)
      row['price_step'] = event
      console.log(row)

      const url = this.apiRoot + id + '/'
      console.log('url:', url)
      const payload = {
        'price_step': event,
      }
      // this.$set(this.data.items[rowIndex], 'loading', false)
      // when changing 'is_active', reactivity for 'loading' works ???!!!
      // this.$set(this.data.items[rowIndex], 'is_active', false)
      // console.log(this.data.items[rowIndex])
      this.axios.patch(url, payload)
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
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
      apiRoot: this.$api.variants,
      editRoute: 'variantEdit',
      headers: [
        {text: this.$t('products.product'), value: 'product', sortable: false},
        {text: this.$t('products.DKPC'), value: 'dkpc', align: 'start'},
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
  // computed: {
  //   formTitle() {
  //     return this.editedIndex === -1 ? this.$t('general.create') : this.$t('general.create')
  //   },
  // },
  // watch: {
  //   dialog(val) {
  //     val || this.closeDialog()
  //   },
  //   dialogDelete(val) {
  //     val || this.closeDelete()
  //   },
  // },
  // created() {
  //   this.axios.get(this.$api.variants)
  //       .then(res => {
  //         console.log('main items', res)
  //         this.items = res.data
  //       })
  //       .catch(err => {
  //         console.log('main items error', err)
  //       })
  // },
  // methods: {
  //   handleSelection(event) {
  //     console.log('handleSelection', event)
  //   },
  //   closeDialog() {
  //     this.dialog = false
  //     this.$nextTick(() => {
  //       this.editedItem = Object.assign({}, this.defaultItem)
  //       this.editedIndex = -1
  //     })
  //   },
  //
  //   closeDelete() {
  //     this.dialogDelete = false
  //     this.$nextTick(() => {
  //       this.editedItem = Object.assign({}, this.defaultItem)
  //       this.editedIndex = -1
  //     })
  //   },
  //
  //   deleteItem(item) {
  //     this.editedIndex = this.items.indexOf(item)
  //     console.log('deleteItem | editedIndex', this.editedIndex)
  //     this.editedItem = Object.assign({}, item)
  //     console.log('deleteItem | editedItem', this.editedItem)
  //     this.dialogDelete = true
  //   },
  //
  //   handleItemDeletion() {
  //     const url = `${this.$api.variants}${this.editedItem.id}/`
  //     const deletedItemIndex = this.editedIndex
  //
  //     this.axios.delete(url)
  //         .then(res => {
  //           // console.log('delete', res)
  //           // console.log('delete index', deletedItemIndex)
  //           this.items.splice(deletedItemIndex, 1)
  //           // console.log('items after dleete' , this.items)
  //         })
  //         .catch(err => console.log('delete error ', err))
  //
  //     this.closeDelete()
  //   },
  // },
}
</script>

<style scoped>

</style>
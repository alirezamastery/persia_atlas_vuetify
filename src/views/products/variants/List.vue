<template>
  <v-card flat>
    <v-card-title>
    </v-card-title>
    <v-card-text>
      <v-data-table
          v-if="items.length"
          dense
          :headers="headers"
          :items="items"
          :items-per-page="100"
          item-key="name"
          class="elevation-1"
          multi-sort
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>{{ $t('general.routes.variants') }}</v-toolbar-title>
            <v-divider
                class="mx-4"
                inset
                vertical
            />
            <v-text-field
                v-model="searchPhrase"
                append-icon="mdi-magnify"
                :label="$t('general.search')"
                single-line
                hide-details
                solo
                dense
                flat
                @input="handleSearchInput"
            />
            <v-spacer/>
            <v-btn
                color="primary"
                dark
                class="mb-2"
                @click="$router.push({name:'variantsDetail'})"
            >
              {{ $t('general.create') }}
            </v-btn>

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

          </v-toolbar>
        </template>

        <template v-slot:item.product="{ item }">
          <v-btn text :to="{name:'variantsDetail', params:{id:item.id}}">
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
              @click="editItem(item)"
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
          <v-btn
              color="primary"
              @click="initialize"
          >
            Reset
          </v-btn>
        </template>

      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import {mapState} from 'vuex'
import {debounce} from '@/modules/api-tools'
import AutoComplete from '@/components/AutoComplete'

export default {
  name: 'List',
  components: {
    // AutoComplete
  },
  data() {
    return {
      items: [],
      headers: [
        {text: this.$t('products.product'), value: 'product', filterable: true},
        {text: this.$t('products.DKPC'), value: 'dkpc'},
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
      defaultItem: {
        product: null,
        dkpc: '',
        price_min: 0,
        is_active: true,
        selector_values: [],
        actual_product: 0,
      },
      editedIndex: -1,
      dialog: false,
      dialogDelete: false,
      loading: false,
      searchPhrase: '',
      selectorValues: [],
    }
  },
  computed: {
    ...mapState({
      globalCardClass: 'globalCardClass',
    }),
    formTitle() {
      return this.editedIndex === -1 ? this.$t('general.create') : this.$t('general.create')
    },
  },
  watch: {
    dialog(val) {
      val || this.closeDialog()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
    // searchPhrase(newValue, oldValue) {
    //   console.log('search', newValue, oldValue)
    //   this.handleSearchInput(newValue)
    // },
  },
  created() {
    this.axios.get(this.$api.variants)
        .then(res => {
          console.log('main items', res)
          this.items = res.data
        })
        .catch(err => {
          console.log('main items error', err)
        })
  },
  methods: {
    handleSearchInput() {
      const apiCall = (url) => {
        this.axios.get(url)
            .then(res => {
              this.loading = false
              this.items = res.data
              console.log('handleSearchInput', this.items)
            })
            .catch(err => {
              console.log(err)
            })
      }

      const debouncedAPICall = debounce(apiCall, 300)

      this.loading = true
      let url = this.$api.variants
      if (this.searchPhrase !== '')
        url += `?search=${this.searchPhrase}`
      debouncedAPICall(url)
    },

    editItem(item) {
      // this.editedIndex = this.items.indexOf(item)
      // console.log('editItem', this.editedIndex, item)
      // this.editedItem = Object.assign({}, item)
      // this.dialog = true
      this.$router.push({name: 'variantsDetail', params: {id: item.id}})
    },

    closeDialog() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    saveItem() {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem)
        const url = `${this.$api.variants}${this.editedItem.id}/`
        this.axios.patch(url, this.editedItem)
            .then(res => {
              console.log('patch', res)
            })
            .catch(err => console.log('patch error ', err))

      } else {
        console.log('post this.editedItem', this.editedItem)
        this.items.push(this.editedItem)
        this.axios.post(this.$api.variants, this.editedItem)
            .then(res => {
              console.log('post', res)
            })
            .catch(err => console.log('post error ', err))
      }

      this.closeDialog()
    },


    deleteItem(item) {
      this.editedIndex = this.items.indexOf(item)
      console.log('deleteItem | editedIndex', this.editedIndex)
      this.editedItem = Object.assign({}, item)
      console.log('deleteItem | editedItem', this.editedItem)
      this.dialogDelete = true
    },

    handleItemDeletion() {
      const url = `${this.$api.variants}${this.editedItem.id}/`
      const deletedItemIndex = this.editedIndex

      this.axios.delete(url)
          .then(res => {
            // console.log('delete', res)
            // console.log('delete index', deletedItemIndex)
            this.items.splice(deletedItemIndex, 1)
            // console.log('items after dleete' , this.items)
          })
          .catch(err => console.log('delete error ', err))

      this.closeDelete()
    },
  },
}
</script>

<style scoped>

</style>
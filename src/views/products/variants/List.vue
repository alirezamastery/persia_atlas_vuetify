<template>
  <v-card>
    <v-card-title>
      <!--      {{ $t('general.routes.variants') }}-->
    </v-card-title>
    <v-card-text>

      <v-data-table
          v-if="items.length"
          dense
          :headers="headers"
          :items="items"
          item-key="name"
          class="elevation-1"
          multi-sort
          show-select
      >
        <template v-slot:top>
          <v-toolbar
              flat
          >
            <v-toolbar-title>{{ $t('general.routes.variants') }}</v-toolbar-title>
            <v-divider
                class="mx-4"
                inset
                vertical
            />
            <v-spacer/>
            <v-dialog
                v-model="dialog"
                max-width="500px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                >
                  {{ $t('general.create') }}
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <!--                  <span class="text-h5">{{ $t('general.createANew').replace('{0}', $t('products.variant')) }}</span>-->
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <AutoComplete
                            :label="$t('products.product')"
                            :query-param="'title'"
                            :obj-title-key="'title'"
                            :api="$api.products"
                            v-on:value-change="handleSelectProduct"
                            :default-value="editedItem.product ? editedItem.product.id : null"
                        />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <AutoComplete
                            :label="$t('products.actualProduct')"
                            :query-param="'title'"
                            :obj-title-key="'title'"
                            :api="$api.actualProducts"
                            v-on:value-change="handleSelectActualProduct"
                            :default-value="editedItem.actual_product ? editedItem.actual_product.id : null"
                        />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <AutoComplete
                            :label="$t('products.actualProduct')"
                            :query-param="'title'"
                            :obj-title-key="'title'"
                            :api="$api.actualProducts"
                            v-on:value-change="handleSelectActualProduct"
                            :default-value="editedItem.actual_product ? editedItem.actual_product.id : null"
                        />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col
                          cols="12"
                          sm="6"
                          md="4"
                      >
                        <v-text-field
                            v-model="editedItem.dkpc"
                            :label="$t('products.DKPC')"
                        />
                      </v-col>
                      <v-col
                          cols="12"
                          sm="6"
                          md="4"
                      >
                        <v-text-field
                            v-model="editedItem.price_min"
                            :label="$t('products.priceMin')"
                        ></v-text-field>
                      </v-col>
                      <v-col
                          cols="12"
                          sm="6"
                          md="4"
                      >
                        <v-checkbox
                            v-model="editedItem.is_active"
                            :label="$t('products.isActive')"
                        ></v-checkbox>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer/>
                  <v-btn
                      color="orange"
                      text
                      @click="closeDialog"
                  >
                    {{ $t('general.cancel') }}
                  </v-btn>
                  <v-btn
                      color="green darken-1"
                      @click="saveItem"
                  >
                    {{ $t('general.save') }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

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
          {{ item.product.title }}
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
  components: {AutoComplete},
  data() {
    return {
      items: [],
      headers: [
        {text: this.$t('products.product'), value: 'product'},
        {text: this.$t('products.DKPC'), value: 'dkpc'},
        {text: this.$t('products.priceMin'), value: 'price_min'},
        {text: this.$t('products.hasCompetition'), value: 'has_competition'},
        {text: this.$t('products.isActive'), value: 'is_active'},
        {text: this.$t('products.tools'), value: 'actions', sortable: false},
      ],
      editedIndex: -1,
      editedItem: {
        product_id: null,
        dkpc: '',
        price_min: 0,
        is_active: true,
        selector_value: 0,
        actual_product_id: 0,
      },
      defaultItem: {
        product_id: null,
        dkpc: '',
        price_min: 0,
        is_active: true,
        selector_value: 0,
        actual_product_id: 0,
      },
      dialog: false,
      dialogDelete: false,
      loading: false,
      searchPhrase: '',
      productItems: [],
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
    searchPhrase(val) {
      val && val !== this.select && this.handleSearchInput(val)
    },
  },
  created() {
    this.axios.get('products/variants/')
        .then(res => {
          console.log('items', res)
          this.items = res.data
        })
        .catch(err => {
          console.log('items error', err)

        })
  },
  methods: {
    handleSelectProduct(event) {
      console.log(event)
      // this.$router.push({name:})
      console.log('change in list', event, this.editedItem)
      this.editedItem.product_id = event
    },

    handleSelectActualProduct(event) {
      this.editedItem.actual_product_id = event
    },

    handleSearchInput() {
      if (!this.searchPhrase) {
        this.productItems = []
        return
      }

      const apiCall = (url) => {
        this.axios.get(url)
            .then(res => {
              this.loading = false
              this.productItems = res.data
              console.log('handleSearchInput', this.productItems)
            })
            .catch(err => {
              console.log(err)
            })
      }

      const debouncedAPICall = debounce(apiCall, 300)

      this.loading = true
      const url = `products/actual-products/?title=${this.searchPhrase}`
      debouncedAPICall(url)
    },

    editItem(item) {
      console.log('editItem', item)
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.items.splice(this.editedIndex, 1)
      this.closeDelete()
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
        console.log('post this.editedItem' , this.editedItem)
        this.items.push(this.editedItem)
        this.axios.post(this.$api.variants, this.editedItem)
            .then(res => {
              console.log('post', res)
            })
            .catch(err => console.log('post error ', err))
      }

      this.closeDialog()
    },

    handleItemDeletion() {
      const url = `${this.$api.variants}${this.editedItem.id}/`
      this.axios.delete(url)
          .then(res => {
            console.log('patch', res)
          })
          .catch(err => console.log('patch error ', err))
    },
  },
}
</script>

<style scoped>

</style>
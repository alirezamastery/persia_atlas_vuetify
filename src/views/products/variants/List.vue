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
                  <span class="text-h5">{{ $t('general.createANew').replace('{0}', $t('products.variant')) }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <!--                        <v-autocomplete-->
                        <!--                            v-model="editedItem.product"-->
                        <!--                            :loading="loading"-->
                        <!--                            :items="productItems"-->
                        <!--                            :search-input.sync="searchPhrase"-->
                        <!--                            item-text="title"-->
                        <!--                            item-value="id"-->
                        <!--                            class="mx-4"-->
                        <!--                            flat-->
                        <!--                            hide-no-data-->
                        <!--                            hide-details-->
                        <!--                            :label="$t('products.product')"-->
                        <!--                            solo-inverted-->
                        <!--                            @change="handleSelect"-->
                        <!--                        >-->
                        <!--                          <template v-slot:no-data>-->
                        <!--                            <v-list-item>-->
                        <!--                              <v-list-item-title>-->
                        <!--                                {{ $t('general.noItemsFound') }}-->
                        <!--                              </v-list-item-title>-->
                        <!--                            </v-list-item>-->
                        <!--                          </template>-->

                        <!--                          <template v-slot:item="{ item }">-->
                        <!--                            <v-list-item-content>-->
                        <!--                              <v-list-item-title v-text="item.title"/>-->
                        <!--                            </v-list-item-content>-->
                        <!--                          </template>-->

                        <!--                          <template v-slot:append>-->
                        <!--                            <v-progress-circular v-if="loading" indeterminate color="#ad5697"/>-->
                        <!--                          </template>-->

                        <!--                        </v-autocomplete>-->
                        <AutoComplete
                            :label="$t('products.product')"
                            :query-param="'title'"
                            :obj-title-key="'title'"
                            :api="'products/products/'"
                            v-on:value-change="handleSelect"
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
                      <v-col
                          cols="12"
                          sm="6"
                          md="4"
                      >
                        <v-text-field
                            v-model="editedItem.actual_product"
                            :label="$t('products.actualProduct')"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer/>
                  <v-btn
                      color="orange"
                      text
                      @click="close"
                  >
                    {{ $t('general.cancel') }}
                  </v-btn>
                  <v-btn
                      color="green darken-1"
                      @click="save"
                  >
                    {{ $t('general.save') }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
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
        product: null,
        dkpc: '',
        price_min: 0,
        is_active: true,
        selector_value: 0,
        actual_product: 0,
      },
      defaultItem: {
        product: null,
        dkpc: '',
        price_min: 0,
        is_active: true,
        selector_value: 0,
        actual_product: 0,
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
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },
  watch: {
    dialog(val) {
      val || this.close()
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
    handleSelect(event) {
      console.log(event)
      // this.$router.push({name:})
      console.log('change in list',event,  this.editedItem)
      this.editedItem.product = event
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

    close() {
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

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>

<style scoped>

</style>
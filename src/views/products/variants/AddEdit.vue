<template>
  <v-card flat>
    <v-card-title>
      {{ formTitle }}
    </v-card-title>

    <v-card-text v-if="showForm">
      <validation-observer
          ref="form"
          v-slot="{ invalid }"
      >
        <v-form @submit.prevent="saveItem">
          <v-container>
            <v-row>
              <v-col cols="12">
                <ValidationProvider name="Product" rules="required" v-slot="{ errors }">
                  <AutoComplete
                      v-model="form.product.id"
                      :label="$t('products.product')"
                      :query-param="'title'"
                      :obj-repr-field="'title'"
                      :api="$api.products"
                      :error-messages="errors"
                  />
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <ValidationProvider name="ActualProduct" rules="required" v-slot="{ errors }">
                  <AutoComplete
                      v-model="form.actual_product.id"
                      :label="$t('products.actualProduct')"
                      :query-param="'title'"
                      :obj-repr-field="'title'"
                      :api="$api.actualProducts"
                      :error-messages="errors"
                  />
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <ValidationProvider name="SelectorValues" rules="required" v-slot="{ errors }">
                  <AutoComplete
                      v-model="form.selector_values"
                      :label="$t('products.selectorValues')"
                      :query-param="'value'"
                      :obj-repr-field="'value'"
                      :api="$api.productTypeSelectorValues"
                      :error-messages="errors"
                      select-multiple
                  />
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <ValidationProvider name="dkpc" rules="required" v-slot="{ errors }">
                  <v-text-field
                      v-model="form.dkpc"
                      :label="$t('products.DKPC')"
                      :error-messages="errors"
                  />
                </ValidationProvider>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <ValidationProvider
                    name="PriceMin"
                    rules="required|max_value:2147483647"
                    v-slot="{ errors }"
                >
                  <v-text-field
                      v-model="form.price_min"
                      :label="$t('products.priceMin')"
                      :error-messages="errors"
                  />
                </ValidationProvider>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-checkbox
                    v-model="form.is_active"
                    :label="$t('products.isActive')"
                />
              </v-col>
            </v-row>
          </v-container>

          <DetailViewActions
              :save-disabled="invalid"
              :show-delete="!!editingItemId"
              v-on:delete="deleteDialog = true"
          />

        </v-form>
      </validation-observer>
    </v-card-text>

    <DetailViewDeleteDialog
        v-if="editingItemId"
        v-model="deleteDialog"
        :item-title="form.dkpc"
        v-on:delete="deleteItem"
    />

  </v-card>

</template>

<script>
import {AddEditViewMixin} from '@/mixins/addEditView'
import AutoComplete from '@/components/AutoComplete'
import DetailViewActions from '@/components/general/DetailViewActions'
import DetailViewDeleteDialog from '@/components/general/DetailViewDeleteDialog'
import {v4 as uuid4} from 'uuid'
import {textToolsMixin} from '@/mixins/textTools'

export default {
  name: 'Details',
  components: {
    AutoComplete,
    DetailViewActions,
    DetailViewDeleteDialog,
  },
  mixins: [textToolsMixin, AddEditViewMixin],
  props: {
    id: {
      type: [Number, String],
      default: null,
    },
  },
  data() {
    return {
      apiRoot: this.$api.variants,
      listViewRoute: 'variantsList',
      itemType: this.$t('products.variant'),
      // showForm: true,
      // deleteDialog: false,
      form: {
        product: {},
        dkpc: '',
        price_min: 0,
        is_active: true,
        selector_values: [],
        actual_product: {},
      },
    }
  },
  computed: {
    itemRepr() {
      return this.form.dkpc.toString()
    },
    // editingItemId() {
    //   return this.$route.params.id
    // },
    // formTitle() {
    //   if (this.editingItemId)
    //     return this.$t('general.change') + ' ' + this.$t('products.variant')
    //   return this.createNewTitle('products.variant')
    // },
  },
  // created() {
  //   if (this.id) {
  //     this.showForm = false
  //     this.axios.get(this.apiRoot + this.id)
  //         .then(res => {
  //           console.log('details', res)
  //           this.form = res.data
  //           this.showForm = true
  //           this.form.selector_values = res.data.selector_values.map(itm => itm.id)
  //         })
  //     console.log('no details, getting the item details from server')
  //   }
  // },
  methods: {
    getRequestData() {
      return {
        product: this.form.product.id,
        dkpc: this.form.dkpc,
        has_competition: this.form.has_competition,
        is_active: this.form.is_active,
        price_min: this.form.price_min,
        selector_values: this.form.selector_values,
        actual_product: this.form.actual_product.id,
      }
    },



  },

}
</script>

<style scoped>

</style>
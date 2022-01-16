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
              <v-col cols="12" md="6" lg="4">
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
              <v-col cols="12" md="6" lg="4">
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
              <v-col cols="12" md="6" lg="4">
                <ValidationProvider name="SelectorValues" rules="required" v-slot="{ errors }">
                  <AutoComplete
                      v-model="form.selector_values"
                      :label="$t('products.selectorValues')"
                      :query-param="'search'"
                      :obj-repr-field="'value'"
                      :api="$api.productTypeSelectorValues"
                      :error-messages="errors"
                      select-multiple
                  />
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6" lg="4">
                <ValidationProvider name="dkpc" rules="required" v-slot="{ errors }">
                  <v-text-field
                      v-model="form.dkpc"
                      :label="$t('products.DKPC')"
                      :error-messages="errors"
                  />
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6" lg="4">
                <ValidationProvider name="PriceMin" rules="required|number_with_comma" v-slot="{ errors }">
                  <v-text-field
                      v-model="form.price_min"
                      ref="priceMin"
                      :label="$t('general.priceMinToman')"
                      :error-messages="errors"
                  />
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6" lg="4">
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
        :item-title="itemRepr"
        v-on:delete="deleteItem"
    />

  </v-card>
</template>

<script>
import {AddEditViewMixin} from '@/mixins/addEditView'
import {textToolsMixin} from '@/mixins/textTools'
import {numberToolsMixin} from '@/mixins/numberTools'
import AutoComplete from '@/components/AutoComplete'
import DetailViewActions from '@/components/viewAddEdit/Actions'
import DetailViewDeleteDialog from '@/components/viewAddEdit/DeleteDialog'

export default {
  name: 'Details',
  components: {
    AutoComplete,
    DetailViewActions,
    DetailViewDeleteDialog,
  },
  mixins: [textToolsMixin, AddEditViewMixin, numberToolsMixin],
  props: {
    id: {
      type: [Number, String],
      default: null,
    },
  },
  data() {
    return {
      apiRoot: this.$api.variants,
      listViewRoute: 'variantList',
      itemType: this.$t('products.variant'),
      form: {
        product: {},
        dkpc: '',
        price_min: null,
        is_active: true,
        selector_values: [],
        actual_product: {},
      },
      priceMin: null,
    }
  },
  computed: {
    itemRepr() {
      return this.form.dkpc.toString()
    },
  },
  watch: {
    'form.price_min': function (newVal) {
      this.form.price_min = this.formatIntNumber(newVal)
    },
  },
  methods: {
    formInit(resData) {
      this.form = resData
      this.form.price_min = this.formatIntNumber(this.form.price_min.toString())
      this.form.selector_values = resData.selector_values.map(itm => itm.id)
    },
    getRequestData() {
      return {
        product: this.form.product.id,
        dkpc: this.form.dkpc,
        has_competition: this.form.has_competition,
        is_active: this.form.is_active,
        price_min: parseInt(this.removeCommas(this.form.price_min)),
        selector_values: this.form.selector_values,
        actual_product: this.form.actual_product.id,
      }
    },
  },
}
</script>

<style scoped>

</style>
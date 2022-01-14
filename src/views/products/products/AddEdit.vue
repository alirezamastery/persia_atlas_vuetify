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
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <ValidationProvider name="dkp" rules="required" v-slot="{ errors }">
                  <v-text-field
                      v-model="form.dkp"
                      :label="$t('products.dkp')"
                      :error-messages="errors"
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
                <ValidationProvider name="Title" rules="required" v-slot="{ errors }">
                  <v-text-field
                      v-model="form.title"
                      :label="$t('general.title')"
                      :error-messages="errors"
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
                <v-checkbox
                    v-model="form.is_active"
                    :label="$t('products.isActive')"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col
                  cols="12"
                  lg="4"
                  sm="12"
                  md="12"
              >
                <ValidationProvider name="SelectorValues" rules="required" v-slot="{ errors }">
                  <AutoComplete
                      v-model="form.type.id"
                      :label="$t('products.productType')"
                      :query-param="'search'"
                      :obj-repr-field="'title'"
                      :api="$api.productTypes"
                      :error-messages="errors"
                  />
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" lg="4" sm="12" md="12">
                <ValidationProvider name="PriceStep" rules="required">
                  <v-select
                      v-model="form.price_step"
                      :items="priceStepOptions"
                      :label="$t('general.priceStep')"
                      style="max-width: 100px"
                  />
                </ValidationProvider>
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
import DetailViewActions from '@/components/general/DetailViewActions'
import DetailViewDeleteDialog from '@/components/general/DetailViewDeleteDialog'
import AutoComplete from '@/components/AutoComplete'

export default {
  name: 'Details',
  components: {
    DetailViewActions,
    DetailViewDeleteDialog,
    AutoComplete,
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
      apiRoot: this.$api.products,
      listViewRoute: 'productList',
      itemType: this.$t('products.product'),
      form: {
        title: '',
        dkp: null,
        is_active: true,
        type: {},
        price_step: '',
      },
      priceStepOptions: [100, 200, 300, 400, 500],
    }
  },
  computed: {
    itemRepr() {
      return this.form.title.toString()
    },
  },
  methods: {
    formInit(resData) {
      this.form = resData
    },
    getRequestData() {
      return {
        title: this.form.title,
        dkp: this.form.dkp,
        is_active: this.form.is_active,
        type: this.form.type.id,
        price_step: this.form.price_step,
      }
    },
  },
}
</script>

<style scoped>

</style>
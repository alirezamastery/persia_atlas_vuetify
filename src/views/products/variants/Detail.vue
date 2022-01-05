<template>
  <v-card flat>
    <v-card-title>
      <!--                  <span class="text-h5">{{ $t('general.createANew').replace('{0}', $t('products.variant')) }}</span>-->
      <span class="text-h5" v-if="editingItemId">
        {{ $t('general.change') + ' ' + $t('products.variant') }}
      </span>
      <span v-else>
        {{ formTitle }}
      </span>
    </v-card-title>

    <v-card-text v-if="showForm">
      <v-container>
        <v-row>
          <v-col cols="12">
            <AutoComplete
                :label="$t('products.product')"
                :query-param="'title'"
                :obj-repr-field="'title'"
                :api="$api.products"
                v-on:value-change="handleSelectProduct"
                :default-value="form.product.id"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <AutoComplete
                :label="$t('products.actualProduct')"
                :query-param="'title'"
                :obj-repr-field="'title'"
                :api="$api.actualProducts"
                v-on:value-change="handleSelectActualProduct"
                :default-value="form.actual_product.id"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <AutoComplete
                :label="$t('products.selectorValues')"
                :query-param="'value'"
                :obj-repr-field="'value'"
                :api="$api.productSelectorValues"
                v-on:value-change="handleSelectProductSelectorValues"
                :default-value="form.selector_values"
                select-multiple
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
                v-model="form.dkpc"
                :label="$t('products.DKPC')"
            />
          </v-col>
          <v-col
              cols="12"
              sm="6"
              md="4"
          >
            <v-text-field
                v-model="form.price_min"
                :label="$t('products.priceMin')"
            ></v-text-field>
          </v-col>
          <v-col
              cols="12"
              sm="6"
              md="4"
          >
            <v-checkbox
                v-model="form.is_active"
                :label="$t('products.isActive')"
            ></v-checkbox>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <DetailViewActions
        v-on:save="saveItem"
        v-on:delete="deleteDialog = true"
    />

    <v-dialog v-if="editingItemId" v-model="deleteDialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">
          <!--          FOR ADD FORM form IS NULL!!! -->
          {{ $t('general.itemDeleteQ').replace('{0}', form.dkpc) }}
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue" @click="deleteDialog = false">{{ $t('general.cancel') }}</v-btn>
          <v-btn color="red" @click="deleteItem">{{ $t('general.yes') }}</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>

</template>

<script>
import AutoComplete from '@/components/AutoComplete'
import DetailViewActions from '@/components/general/DetailViewActions'

export default {
  name: 'Details',
  components: {
    AutoComplete,
    DetailViewActions,
  },
  props: {
    id: {
      type: [Number, String],
      default: null,
    },
  },
  data() {
    return {
      showForm: true,
      form: {
        product: {},
        dkpc: '',
        price_min: 0,
        is_active: true,
        selector_values: [],
        actual_product: {},
      },
      productId: null,
      deleteDialog: false,
    }
  },
  computed: {
    editingItemId() {
      return this.$route.params.id
    },
    formTitle() {
      if (this.editingItemId)
        return this.$t('general.change') + ' ' + this.$t('products.variant')
      return this.createNewTitle('products.variant')
    },
  },
  created() {
    if (this.id) {
      this.showForm = false
      this.axios.get(this.$api.variants + this.id)
          .then(res => {
            console.log('details', res)
            this.form = res.data
            this.showForm = true
            this.form.selector_values = res.data.selector_values.map(itm => itm.id)
          })
      console.log('no details, getting the item details from server')
    }
  },
  methods: {
    createNewTitle(i18Path) {
      return this.$t('general.createANew').replace('{0}', this.$t(i18Path))
    },

    handleSelectProduct(event) {
      console.log('handleSelectProduct', event)
      this.form.product.id = event
    },

    handleSelectActualProduct(event) {
      console.log('handleSelectActualProduct', event)
      this.form.actual_product.id = event
    },

    handleSelectProductSelectorValues(event) {
      console.log('handleSelectProductSelectorValues', event)
      this.form.selector_values = event
    },

    saveItem() {
      console.log('form', this.form)
      const data = {
        product: this.form.product.id,
        dkpc: this.form.dkpc,
        has_competition: this.form.has_competition,
        is_active: this.form.is_active,
        price_min: this.form.price_min,
        selector_values: this.form.selector_values,
        actual_product: this.form.actual_product.id,
      }
      console.log('save payload', data)

      let url = this.$api.variants
      if (this.editingItemId) url += `${this.editingItemId}/`
      let method = this.editingItemId ? 'patch' : 'post'
      this.axios.request({url, data, method}).then(res => {
        if (!this.editingItemId)
          this.$router.push({name: 'variantsList'})
      })

      // if (this.id) {
      //   const url = this.$api.variants + this.id + '/'
      //   this.axios.patch(url, payload)
      //       .then(res => {
      //         console.log('patch', res)
      //       })
      //       .catch(err => console.log('patch error ', err))
      // } else {
      //   console.log('post this.form', payload)
      //   this.axios.post(this.$api.variants, payload)
      //       .then(res => {
      //         console.log('post', res)
      //       })
      //       .catch(err => console.log('post error ', err))
      // }
    },

    deleteItem() {
      this.axios.delete(this.$api.variants + this.id + '/')
          .then(() => {
            this.$router.push({name: 'variantsList'})
          })
          .catch(err => console.log('patch error ', err))
    },
  },

}
</script>

<style scoped>

</style>
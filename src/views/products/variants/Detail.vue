<template>
  <v-card>
    <v-card-title>
      <!--                  <span class="text-h5">{{ $t('general.createANew').replace('{0}', $t('products.variant')) }}</span>-->
      <span class="text-h5">{{ id }}</span>
    </v-card-title>

    <v-card-text v-if="editedItem">
      <v-container>
        <v-row>
          <v-col cols="12">
            <AutoComplete
                :label="$t('products.product')"
                :query-param="'title'"
                :obj-repr-field="'title'"
                :api="$api.products"
                v-on:value-change="handleSelectProduct"
                :default-value="editedItem.product.id"
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
                :default-value="editedItem.actual_product.id"
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
                :default-value="editedItem.selector_values"
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

  </v-card>

</template>

<script>
import AutoComplete from '@/components/AutoComplete'

export default {
  name: 'Details',
  components: {AutoComplete},
  props: {
    id: [Number, String],
    itemId: null,
  },
  data() {
    return {
      itemDetails: {},
      editedItem: null,
    }
  },
  created() {
    if (this.id) {
      this.axios.get(this.$api.variants + this.id)
          .then(res => {
            console.log('details', res)
            this.itemDetails = res.data
            this.editedItem = res.data
          })
      console.log('no details, getting the item details from server')
    }
  },
  methods: {
    handleSelectProduct(event) {
      console.log(event)
      // this.$router.push({name:})
      console.log('change in list', event, this.editedItem)
      this.editedItem.product = event
    },

    handleSelectActualProduct(event) {
      this.editedItem.actual_product = event
    },

    handleSelectProductSelectorValues(event) {
      console.log('handleSelectProductSelectorValues', event)
      this.editedItem.selector_values = event
    },
  },
}
</script>

<style scoped>

</style>
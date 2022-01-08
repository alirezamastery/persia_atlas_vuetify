<template>
  <v-card flat>
    <v-card-text>

      <v-row class="mb-30">
        <v-col
            cols="12"
            sm="12"
            md="12"
            lg="4"
        >
          <AutoComplete
              v-model="actualProductId"
              :label="$t('products.actualProduct')"
              :query-param="'search'"
              :obj-repr-field="'title'"
              :api="$api.actualProducts"
              @input="getVariants"
          />
        </v-col>
      </v-row>


      <VariantDetails
          v-for="variant in variants"
          :key="variant.dkpc"
          :variant="variant"
      >

      </VariantDetails>
    </v-card-text>
  </v-card>
</template>

<script>
import AutoComplete from '@/components/AutoComplete'
import VariantDetails from '@/views/robot/VariantDetails'

export default {
  name: 'EditVariantStatus',
  components: {
    AutoComplete,
    VariantDetails,
  },
  data() {
    return {
      brandId: null,
      isLoading: false,
      actualProductId: null,
      variants: [],
      product: null,
      fakeVars: [
        {
          'id': 174,
          'dkpc': '23968167',
          'price_min': 37500,
          'is_active': true,
          'has_competition': true,
          'product': {
            'id': 44,
            'dkp': '7000919',
            'title': 'چوب لباسی مدل توچال بسته 6 عددی',
            'is_active': false,
            'type': {
              'id': 3,
              'title': 'infant accessory',
              'selectors': [
                2,
              ],
            },
          },
          'actual_product': {
            'id': 43,
            'title': 'چوب لباسی بزرگسال ساده سبز',
            'brand': {
              'id': 4,
              'title': 'توچال',
            },
          },
          'selector_values': [
            {
              'id': 6,
              'digikala_id': 6,
              'value': 'سبز',
              'selector': {
                'id': 1,
                'title': 'color',
              },
            },
          ],
          'our_stock': 2,
          'reserved': 0,
          'warehouse_stock': 0,
          'price': 430000,
          'maximum_per_order': 5,
        },
      ],
    }
  },
  methods: {
    getVariants() {
      console.log('getVariants', this.actualProductId)
      this.isLoading = true
      this.variants = []
      const url = this.$api.actualProductVariants + this.actualProductId
      this.axios.get(url)
          .then(res => {
            console.log('variants', res.data)
            this.isLoading = false
            this.variants = res.data.variants
            this.product = res.data.product
          })
          .catch(err => {
            console.log(err)
            this.isLoading = false
            this.errors = err.response?.data
          })
    },
  },

}
</script>

<style scoped>

</style>
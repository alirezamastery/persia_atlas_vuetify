<template>
  <v-card flat>
    <v-card-text>

      <v-container>
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

        <v-row>
          <v-col v-if="variants.length" cols="12">
            <VariantDetails
                v-for="variant in variants"
                :key="variant.dkpc"
                :variant="variant"
            >
            </VariantDetails>
          </v-col>
          <v-col v-else-if="searched && !isLoading" cols="12" class="justify-center">
            {{ $t('general.noResult') }}
          </v-col>
        </v-row>
      </v-container>

    </v-card-text>
  </v-card>
</template>

<script>
import AutoComplete from '@/components/AutoComplete'
import VariantDetails from '@/views/robot/variantStatus/components/VariantDetails'

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
      searched: false,
    }
  },
  methods: {
    getVariants() {
      console.log('getVariants', this.actualProductId)
      if (!this.actualProductId) return
      this.isLoading = true
      this.variants = []
      const url = this.$api.actualProductVariants + this.actualProductId
      this.axios.get(url)
          .then(res => {
            console.log('variants', res.data)
            this.isLoading = false
            this.variants = res.data.variants
            this.product = res.data.product
            this.searched = true
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
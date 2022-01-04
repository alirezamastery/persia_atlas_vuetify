<template>
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

</template>

<script>
import AutoComplete from '@/components/AutoComplete'
export default {
  name: 'Details',
  components:{AutoComplete},
  props: {
    itemDetails: null,
    itemId: null,
  },
  created() {
    if (!this.itemDetails && this.itemId) {
      // this.axios.get()
      console.log('no details, getting the item details from server')
    }
  },
}
</script>

<style scoped>

</style>
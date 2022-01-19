<template>
  <v-card
      outlined
      elevation="4"
      class="mb-30"
  >
    <v-card-text>
      <v-container>
        <!--  First Row START -->
        <v-row class="align-center">
          <v-col cols="12" sm="12" lg="3" class="text-h6">
            {{ variant.product.title }}
          </v-col>
          <v-col cols="6" sm="6" lg="3" class="text-sm-h6">
            {{ variant.selector_values[0].value }}
          </v-col>
          <v-col cols="6" sm="6" lg="3" class="text-sm-h6">
            {{ variant.dkpc }}
          </v-col>
          <!--  Digi Status -->
          <v-col cols="12" sm="12" lg="3">
            <v-switch
                v-model="digiStatus"
                :label="$t('products.activeInDigi')"
                :success="digiStatus"
                @change="handleDigiStatusUpdate"
            >
              <template v-slot:label v-if="loadingDigiStatus">
                <v-progress-circular
                    indeterminate
                    size="24"
                    class="ml-2"
                />
              </template>
            </v-switch>
          </v-col>
        </v-row>
        <!--  First Row END -->

        <v-divider class="my-5"/>

        <!--  Second Row START -->
        <v-row class="align-center">
          <v-col cols="12" sm="12" md="4">
            <v-row>
              <v-col cols="6">
                <v-text-field
                    :label="$t('products.ordered')"
                    :value="variant.reserved"
                    disabled
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                    :label="$t('products.inDigiStock')"
                    :value="variant.warehouse_stock"
                    disabled
                />
              </v-col>
            </v-row>
          </v-col>
          <!--  Digi data Inputs -->
          <v-col cols="12" sm="6" md="4">
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                    v-model="newPrice"
                    :label="$t('general.priceRial')"
                    :value="variant.price"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                    v-model="newStock"
                    :label="$t('products.inventory')"
                    :value="variant.our_stock"
                />
              </v-col>
            </v-row>
          </v-col>
          <!--  Digi data Buttons -->
          <v-col cols="12" sm="6" md="4" v-if="showBtnDigi">
            <v-progress-circular
                v-if="loadingDigiData"
                indeterminate
                color="red"
            />
            <v-row v-else>
              <v-col cols="6" sm="3" lg="2">
                <v-btn
                    small
                    color="success"
                    class="mx-1"
                    @click="handleDigiDataUpdate"
                >
                  {{ $t('general.submit') }}
                </v-btn>
              </v-col>
              <v-col cols="6" sm="3" lg="2">
                <v-btn
                    small
                    color="red"
                    class="mx-1"
                    @click="revertDigiChange"
                >
                  {{ $t('general.iMadeMistake') }}
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <!--  Second Row END -->

        <v-divider class="my-5"/>

        <!--  Third Row START -->
        <v-row class="align-center">
          <!--  Robot Status -->
          <v-col cols="12" sm="12" md="4" class="flex-row-reverse">
            <v-switch
                v-model="robotStatus"
                :label="$t('products.robotActive')"
                :value="variant.is_active"
                color="primary"
                @change="handleRobotStatusUpdate"
            >
              <template v-slot:label v-if="loadingRobotStatus">
                <v-progress-circular
                    indeterminate
                    size="24"
                    class="ml-2"
                />
              </template>
            </v-switch>
          </v-col>
          <!--  Persia Atlas Data Input -->
          <v-col cols="12" sm="6" md="3" lg="2">
            <v-text-field
                v-model="newPriceMin"
                :label="$t('general.priceMinToman')"
                :value="variant.price_min"
            />
          </v-col>
          <!--  Persia Atlas Data Buttons -->
          <v-col cols="12" sm="6" md="4" v-if="showBtnAtlas">
            <v-progress-circular
                v-if="loadingRobotStatus"
                indeterminate
                color="red"
            />
            <v-row v-else>
              <v-col cols="6" sm="3" lg="2">
                <v-btn
                    small
                    color="success"
                    class="mx-1"
                    @click="handleAtlasUpdate"
                >
                  {{ $t('general.submit') }}
                </v-btn>
              </v-col>
              <v-col cols="6" sm="3" lg="2">
                <v-btn
                    small
                    color="red"
                    class="mx-1"
                    @click="revertAtlasDataChange"
                >
                  {{ $t('general.iMadeMistake') }}
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <!--  Third Row END -->

      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import store from '@/store'
import {v4 as uuid4} from 'uuid'
import {numberToolsMixin} from '@/mixins/numberTools'

export default {
  name: 'VariantDetails',
  props: ['variant'],
  mixins:[numberToolsMixin],
  data() {
    return {
      initialPriceMin: this.variant.price_min.toString(),
      newPriceMin: this.formatIntNumber(this.variant.price_min.toString()),
      initialPrice: this.variant.price.toString(),
      initialStock: this.variant.our_stock.toString(),
      newPrice: this.formatIntNumber(this.variant.price.toString()),
      newStock: this.variant.our_stock.toString(),

      robotStatus: this.variant['is_active'],
      digiStatus:  this.variant['is_digi_active'],

      loadingDigiStatus: false,
      loadingDigiData: false,
      loadingRobotStatus: false,
      loadingAtlasData: false,
    }
  },
  computed: {
    showBtnDigi() {
      const commaRemovedNewPrice = this.removeCommas(this.newPrice)
      return this.initialPrice !== commaRemovedNewPrice || this.initialStock !== this.newStock
    },
    showBtnAtlas() {
      const commaRemovedNewPriceMin = this.removeCommas(this.newPriceMin)
      return this.initialPriceMin !== commaRemovedNewPriceMin
    },
  },
  watch: {
    newPriceMin(newVal) {
      this.newPriceMin = this.formatIntNumber(newVal)
    },
    newPrice(newVal) {
      this.newPrice = this.formatIntNumber(newVal)
    },
  },
  methods: {
    revertDigiChange() {
      this.newPrice = this.initialPrice
      this.newStock = this.initialStock
    },
    revertAtlasDataChange() {
      this.newPriceMin = this.initialPriceMin
    },
    handleDigiStatusUpdate(event) {
      this.errors = null
      this.loadingDigiStatus = true
      const data = {
        'dkpc': this.variant.dkpc,
        'is_active': !!event,
      }
      this.digiStatus = !!event
      this.axios.post(this.$api.updateVariantStatus, data)
          .then(res => {
            console.log('handleDigiStatusUpdate | res', res)
            this.loadingDigiStatus = false
            console.log('handleDigiStatusUpdate | digiStatus', this.digiStatus)
          })
          .catch(err => {
            console.log('handleDigiStatusUpdate | error', err.response?.data)
            this.loadingDigiStatus = false
            this.digiStatus = !event
          })
    },
    handleDigiDataUpdate() {
      this.errors = null
      this.loadingDigiData = true
      const data = {
        'dkpc': this.variant.dkpc,
        'price': this.removeCommas(this.newPrice),
        'our_stock': this.newStock,
      }
      this.axios.post(this.$api.updateVariantData, data)
          .then(res => {
            console.log('handleDigiDataUpdate | res', res)
            this.loadingDigiData = false
            const data = res.data
            this.initialPrice = data['price_sale_latin'].toString()
            this.initialStock = data['marketplace_seller_stock_latin'].toString()
            this.newPrice = this.initialPrice
            this.newStock = this.initialStock
          })
          .catch(err => {
            console.log('handleDigiDataUpdate | error', err)
            this.loadingDigiData = false
          })
    },
    handleRobotStatusUpdate(event) {
      this.errors = null
      this.loadingRobotStatus = true
      const data = {
        'dkpc': this.variant.dkpc,
        'is_active': !!event,
      }
      console.log('data', data)
      this.robotStatus = !!event
      this.axios.patch(`${this.$api.variants}${this.variant.id}/`, data)
          .then(res => {
            console.log('handleRobotStatusUpdate | res', res)
            this.robotStatus = res.data.is_active
            this.loadingRobotStatus = false
          })
          .catch(err => {
            console.log('handleRobotStatusUpdate | error', err)
            this.loadingRobotStatus = false
            this.robotStatus = !event
            store.commit('SET_SNACKBAR', {
              key: uuid4(),
              color: 'red',
              data: err,
            })
          })
    },
    handleAtlasUpdate() {
      this.errors = null
      this.loadingAtlasData = true
      const data = {
        'dkpc': this.variant.dkpc,
        'price_min': parseInt(this.removeCommas(this.newPriceMin)),
      }
      this.axios.patch(`${this.$api.variants}${this.variant.id}/`, data)
          .then(res => {
            console.log('handleAtlasUpdate | res', res)
            this.loadingAtlasData = false
            this.initialPriceMin = res.data.price_min.toString()
            this.newPriceMin = res.data.price_min.toString()
          })
          .catch(err => {
            console.log('handleAtlasUpdate | error', err)
            this.loadingAtlasData = false
          })
    },
  },
}
</script>

<style scoped>

</style>
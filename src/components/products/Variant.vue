<template>

  <div class="variant-info" :class="{'dark-theme':isDarkTheme}">
    <div class="flex-20">
      {{ variant.product.title }}
    </div>
    <div>
      {{ variant.selector_values[0]['value'] }}
    </div>
    <div>
      {{ variant.dkpc }}
    </div>

    <div v-if="!showWaitAnimationDigiStatus">
      <label :for="`${variant.id}-status`">
        فعال:
      </label>
      <input :id="`${variant.id}-status`"
             type="checkbox"
             :checked="variantStatus"
             @input="handleDigiStatusUpdate">
    </div>
    <div v-else>
      <LoadingDots_1></LoadingDots_1>
    </div>
  </div>

  <form class="variant-stock" :class="{'dark-theme':isDarkTheme}">
    <div class="data">
      <label :for="`${variant.id}-price`">
        قیمت:
      </label>
      <input :id="`${variant.id}-price`"
             type="text"
             class="medium-number"
             v-model="newPrice"
             @input="onDigiDataChange">
      <label :for="`${variant.id}-stock`">
        موجودی:
      </label>
      <input :id="`${variant.id}-stock`"
             type="text"
             class="small-number"
             v-model="newStock"
             @input="onDigiDataChange">
      <label :for="`${variant.id}-reserved`">
        سفارش خورده:
      </label>
      <input :id="`${variant.id}-reserved`"
             type="text"
             class="small-number"
             :value="variant.reserved"
             :disabled="true">
      <label :for="`${variant.id}-digi-warehouse`">
        انبار دیجیکالا:
      </label>
      <input :id="`${variant.id}-digi-warehouse`"
             type="text"
             class="small-number"
             :value="variant.warehouse_stock"
             :disabled="true">
    </div>

    <div class="server-update">
      <div v-show="showBtnDigiUpdate && !showWaitAnimationDigiData" class="digi-update-btns">
        <div class="btn digi-btn confirm" @click="handleDigiDataUpdate">update</div>
        <div class="btn digi-btn cancel" @click="revertDigiChange">cancel</div>
      </div>
      <div v-show="showWaitAnimationDigiData">
        <LoadingDots_1></LoadingDots_1>
      </div>
    </div>
  </form>

  <form class="variant-robot" :class="{'dark-theme':isDarkTheme}">
    <div class="data">
      <label :for="`${variant.id}-price-min`">
        قیمت کف:
      </label>
      <input :id="`${variant.id}-price-min`"
             type="text"
             class="medium-number"
             v-model="newPriceMin"
             @input="onAtlasDataChange">
      <label :for="`${variant.id}-price-min`">
        ربات:
      </label>
      <input :id="`${variant.id}-robot-status`"
             type="checkbox"
             v-model="robotStatus"
             @input="handleRobotStatusUpdate">
    </div>
    <div class="server-update">
      <div v-if="showBtnAtlasUpdate && !showWaitAnimationPriceMin" class="digi-update-btns">
        <div class="btn digi-btn confirm" @click="handleAtlasUpdate">update</div>
        <div class="btn digi-btn cancel" @click="revertAtlasDataChange">cancel</div>
      </div>
      <div v-if="showWaitAnimationPriceMin">
        <LoadingDots_1></LoadingDots_1>
      </div>
    </div>
  </form>

  <div v-if="errors">
    <div class="alert alert-error" v-for="(value, key) in errors" :key="key">
      {{ value }}
    </div>
  </div>
</template>

<script>
import LoadingDots_1 from "../animation/LoadingDots_1";
import {useStore} from "vuex";
import {computed} from "vue";

export default {
  name: "Variant",
  components: {
    LoadingDots_1
  },
  props: {
    variant: Object,
    index: Number
  },
  setup(){
    const store = useStore()

    const isDarkTheme = computed(() => store.getters.isDarkThemeSet)

    return{
      isDarkTheme
    }
  },
  data() {
    return {
      errors: null,

      initialPriceMin: '',
      newPriceMin: '',
      robotStatus: Boolean,
      showBtnAtlasUpdate: Boolean,
      showWaitAnimationPriceMin: Boolean,

      initialPrice: '',
      initialStock: '',
      newPrice: '',
      newStock: '',
      showBtnDigiUpdate: Boolean,
      showWaitAnimationDigiData: Boolean,

      variantStatus: Boolean,
      showWaitAnimationDigiStatus: Boolean,
    }
  },
  mounted() {
    this.initialPriceMin = this.variant.price_min.toString()
    this.newPriceMin = this.variant.price_min.toString()
    this.robotStatus = this.variant.is_active
    this.showBtnAtlasUpdate = false
    this.showWaitAnimationPriceMin = false

    this.initialPrice = this.variant.price.toString()
    this.initialStock = this.variant.our_stock.toString()
    this.newPrice = this.variant.price.toString()
    this.newStock = this.variant.our_stock.toString()
    this.showBtnDigiUpdate = false
    this.showWaitAnimationDigiData = false

    this.variantStatus = this.variant.product.is_active
    this.showWaitAnimationDigiStatus = false
  },
  methods: {
    onDigiDataChange() {
      this.showBtnDigiUpdate = this.newPrice !== this.initialPrice || this.newStock !== this.initialStock
    },
    revertDigiChange() {
      this.newPrice = this.initialPrice
      this.newStock = this.initialStock
      this.showBtnDigiUpdate = false
    },
    onAtlasDataChange() {
      console.log(this.robotStatus)
      this.showBtnAtlasUpdate = this.newPriceMin !== this.initialPriceMin
    },
    revertAtlasDataChange() {
      this.newPriceMin = this.initialPriceMin
      this.showBtnAtlasUpdate = false
    },
    handleDigiDataUpdate() {
      this.errors = null
      this.showBtnDigiUpdate = false
      this.showWaitAnimationDigiData = true
      this.axios.post('products/update-variant-data/', {
        'dkpc': this.variant.dkpc,
        'price': this.newPrice,
        'our_stock': this.newStock,
      }).then(res => {
        this.showWaitAnimationDigiData = false
        console.log(res)
        const data = res.data
        this.initialPrice = data.price_sale_latin.toString()
        this.initialStock = data.marketplace_seller_stock_latin.toString()
        this.newPrice = data.price_sale_latin.toString()
        this.newStock = data.marketplace_seller_stock_latin.toString()
      }).catch(err => {
        console.log(err.response?.data)
        this.showWaitAnimationDigiData = false
        this.errors = err.response.data
      })
    },
    handleDigiStatusUpdate() {
      this.errors = null
      this.showWaitAnimationDigiStatus = true
      this.axios.post('products/update-variant-status/', {
        'dkpc': this.variant.dkpc,
        'is_active': !this.variantStatus,
      }).then(res => {
        this.showWaitAnimationDigiStatus = false
        console.log(res)
        this.variantStatus = !this.variantStatus
      }).catch(err => {
        console.log(err.response?.data)
        this.showWaitAnimationDigiData = false
        this.errors = err.response.data
      })
    },
    handleRobotStatusUpdate() {
      this.errors = null
      this.axios.patch(`products/variants/${this.variant.id}/`, {
        'dkpc': this.variant.dkpc,
        'is_active': !this.robotStatus
      }).then(res => {
        this.robotStatus = res.data.is_active
      }).catch(err => {
        console.log(err.response?.data)
        this.errors = err.response.data
      })
    },
    handleAtlasUpdate() {
      this.errors = null
      this.showBtnAtlasUpdate = false
      this.showWaitAnimationPriceMin = true
      this.axios.patch(`products/variants/${this.variant.id}/`, {
        'dkpc': this.variant.dkpc,
        'price_min': parseInt(this.newPriceMin)
      }).then(res => {
        console.log(res)
        this.showWaitAnimationPriceMin = false
        this.initialPriceMin = res.data.price_min.toString()
        this.newPriceMin = res.data.price_min.toString()
      }).catch(err => {
        console.log(err.response?.data)
        this.errors = err.response.data
      })
    }

  }
}
</script>

<style scoped>

</style>

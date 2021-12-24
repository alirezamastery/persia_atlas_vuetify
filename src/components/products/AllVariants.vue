<template>
  <div class="variants-container" v-if="variants" :class="{'dark-theme':isDarkTheme}">
    <div class="variant-row" v-for="(variant, index) in variants" :key="variant.id">
      <variant :variant="variant" :index="index"></variant>
    </div>
  </div>
  <div v-else>
    no Variants from server!! call alireza
  </div>
</template>

<script>
import {computed} from "vue";
import {useStore} from "vuex";
import Variant from "./Variant";

export default {
  name: "AllVariants",
  components: {
    Variant
  },
  setup(props){
    const store = useStore()

    const isDarkTheme = computed(() => store.getters.isDarkThemeSet)

    return{
      isDarkTheme
    }
  },
  props: {
    variants: Array
  }
}
</script>

<style scoped>

</style>
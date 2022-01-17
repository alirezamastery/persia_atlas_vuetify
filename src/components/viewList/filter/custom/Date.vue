<template>
  <div class="d-flex flex-row align-center justify-lg-space-between py-5">
    <v-btn
        @click="showDatePicker = true"
        small
    >
      {{ $t(filterData.label) }}
    </v-btn>
    <v-text-field
        :id="`date-input-${filterData.queryParam}`"
        hide-details
        flat
        outlined
        dense
        :value="inputValue"
        class="mx-3"
    />
    <persian-date-picker
        v-model="inputValue"
        format="YYYY-MM-DD"
        display-format="jYYYY/jMM/jDD"
        :show="showDatePicker"
        :custom-input="`date-input-${filterData.queryParam}`"
        @close="showDatePicker = false"
    />
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'Date',
  props: {
    filterData: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  data() {
    return {
      showDatePicker: false,
      inputValue: null,
    }
  },
  computed: {
    ...mapState({
      resetSignal: state => state.crud.tableFilterResetSignal,
    }),
  },
  watch: {
    inputValue(val) {
      this.$emit('date-change', val)
    },
    resetSignal() {
      this.inputValue = null
    },
  },
}
</script>

<style scoped>

</style>
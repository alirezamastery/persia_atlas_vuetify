<template>
  <v-radio-group
      v-if="uiType === 'radioDual'"
      v-model="inputValue"
      :label="$t(filter.label)"
      style="text-align: center"
  >
    <v-radio :label="$t('general.all')" :value="null"/>
    <v-radio :label="$t('general.yes')" :value="true"/>
    <v-radio :label="$t('general.no')" :value="false"/>
  </v-radio-group>
  <v-checkbox
      v-else-if="uiType === 'checkbox'"
      v-model="inputValue"
      :label="$t(filter.label)"
  />
  <v-select
      v-else-if="uiType === 'select'"
      v-model="inputValue"
      :items="filter.options"
      :label="$t(filter.label)"
  />
  <v-range-slider
      v-else-if="uiType === 'valueRange'"
      v-model="inputValue"
      :label="$t(filter.label)"
  />

  <Date
      v-else-if="uiType === 'date'"
      :filter-data="filter"
      @date-change="inputValue = $event"
  />

  <persian-date-picker
      v-else-if="uiType === 'dateRage'"
      v-model="inputValue"
      format="YYYY-MM-DD"
      display-format="jYYYY/jMM/jDD"
  />

  <div v-else>Invalid Filter type</div>
</template>

<script>
import Date from '@/components/viewList/filter/custom/Date'

export default {
  name: 'FilterInput',
  components:{
    Date
  },
  props: {
    filter: {
      type: Object,
      required: true,
    },
    resetSignal: {type: [Number, Boolean], required: true, default: 0},
  },
  data() {
    return {
      inputValue: null,
    }
  },
  computed: {
    uiType() {
      const type = this.filter.type
      if (type === 'boolean') {
        return 'radioDual'
      }
      return this.filter.type
    },
  },
  watch: {
    inputValue() {
        this.$emit('input', this.inputValue)
    },
    resetSignal() {
      this.inputValue = null
    },
  },
  created() {
    if (this.filter.type === 'boolean') {
      this.inputValue = null
    }
  },
}
</script>

<style scoped>

</style>
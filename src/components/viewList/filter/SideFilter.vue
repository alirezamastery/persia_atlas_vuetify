<template>
  <v-col cols="12" sm="12" md="4" lg="3" xl="2">
    <v-toolbar flat dense outlined style="border-bottom: none">
      <span>{{ $t('general.filters') }}</span>
      <v-spacer/>
      <v-btn
          small
          class="m-2 yellow black--text"
          v-if="Object.keys(filterValues).length > 0 && showReset"
          @click="resetFilters"
          icon
      >
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-toolbar>
    <v-sheet class="px-2" outlined>
      <template
          v-for="(filter, index) in filters"
          class="p-10 my-2"
      >
        <FilterInput
            :filter="filter"
            :reset-signal="justForResetSignal"
            :key="index"
            v-model="filterValues[filter.queryParam]"
        />
        <v-divider v-if="index < filters.length - 1" :key="`divider_${index}`"/>
      </template>
    </v-sheet>
  </v-col>
</template>

<script>
import FilterInput from '@/components/viewList/filter/FilterInput'

export default {
  name: 'SideFilter',
  components: {
    FilterInput,
  },
  props: {
    filters: {type: Array, required: true},
  },
  data() {
    return {
      filterValues: {},
      justForResetSignal: 0,
      showReset: false,
    }
  },
  watch: {
    filterValues: {
      deep: true,
      handler(val) {
        console.log('side filter | watch:', val)
        let finalQuery = ''
        let nullCount = 0
        for (const [key, value] of Object.entries(val)) {
          if (value === null)
            nullCount++
          else
            finalQuery += `&${key}=${value}`
        }
        this.showReset = nullCount !== Object.keys(val).length
        this.$emit('filter-change', finalQuery)
      },
    },
  },
  methods: {
    resetFilters() {
      this.filterValues = {}
      this.justForResetSignal++
      this.$store.dispatch('crud/HandleTableFilterReset')
    },
  },
}
</script>

<style scoped>

</style>
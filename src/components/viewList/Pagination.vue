<template>
  <v-container class="pt-5">
    <v-row justify="space-between">
      <v-col
          cols="12" lg="1"
          order="12" order-lg="1"
          class="d-flex flex-row align-center text-no-wrap">
        {{ countDisplay }}
      </v-col>
      <v-col
          cols="12" md="6" lg="8" xl="9"
          order="10" order-lg="2"
      >
        <v-pagination
            v-model="pageValue"
            :length="pageCount"
            :total-visible="totalVisible"
            :disabled="tableLoading"
            @input="$emit('page-select', $event)"
        />
      </v-col>
      <v-col
          cols="4" md="5" lg="3" xl="2"
          order="11" order-lg="3"
          class="d-flex flex-row align-center justify-md-start justify-lg-center text-no-wrap"
      >
        <span class="mx-2">{{ $t('general.paginationText') }}</span>
        <v-select
            v-model="pageSizeValue"
            :items="pageSizeOptions"
            :disabled="tableLoading"
            solo-inverted
            hide-details
            dense
            style="max-width: 90px"
            @input="$emit('page-size-select', $event)"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    page: {type: Number, required: true},
    pageSize: {type: Number, required: true},
    pageSizeOptions: {
      type: Array,
      required: false,
      default: () => [10, 20, 50, 100],
    },
    tableLoading: {type: Boolean, required: false},
    totalVisible: {type: Number, required: false, default: 7},
    pageCount: {type: Number, required: true},
    totalCount: {type: Number, required: true},
  },
  data() {
    return {
      pageValue: this.page,
      pageSizeValue: this.pageSize,
    }
  },
  computed: {
    countDisplay() {
      return `${this.$t('general.totalCount')}: ${this.totalCount}`
    },
  },
  watch: {
    page(val) {
      this.pageValue = val
    },
    pageSize(val) {
      this.pageSizeValue = val
    },
  },
}
</script>

<style scoped>

</style>
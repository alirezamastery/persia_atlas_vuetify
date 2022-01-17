<template>
  <v-container class="pt-5">
    <v-row>
      <v-col cols="12" md="6" lg="8" xl="10">
        <v-pagination
            v-model="pageValue"
            :length="pageCount"
            :total-visible="totalVisible"
            :disabled="tableLoading"
            @input="$emit('page-select', $event)"
        />
      </v-col>
      <v-col cols="4" md="6" lg="4" xl="2" style="max-width: 100px"
             class="d-flex flex-row align-center justify-lg-space-between text-no-wrap"
      >
        <span class="mx-2">{{$t('general.paginationText')}}</span>
        <v-select
            v-model="pageSizeValue"
            :items="pageSizeOptions"
            :disabled="tableLoading"
            solo-inverted
            hide-details
            dense
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
  },
  data() {
    return {
      pageValue: this.page,
      pageSizeValue: this.pageSize,
    }
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
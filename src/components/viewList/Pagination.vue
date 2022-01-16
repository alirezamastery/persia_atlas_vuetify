<template>
  <v-container class="pt-5">
    <v-row>
      <v-col cols="12" sm="9" lg="10">
        <v-pagination
            v-model="pageValue"
            :length="pageCount"
            :total-visible="totalVisible"
            :disabled="tableLoading"
            @input="$emit('page-select', $event)"
        />
      </v-col>
      <v-spacer/>
      <v-col cols="4" sm="3" lg="2" style="max-width: 100px">
        <v-select
            v-model="pageSizeValue"
            :items="pageSizeOptions"
            :disabled="tableLoading"
            solo-inverted
            hide-details
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
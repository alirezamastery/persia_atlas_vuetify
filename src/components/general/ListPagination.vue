<template>
  <v-container class="pt-5">
    <v-row>
      <v-col cols="12" sm="9" lg="10">
        <v-pagination
            v-model="page"
            :length="data.page_count"
            :total-visible="7"
            :disabled="loading"
            @input="reFetchData"
        />
      </v-col>
      <v-spacer/>
      <v-col cols="4" sm="3" lg="2" style="max-width: 100px">
        <v-select
            v-model="pageSize"
            :items="pageSizeOptions"
            :disabled="loading"
            solo-inverted
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ListPagination',
  props: {
    value: {
      type: [Number],
      required: true,
    },
    value: {
      type: [Number],
      required: true,
    },
  },
  data() {
    return {
      page: this.value,
    }
  },
}
</script>

<style scoped>

</style>
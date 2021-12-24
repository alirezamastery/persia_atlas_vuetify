<template>
  <v-autocomplete
      v-model="select"
      :loading="loading"
      :items="items"
      :search-input.sync="searchPhrase"
      item-text="title"
      item-value="id"
      cache-items
      class="mx-4"
      flat
      hide-no-data
      hide-details
      label="جست و جو..."
      solo-inverted
      @change="handleSelect"
  >
    <template v-slot:no-data>
      <v-list-item>
        <v-list-item-title>
          Search for your favorite
          <strong>Cryptocurrency</strong>
        </v-list-item-title>
      </v-list-item>
    </template>

    <template v-slot:item="{ item }">
      <v-list-item-content>
        <v-list-item-title v-text="item.title"></v-list-item-title>
        <v-list-item-subtitle v-text="item.id"></v-list-item-subtitle>
      </v-list-item-content>
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      loading: false,
      items: [],
      searchPhrase: null,
      select: null,
    }
  },
  watch: {
    searchPhrase(val) {
      val && val !== this.select && this.handleSearchInput(val)
    },
  },
  methods: {
    handleSearchInput() {
      if (!this.searchPhrase) {
        this.items = []
        return
      }
      this.loading = true
      const url = `products/actual-products/?title=${this.searchPhrase}`
      this.axios.get(url)
          .then(res => {
            this.loading = false
            this.items = res.data
            // const list = []
            // for (const datum of res.data) {
            //   list.push(datum.title)
            // }
            // this.items = list
          })
          .catch(err => {
            console.log(err)
          })
    },
    handleSelect(event){
      console.log(event)
      // this.$router.push({name:})
    }
  }
}
</script>

<style scoped>

</style>
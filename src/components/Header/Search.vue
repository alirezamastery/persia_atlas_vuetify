<template>
  <v-autocomplete
      v-model="select"
      :loading="loading"
      :items="items"
      :search-input.sync="searchPhrase"
      item-text="title"
      item-value="id"
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
          نتیجه ای یافت نشد
        </v-list-item-title>
      </v-list-item>
    </template>

    <template v-slot:item="{ item }">
      <v-list-item-content>
        <v-list-item-title v-text="item.title"/>
        <v-list-item-subtitle v-text="item.id"/>
      </v-list-item-content>
    </template>

    <template v-slot:append>
      <v-progress-circular v-if="loading" indeterminate color="#ad5697"/>
    </template>

  </v-autocomplete>
</template>

<script>

function debounce(func, delay) {
  let timeout
  return (...args) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    const context = this //important, without context the input url to apiCall will be undefined
    timeout = setTimeout(() => {
      func.apply(context, args)
    }, delay)
  }
}

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

      const apiCall = (url) => {
        this.axios.get(url)
            .then(res => {
              this.loading = false
              this.items = res.data
            })
            .catch(err => {
              console.log(err)
            })
      }

      const debouncedAPICall = debounce(apiCall, 300)

      this.loading = true
      const url = `products/actual-products/?title=${this.searchPhrase}`
      debouncedAPICall(url)
    },
    handleSelect(event) {
      console.log(event)
      // this.$router.push({name:})
    }
  }
}
</script>

<style scoped>

</style>
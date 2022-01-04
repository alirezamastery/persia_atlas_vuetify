<template>
  <v-autocomplete
      :loading="loading"
      :items="items"
      :search-input.sync="searchPhrase"
      :label="label"
      :cache-items="true"
      item-text="title"
      item-value="id"
      class="mx-4"
      flat
      hide-no-data
      hide-details
      solo-inverted
      @change="handleSelect"
  >
    <template v-slot:no-data>
      <v-list-item>
        <v-list-item-title>
          {{ $t('general.noItemsFound') }}
        </v-list-item-title>
      </v-list-item>
    </template>

    <template v-slot:item="{ item }">
      <v-list-item-content>
        <v-list-item-title v-text="item[objTitleKey]"/>
      </v-list-item-content>
    </template>

    <template v-slot:append>
      <v-progress-circular v-if="loading" indeterminate color="#ad5697"/>
    </template>

  </v-autocomplete>
</template>

<script>
import {debounce} from '@/modules/api-tools'

export default {
  name: 'AutoComplete',
  props: {
    label: String,
    objTitleKey: {type: String, default: 'title'},
    api: String,
    queryParam: String,
  },
  data() {
    return {
      loading: false,
      searchPhrase: '',
      items: [],
    }
  },
  watch: {
    searchPhrase(val) {
      val && val !== this.select && this.handleSearchInput(val)
    },
  },
  created() {
    this.axios.get(this.api)
        .then(res => {
          this.items = res.data
        })
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
      const url = `${this.api}?${this.queryParam}=${this.searchPhrase}`
      debouncedAPICall(url)
    },
    handleSelect(event) {
      console.log('handleSelect', event)
      this.$emit('value-change', event)
    },
  },
}
</script>

<style scoped>

</style>
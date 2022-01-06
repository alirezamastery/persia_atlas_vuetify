<template>
  <v-toolbar flat>
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-divider
        class="mx-4"
        inset
        vertical
    />
    <v-text-field
        v-model="searchPhrase"
        append-icon="mdi-magnify"
        :label="$t('general.search')"
        single-line
        hide-details
        solo
        dense
        flat
        @input="handleSearchInput"
    />
    <v-spacer/>
    <v-btn
        color="primary"
        dark
        @click="$router.push({name: detailViewRoute})"
    >
      {{ $t('general.create') }}
    </v-btn>
  </v-toolbar>
</template>

<script>
import {debounce} from '@/modules/api-tools'

export default {
  name: 'ListViewTableHeader',
  props: {
    title: {
      type: String,
      required: true,
    },
    apiRoot: {
      type: String,
      required: true,
    },
    detailViewRoute: {
      type: String,
      required: true,
    },
    queryParam: {
      type: String,
      default: 'search',
      required: false,
    },
  },
  data() {
    return {
      searchPhrase: '',
    }
  },
  methods: {
    handleSearchInput() {
      const apiCall = (url) => {
        this.axios.get(url)
            .then(res => {
              console.log('ListViewTableHeader | handleSearchInput', res)
              this.$emit('search-result', res.data)
            })
            .catch(err => {
              console.log(err)
            })
      }

      const debouncedAPICall = debounce(apiCall, 300)

      this.loading = true
      let url = this.apiRoot
      if (this.searchPhrase !== '')
        url += `?${this.queryParam}=${this.searchPhrase}`
      debouncedAPICall(url)
    },
  },
}
</script>

<style scoped>

</style>
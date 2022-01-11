<template>
  <v-toolbar flat>
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-divider
        class="mx-4"
        inset
        vertical
    />
    <v-text-field
        v-if="showSearch"
        v-model="searchPhrase"
        append-icon="mdi-magnify"
        :label="$t('general.search')"
        single-line
        hide-details
        solo
        dense
        flat
        clearable
        @input="handleSearchInput"
    />
    <v-spacer/>
    <v-btn
        v-if="showCreateBtn"
        color="primary"
        class="mr-2"
        dark
        @click="$router.push({name: addRoute})"
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
    addRoute: {
      type: String,
      required: true,
    },
    queryParam: {
      type: String,
      default: 'search',
      required: false,
    },
    showSearch: {
      type: Boolean,
      default: true,
      required: false,
    },
    showCreateBtn: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
  data() {
    return {
      searchPhrase: '',
    }
  },
  methods: {
    // TODO: fix debounce
    handleSearchInput() {
      this.$emit('search-input', this.searchPhrase)
      // const apiCall = (url) => {
      //   this.axios.get(url)
      //       .then(res => {
      //         console.log('ListViewTableHeader | handleSearchInput', res)
      //         this.$emit('search-result', res.data.items)
      //       })
      //       .catch(err => {
      //         console.log(err)
      //       })
      // }
      //
      // const debouncedAPICall = debounce(apiCall, 300)
      //
      // this.loading = true
      // let url = this.apiRoot
      // if (this.searchPhrase !== '')
      //   url += `?${this.queryParam}=${this.searchPhrase}`
      // debouncedAPICall(url)
    },
  },
}
</script>

<style scoped>

</style>
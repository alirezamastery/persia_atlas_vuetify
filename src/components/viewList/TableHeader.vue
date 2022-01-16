<template>
  <v-toolbar flat>
      <v-text-field
          v-if="!hideSearch"
          v-model="searchPhrase"
          :label="$t('general.search')"
          append-icon="mdi-magnify"
          class="search-field"
          single-line
          hide-details
          solo
          dense
          flat
          clearable
          @input="handleSearchInput"
      />
  </v-toolbar>
</template>

<script>
import {debounce} from '@/modules/api-tools'

export default {
  name: 'TableHeader',
  props: {
    apiRoot: {
      type: String,
      required: true,
    },
    queryParam: {
      type: String,
      default: 'search',
      required: false,
    },
    hideSearch: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      searchPhrase: '',
    }
  },
  methods: {
    handleSearchInput: debounce(function () {
      this.$emit('search-input', this.searchPhrase)
    }, 300),
  },
}
</script>

<style scoped lang="scss">
.search-field {
  max-width: 300px;
}
</style>
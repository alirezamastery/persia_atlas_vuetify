<template>
  <v-autocomplete
      v-model="content"
      :loading="loading"
      :items="items"
      :search-input.sync="searchPhrase"
      :label="label"
      :item-text="objReprField"
      :item-value="objUniqueId"
      :multiple="selectMultiple"
      :chips="selectMultiple"
      :error-messages="errorMessages"
      cache-items
      deletable-chips
      @change="handleInput"
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
        <v-list-item-title v-text="item[objReprField]"/>
      </v-list-item-content>
    </template>

  </v-autocomplete>
</template>

<script>
import {debounce} from '@/modules/api-tools'

export default {
  name: 'AutoComplete',
  props: {
    value: {type: [Number, Array]},
    defaultValue: [Number, Array],
    objUniqueId: {type: String, default: 'id'},
    objReprField: {type: String, default: 'title'},
    label: String,
    api: String,
    queryParam: String,
    selectMultiple: {type: Boolean, default: false},
    errorMessages: {type: Array, default: () => ([])},
  },
  data() {
    return {
      loading: false,
      searchPhrase: '',
      items: [],
      defaultItem: [Number, Array],
      content: this.value,
    }
  },
  watch: {
    defaultValue(value) {
      console.log('AutoComplete | watch defaultValue', value)
    },
    searchPhrase(val){
      // console.log('searchPhrase' , val)
      this.handleSearchInput()
    }
  },
  created() {
    if (this.defaultValue)
      this.defaultItem = this.defaultValue
    this.axios.get(this.api)
        .then(res => {
          this.items = res.data.items
        })
  },
  methods: {
    handleInput(e) {
      console.log('selected value', e, this.content)
      this.$emit('input', e)
    },
    handleSelect(event) {
      this.$emit('value-change', event)
    },
    handleSearchInput: debounce(function () {
      console.log('this.searchPhrase' , this.searchPhrase)
      if (!this.searchPhrase) return
      this.loading = true
      const url = `${this.api}?${this.queryParam}=${this.searchPhrase}`
      this.axios.get(url)
          .then(res => {
            this.loading = false
            console.log('handleSearchInput', res)
            this.items = res.data.items
          })
          .catch(err => {
            console.log(err)
          })
    }, 200),
  },
}
</script>

<style scoped>

</style>
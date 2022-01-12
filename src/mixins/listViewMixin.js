export const listViewMixin = {
  data() {
    return {
      items: [],
      pageSize: 20, // TODO: create a component for pagination
      pageSizeOptions: [10, 20, 50, 100],
      loading: false,
      page: 1,
      queries: '',
      totalPaginationVisible: 7,
      data: {
        items: [],
        count: 0,
        page_count: 0,
        next: null,
        previous: null,
      },
      searchPhrase: '',
      editedIndex: -1,
      dialogDelete: false,
    }
  },
  watch: {
    dialogDelete(val) {
      val || this.closeDelete()
    },
    pageSize() {
      this.page = 1
      this.reFetchData()
    },
    searchPhrase() {
      this.page = 1
      this.reFetchData()
    },
  },
  // created() {
  //   this.axios.get(this.apiRoot)
  //       .then(res => {
  //         console.log('main items', res)
  //         // this.items = res.data
  //         this.data = res.data
  //       })
  //       .catch(err => {
  //         console.log('main items error', err)
  //       })
  // },
  methods: {
    constructQuery() {
      let query = `?${this.queries}&page_size=${this.pageSize}`
      if (this.searchPhrase)
        query += `&search=${this.searchPhrase}`
      if (this.page)
        query += `&page=${this.page}`
      // console.log('constructQuery', query)
      return query
    },
    handleUpdate(event) {
      console.log('handleUpdate | event', event)
      const sortBy = event.sortBy
      const sortDesc = event.sortDesc

      this.queries = ''
      this.page = 1
      let query = ''
      for (let i = 0; i < sortBy.length; i++) {
        if (i === 0) query += 'o='
        const order = sortDesc[i] ? '-' : ''
        const comma = i > 0 ? ',' : ''
        query += comma + order + sortBy[i]
      }

      this.queries = query
      this.reFetchData()
    },
    reFetchData() {
      const url = this.apiRoot + this.constructQuery()
      this.loading = true
      // console.log('reFetchData', url)
      this.axios.get(url)
          .then(res => {
            console.log('reFetchData | response', res)
            this.data = res.data
            this.loading = false
          })
          .catch(err => {
            console.log('reFetchData | error', err)
            this.loading = false
          })
    },
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    deleteItem(item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      console.log('deleteItem | editedIndex', this.editedIndex)
      console.log('deleteItem | editedItem', this.editedItem)
      this.dialogDelete = true
    },

    handleItemDeletion() {
      const url = `${this.apiRoot}${this.editedItem.id}/`
      const deletedItemIndex = this.editedIndex

      this.axios.delete(url)
          .then(() => {
            this.items.splice(deletedItemIndex, 1)
          })
          .catch(err => console.log('delete error ', err))

      this.closeDelete()
    },
  },
}
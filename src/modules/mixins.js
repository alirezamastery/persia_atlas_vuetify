export const listViewMixin = {
  data() {
    return {
      items: [],
      pageSize: 20,
      pageSizeOptions: [10, 20, 50, 100],
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
  },
  created() {
    this.axios.get(this.apiRoot)
        .then(res => {
          console.log('main items', res)
          this.items = res.data
        })
        .catch(err => {
          console.log('main items error', err)
        })
  },
  methods: {
    reFetchData() {
      const url = this.apiRoot + this.constructQuery()
      this.loading = true
      console.log('reFetchData', url)
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
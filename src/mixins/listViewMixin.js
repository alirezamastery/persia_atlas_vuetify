const listViewMixin = {
  data() {
    return {
      items: [],
      editedIndex: -1,
      dialogDelete: false,
    }
  },
  watch: {
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },
  created() {
    this.axios.get(this.apiRoot)
        .then(res => {
          this.items = res.data
        })
        .catch(err => {
          console.log('main items error', err)
        })
  },
  methods: {
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

export default listViewMixin
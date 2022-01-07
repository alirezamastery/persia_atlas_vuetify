import {v4 as uuid4} from 'uuid'

export const AddEditViewMixin = {
  data() {
    return {
      showForm: true,
      deleteDialog: false,
    }
  },
  computed: {
    editingItemId() {
      return this.$route.params.id
    },
    formTitle() {
      if (this.editingItemId)
        return this.$t('general.change') + ' ' + this.itemType
      return this.$t('general.createANew').replace('{0}', this.itemType)
    },
  },
  created() {
    if (this.editingItemId) {
      this.showForm = false
      this.axios.get(this.apiRoot + this.id)
          .then(res => {
            console.log('details', res)
            this.formInit(res.data)
            this.showForm = true
          })
      console.log('no details, getting the item details from server')
    }
  },
  methods: {
    saveItem() {
      this.$refs.form.validate()
      console.log('form', this.form)
      const data = this.getRequestData()
      console.log('save payload', data)

      let url = this.apiRoot
      if (this.editingItemId) url += `${this.editingItemId}/`
      let method = this.editingItemId ? 'patch' : 'post'
      this.axios.request({url, data, method})
          .then(res => {
            console.log('save success', res.data)
            if (this.editingItemId) {
              this.$store.dispatch('HandleSettingSnackbar', {
                key: uuid4(),
                color: 'green',
                data: this.$t('general.snack.saveSuccess'),
              })
            } else {
              this.$store.dispatch('HandleAddingAlert', {
                key: uuid4(),
                type: 'success',
                data: this.itemAction('general.alert.saveSuccess', this.itemType, this.itemRepr),
              })
              this.$router.push({name: this.listViewRoute})
            }
          })
          .catch(err => {
            console.log('request error', err)
            this.$store.dispatch('HandleSettingSnackbar', {
              key: uuid4(),
              color: 'red',
              data: err.response.data,
            })
          })
    },

    deleteItem() {
      this.axios.delete(this.apiRoot + this.editingItemId + '/')
          .then(res => {
            console.log('res delete', res.data)
            this.$store.dispatch('HandleAddingAlert', {
              key: uuid4(),
              type: 'success',
              data: this.itemAction('general.alert.deleteSuccess', this.itemType, this.itemRepr),
            })
            this.$router.push({name: this.listViewRoute})
          })
          .catch(err => {
            console.log('delete error ', err)
            this.$store.dispatch('HandleAddingAlert', {
              key: uuid4(),
              type: 'error',
              data: `error in deleting ${this.itemRepr}`,
            })
          })
    },

  },
}


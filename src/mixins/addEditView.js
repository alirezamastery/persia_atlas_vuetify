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
      this.axios.get(this.apiRoot + this.id + '/')
          .then(res => {
            console.log('item details', res)
            this.formInit(res.data) // handle ManyToMany relations data in formInit
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
            const sentence = this.editingItemId ? 'general.alert.updateSuccess' : 'general.alert.saveSuccess'
            const alertText = this.itemAction(sentence, this.itemType, this.itemRepr)
            this.addAlert('success' , alertText)
            this.$router.push({name: this.listViewRoute})
          })
          .catch(err => {
            console.log('request error', err)
            this.addSnackbar('red' , err.response.data)
          })
    },

    deleteItem() {
      this.axios.delete(this.apiRoot + this.editingItemId + '/')
          .then(res => {
            console.log('res delete', res.data)
            const txt = this.itemAction('general.alert.deleteSuccess', this.itemType, this.itemRepr)
            this.addAlert('success' , txt)
            this.$router.push({name: this.listViewRoute})
          })
          .catch(err => {
            console.log('delete error ', err)
            const txt = `error in deleting ${this.itemRepr}`
            this.addAlert('error' , txt)
          })
    },

  },
}


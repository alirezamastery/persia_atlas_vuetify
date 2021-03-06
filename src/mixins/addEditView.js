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
        return this.$t('general.change') + ' ' + this.$t(this.itemType)
      return this.$t('general.createANew').replace('{0}', this.$t(this.itemType))
    },
  },
  created() {
    if (this.editingItemId) {
      this.showForm = false
      this.axios.get(this.apiRoot + this.id + '/')
          .then(res => {
            console.log('item details', res)
            this.formInit(res.data) // handle ManyToMany relations data in "formInit" method
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
            this.handleAlert()
            this.$router.push({name: this.listViewRoute})
          })
          .catch(err => {
            console.log('request error', err)
            this.addSnackbar('red', err.response.data)
          })
    },

    handleAlert() {
      const sentence = this.editingItemId ? 'general.alert.updateSuccess' : 'general.alert.saveSuccessGeneral'
      let alertText
      if(this.editingItemId)
        alertText = this.itemAction(sentence, this.$t(this.itemType), this.itemRepr)
      else
        alertText = this.itemTypeAction(sentence, this.$t(this.itemType))

      this.addAlert('success', alertText)
    },

    deleteItem() {
      this.deleteDialog = false
      this.axios.delete(this.apiRoot + this.editingItemId + '/')
          .then(res => {
            console.log('res delete', res.data)
            const txt = this.itemAction('general.alert.deleteSuccess', this.$t(this.itemType), this.itemRepr)
            this.addAlert('success', txt)
            this.$router.push({name: this.listViewRoute})
          })
          .catch(err => {
            console.log('delete error ', err)
            // const txt = `error in deleting ${this.itemRepr}`
            const resText = err.response.data.error
            this.addSnackbar('error', resText)
          })
    },

  },
}


<template>
  <v-card flat>
    <v-card-title>
      {{ formTitle }}
    </v-card-title>

    <v-card-text v-if="showForm">
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
                v-model="form.title"
                :label="$t('general.title')"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <AutoComplete
                :label="$t('products.actualProduct')"
                :query-param="'title'"
                :obj-repr-field="'title'"
                :api="$api.brands"
                v-on:value-change="form.brand.id = $event"
                :default-value="form.brand.id"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <DetailViewActions
        v-on:save="saveItem"
        v-on:delete="deleteDialog = true"
    />

    <!-- added v-if="editingItemId" to prevent form.title error when creating new object-->
    <v-dialog v-if="editingItemId" v-model="deleteDialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">
          {{ $t('general.itemDeleteQ').replace('{0}', form.title) }}
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue" @click="deleteDialog = false">{{ $t('general.cancel') }}</v-btn>
          <v-btn color="red" @click="deleteItem">{{ $t('general.yes') }}</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>

</template>

<script>
import {textToolsMixin} from '@/modules/mixins'
import AutoComplete from '@/components/AutoComplete'
import DetailViewActions from '@/components/general/DetailViewActions'

export default {
  name: 'Details',
  components: {
    AutoComplete,
    DetailViewActions,
  },
  mixins: [textToolsMixin],
  props: {
    id: {
      type: [Number, String],
      default: null,
      required: false,
    },
  },
  data() {
    return {
      apiRoot: this.$api.actualProducts,
      listViewRoute: 'actualProductsList',
      showForm: true,
      form: {
        title: null,
        brand: {},
      },
      deleteDialog: false,
    }
  },
  computed: {
    editingItemId() {
      return this.$route.params.id
    },
    formTitle() {
      if (this.editingItemId)
        return this.$t('general.change') + ' ' + this.$t('products.actualProduct')
      return this.createNewTitle('products.actualProduct')
    },
  },
  created() {
    if (this.id) {
      console.log('getting the item details from server')
      this.showForm = false
      this.axios.get(this.apiRoot + this.id)
          .then(res => {
            console.log('details', res)
            this.form = res.data
            this.showForm = true
          })
    }
  },
  methods: {
    // createNewTitle(i18Path) {
    //   return this.$t('general.createANew').replace('{0}', this.$t(i18Path))
    // },

    handleSelectBrand(event) {
      console.log('handleSelectProduct', event)
      this.form.product.id = event
    },

    saveItem() {
      console.log('form', this.form)
      const data = {
        title: this.form.title,
        brand: this.form.brand.id,
      }
      console.log('save payload', data)

      let url = this.apiRoot
      if (this.editingItemId) url += `${this.editingItemId}/`
      let method = this.editingItemId ? 'patch' : 'post'
      this.axios.request({url, data, method}).then(res => {
        if (!this.editingItemId)
          this.$router.push({name: this.listViewRoute})
      })
    },

    deleteItem() {
      this.axios.delete(this.apiRoot + this.id + '/')
          .then(() => {
            this.$router.push({name: this.listViewRoute})
          })
          .catch(err => console.log('patch error ', err))
    },
  },

}
</script>

<style scoped>

</style>
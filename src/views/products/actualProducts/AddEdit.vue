<template>
  <v-card flat>
    <v-card-title>
      {{ formTitle }}
    </v-card-title>

    <v-card-text v-if="showForm">
      <validation-observer
          ref="form"
          v-slot="{ invalid }"
      >
        <v-form @submit.prevent="submit">
          <v-container>
            <v-row>
              <v-col>
                <ValidationProvider name="Title" rules="required" v-slot="{ errors }">
                  <v-text-field
                      v-model="form.title"
                      :label="$t('general.title')"
                      :error-messages="errors"
                  />
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <ValidationProvider name="Brand" rules="required" v-slot="{ errors }">
                  <AutoComplete
                      :label="$t('products.brand')"
                      :query-param="'title'"
                      :obj-repr-field="'title'"
                      :api="$api.brands"
                      v-model="form.brand.id"
                      :error-messages="errors"
                  />
                </ValidationProvider>
              </v-col>
            </v-row>
          </v-container>

          <DetailViewActions
              :show-delete="!!editingItemId"
              :save-disabled="invalid"
              v-on:save="saveItem"
              v-on:delete="handleDeleteDialog"
          />

        </v-form>

      </validation-observer>
    </v-card-text>

    <DetailViewDeleteDialog
        v-if="editingItemId"
        v-model="deleteDialog"
        :item-title="form.title"
        v-on:delete="deleteItem"
    />

  </v-card>
</template>

<script>
import {textToolsMixin} from '@/modules/mixins'
import AutoComplete from '@/components/AutoComplete'
import DetailViewActions from '@/components/general/DetailViewActions'
import DetailViewDeleteDialog from '@/components/general/DetailViewDeleteDialog'

export default {
  name: 'AddEdit',
  components: {
    AutoComplete,
    DetailViewActions,
    DetailViewDeleteDialog,
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
        brand: {id: null},
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
    submit() {
      this.$refs.form.validate()
    },

    handleDeleteDialog() {
      this.deleteDialog = true
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
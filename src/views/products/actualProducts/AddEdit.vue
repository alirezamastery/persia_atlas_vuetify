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
        <v-form @submit.prevent="saveItem">
          <v-container>
            <v-row>
              <v-col cols="12" md="6" lg="4">
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
              <v-col cols="12" md="6" lg="4">
                <ValidationProvider name="Brand" rules="required" v-slot="{ errors }">
                  <AutoComplete
                      v-model="form.brand.id"
                      :label="$t('products.brand')"
                      :query-param="'search'"
                      :obj-repr-field="'title'"
                      :api="$api.brands"
                      :error-messages="errors"
                  />
                </ValidationProvider>
              </v-col>
            </v-row>
          </v-container>

          <DetailViewActions
              :show-delete="!!editingItemId"
              :save-disabled="invalid"
              v-on:delete="deleteDialog = true"
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
import {textToolsMixin} from '@/mixins/textTools'
import {AddEditViewMixin} from '@/mixins/addEditView'
import AutoComplete from '@/components/AutoComplete'
import DetailViewActions from '@/components/viewAddEdit/Actions'
import DetailViewDeleteDialog from '@/components/viewAddEdit/DeleteDialog'

export default {
  name: 'AddEdit',
  components: {
    AutoComplete,
    DetailViewActions,
    DetailViewDeleteDialog,
  },
  mixins: [textToolsMixin, AddEditViewMixin],
  props: {
    id: {
      type: [Number, String],
      default: null,
    },
  },
  data() {
    return {
      apiRoot: this.$api.actualProducts,
      listViewRoute: 'actualProductList',
      itemType: 'products.brand',
      form: {
        title: null,
        brand: {id: null},
      },
    }
  },
  computed: {
    itemRepr() {
      return this.form.title.toString()
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
    formInit(resData) {
      this.form = resData
    },
    getRequestData() {
      return {
        title: this.form.title,
        brand: this.form.brand.id,
      }
    },
  },
}
</script>

<style scoped>

</style>
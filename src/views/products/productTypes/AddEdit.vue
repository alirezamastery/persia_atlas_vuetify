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
                <ValidationProvider name="Product" rules="required" v-slot="{ errors }">
                  <AutoComplete
                      v-model="form.selectors"
                      :label="$t('products.productTypeSelector')"
                      :query-param="'title'"
                      :obj-repr-field="'title'"
                      :api="$api.productTypeSelectors"
                      :error-messages="errors"
                      select-multiple
                  />
                </ValidationProvider>
              </v-col>
            </v-row>

          </v-container>

          <DetailViewActions
              :save-disabled="invalid"
              :show-delete="!!editingItemId"
              v-on:delete="deleteDialog = true"
          />

        </v-form>
      </validation-observer>
    </v-card-text>

    <DetailViewDeleteDialog
        v-if="editingItemId"
        v-model="deleteDialog"
        :item-title="itemRepr"
        v-on:delete="deleteItem"
    />

  </v-card>
</template>

<script>
import {AddEditViewMixin} from '@/mixins/addEditView'
import {textToolsMixin} from '@/mixins/textTools'
import AutoComplete from '@/components/AutoComplete'
import DetailViewActions from '@/components/viewAddEdit/Actions'
import DetailViewDeleteDialog from '@/components/viewAddEdit/DeleteDialog'

export default {
  name: 'Details',
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
      apiRoot: this.$api.productTypes,
      listViewRoute: 'productTypeList',
      itemType: this.$t('products.productType'),
      form: {
        title: '',
        selectors: [],
      },
    }
  },
  computed: {
    itemRepr() {
      return this.form.title.toString()
    },
  },
  methods: {
    formInit(resData) {
      this.form = resData
    },
    getRequestData() {
      return {
        title: this.form.title,
        selectors: this.form.selectors,
      }
    },
  },
}
</script>

<style scoped>

</style>
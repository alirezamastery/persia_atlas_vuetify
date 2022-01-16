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
import DetailViewActions from '@/components/viewAddEdit/Actions'
import DetailViewDeleteDialog from '@/components/viewAddEdit/DeleteDialog'

export default {
  name: 'Details',
  components: {
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
      apiRoot: this.$api.costTypes,
      listViewRoute: 'costTypeList',
      itemType: this.$t('acc.costType'),
      form: {
        title: '',
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
      }
    },
  },
}
</script>

<style scoped>

</style>
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
              <v-col cols="12" md="6" lg="2">
                <ValidationProvider name="Title" rules="required" v-slot="{ errors }">
                  <AutoComplete
                      v-model="form.type.id"
                      :label="$t('general.type')"
                      :query-param="'search'"
                      :obj-repr-field="'title'"
                      :api="$api.costTypes"
                      :error-messages="errors"
                  />
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6" lg="2">
                <ValidationProvider name="Amount" rules="required|number_with_comma" v-slot="{ errors }">
                  <v-text-field
                      v-model="form.amount"
                      :label="$t('general.amount')"
                      :error-messages="errors"
                  />
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row class="align-center">
              <v-col cols="12" sm="6" md="4" lg="3" xl="2" class="d-flex flex-row">
                <v-btn
                    @click="showDatePicker = true"
                    color="primary"
                    fab
                    small
                >
                  <v-icon>mdi-calendar</v-icon>
                </v-btn>
                <v-text-field
                    id="date-input"
                    hide-details
                    flat
                    outlined
                    solo
                    dense
                    :value="persianDate"
                    class="mx-3"
                />
                <persian-date-picker
                    v-model="form.date"
                    custom-input="#date-input"
                    :show="showDatePicker"
                    @close="showDatePicker = false"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6" lg="4">
                <v-textarea
                    v-model="form.description"
                    :label="$t('general.description')"
                    outlined
                />
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
import {numberToolsMixin} from '@/mixins/numberTools'
import DetailViewActions from '@/components/viewAddEdit/Actions'
import DetailViewDeleteDialog from '@/components/viewAddEdit/DeleteDialog'
import AutoComplete from '@/components/AutoComplete'

import moment from 'moment-jalaali'

export default {
  name: 'Details',
  components: {
    DetailViewActions,
    DetailViewDeleteDialog,
    AutoComplete,
  },
  mixins: [textToolsMixin, AddEditViewMixin, numberToolsMixin],
  props: {
    id: {
      type: [Number, String],
      default: null,
    },
  },
  data() {
    return {
      apiRoot: this.$api.costs,
      listViewRoute: 'costList',
      itemType: 'acc.cost',
      form: {
        type: {title: ''},
        amount: '',
        date: '',
        description: '',
      },
      showDatePicker: false,
      persianDate: '',
    }
  },
  computed: {
    itemRepr() {
      return this.form.type.title.toString()
    },
  },
  watch: {
    'form.amount': function (newVal) {
      this.form.amount = this.formatIntNumber(newVal)
    },
  },
  methods: {
    formInit(resData) {
      this.form = resData
      this.form.amount = this.formatIntNumber(this.form.amount.toString())
      const m = moment(this.form.date, 'YYYY/MM/DD')
      this.persianDate = m.format('jYYYY/jMM/jDD')
    },
    getRequestData() {
      return {
        type: this.form.type.id,
        amount: this.numberWithCommaToInt(this.form.amount),
        date: this.form.date,
        description: this.form.description,
      }
    },
  },
}
</script>

<style scoped lang="scss">
.theme--dark {
  .vpd-container {
    color: black !important;
  }
}

.vpd-container {
  color: black !important;
}
</style>
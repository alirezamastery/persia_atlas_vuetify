import Vue from 'vue'
import moment from 'moment'
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import {cloneDeep as clone} from 'lodash'

const highlight = function highlight(formatted, dateMoment) {
  let attributes = {}
  if (dateMoment.format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')) {
    attributes['class'] = 'is-today'
  }
  return attributes
}

let locale = 'fa,en'
let localeConfig = () => ({
  fa: {
    dow: 6,
    dir: 'rtl',
    displayFormat: vm => {
      switch (vm.type) {
        case 'date':
          return 'jYYYY/jMM/jDD'
        case 'datetime':
          return 'jYYYY/jMM/jDD HH:mm'
        case 'year':
          return 'jYYYY'
        case 'month':
          return 'jMM'
        case 'yearmonth':
          return 'jYY/jMM'
        case 'time':
          return 'HH:mm'
      }
    },
    lang: {
      label: 'شمسی',
      submit: 'ثبت',
      cancel: 'انصراف',
      now: 'الان',
      nextMonth: 'ماه بعد',
      prevMonth: 'ماه قبل',
    },
  },
  en: {
    dow: 0,
    dir: 'ltr',
    displayFormat: vm => {
      switch (vm.type) {
        case 'date':
          return 'YYYY/MM/DD'
        case 'datetime':
          return 'YYYY/MM/DD HH:mm'
        case 'year':
          return 'YYYY'
        case 'month':
          return 'MM'
        case 'yearmonth':
          return 'YY/MM'
        case 'time':
          return 'HH:mm'
      }
    },
    lang: {
      label: 'Gregorian',
    },
  },
})

export const datePickerConfig = {
  name: 'persian-date-picker',
  props: {
    locale,
    highlight,
    localeConfig,
    // clearable: true,
    autoSubmit: true,
    // color: '#00acc1',
    format: 'YYYY-MM-DD',
    displayFormat: 'jDD jMMMM jYYYY',
  },
}

export const dateTimePickerConfig = {
  name: 'persian-date-time-picker',
  props: {
    locale,
    highlight,
    localeConfig,
    // clearable: true,
    autoSubmit: true,
    // color: '#00acc1',
    type: 'datetime',
    format: 'YYYY-MM-DD HH:mm',
    displayFormat: 'jYYYY-jMM-jDD HH:mm',
  },
}

export const localize = function (localeName) {
  console.log('localize date picker:', localeName)
  // locale = localeName
}


Vue.use(clone(VuePersianDatetimePicker), datePickerConfig)
Vue.use(clone(VuePersianDatetimePicker), dateTimePickerConfig)
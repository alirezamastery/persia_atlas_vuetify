import {extend, localize} from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import fa from '@/locales/farsi/validation.json'

localize('fa', fa)

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})

extend('number_with_comma', {
  validate(value) {
    return {
      required: true,
      valid: value.toString()
          .replace(/,/g, '')
          .replace(/[0-9]/g, '') === '' && value.length > 0,
    }
  },
})
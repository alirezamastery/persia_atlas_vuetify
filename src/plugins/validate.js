import {extend, localize} from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import farsi from '@/locales/farsi'

localize({ farsi})

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})
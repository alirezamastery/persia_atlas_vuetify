import Vue from 'vue'
import moment from 'moment-jalaali'

const price = (value) => {
  const reverse = val =>
      (val || 0)
          .toString()
          .split('')
          .reverse()
          .join('')

  return reverse(reverse(value).replace(/(\d{3})(?=\d)/g, '$1,'))
}

const persianDate = (val, format = 'jYYYY/jMM/jDD') => {
  if (!val) return ''
  return moment(val).format(format)
}

Vue.filter('price', price)
Vue.filter('persianDate', persianDate)


export default {
  price,
}

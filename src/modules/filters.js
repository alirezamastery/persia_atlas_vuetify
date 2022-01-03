import Vue from 'vue'

const price = (value) => {
  const reverse = val =>
    (val || 0)
      .toString()
      .split('')
      .reverse()
      .join('')

  return reverse(reverse(value).replace(/(\d{3})(?=\d)/g, '$1,'))
}

Vue.filter('price', price)


export default {
  price,
}

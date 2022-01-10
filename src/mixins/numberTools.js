export const numberToolsMixin = {
  methods: {
    addCommaForIntNumber(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    removeCommas(val){
      return val.replace(/,/g, '')
    },
    formatNumber(val){
      const commaRemoved = this.removeCommas(val)
      return this.addCommaForIntNumber(commaRemoved)
    }
  },
}
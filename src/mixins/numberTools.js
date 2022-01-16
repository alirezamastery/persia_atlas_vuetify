export const numberToolsMixin = {
  methods: {
    addCommaForIntNumber(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    removeCommas(val){
      return val.replace(/,/g, '')
    },
    formatIntNumber(val){
      const commaRemoved = this.removeCommas(val)
      return this.addCommaForIntNumber(commaRemoved)
    },
    numberWithCommaToInt(val){
      return parseInt(this.removeCommas(val))
    }
  },
}
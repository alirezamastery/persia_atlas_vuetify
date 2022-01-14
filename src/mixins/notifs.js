import Vue from 'vue'
import store from '@/store'
import {v4 as uuid4} from 'uuid'


Vue.mixin({
  methods: {
    addSnackbar(color, text) {
      this.$store.dispatch('HandleSettingSnackbar', {
        color: color,
        data: text,
      })
    },
    addAlert(type, text) {
      this.$store.dispatch('HandleAddingAlert', {
        key: uuid4(),
        type: type,
        data: text,
      })
    },
  },
})
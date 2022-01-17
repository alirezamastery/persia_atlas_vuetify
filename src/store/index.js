import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'

import {state, mutations, getters, actions} from './general'
import auth from '@/store/modules/auth'
import crud from '@/store/modules/crud'

Vue.use(Vuex)

export default new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions,
  modules: {
    auth,
    crud
  },
  plugins: [
    createPersistedState(),  // it will persist the store next time you open the browser
  ],
})

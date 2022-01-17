const state = {
  tableFilterResetSignal: false,
}

const getters = {}

const mutations = {
  SIGNAL_TABLE_FILTER_RESET(state) {
    state.tableFilterResetSignal = !state.tableFilterResetSignal
  },

}

const actions = {
  HandleTableFilterReset({commit}) {
    commit('SIGNAL_TABLE_FILTER_RESET')
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}

import Vue from 'vue'

const state = {
  windowWidth: -1,
  httpRequestQueue: 0,
  sidebarOpen: false,
  alerts: [],
  pendingAlerts: [],
  snackbars: [],
  snackbar: null,
  globalCardClass: 'px-20 py-40',
}

const getters = {
  hasHttpRequestWaiting: state => state.httpRequestQueue > 0,
  isMobileWidth: state => state.windowWidth < 768,
}

const mutations = {
  SET_WINDOW_WIDTH(state, value) {
    state.windowWidth = value
  },
  INCREMENT_HTTP_REQUEST_QUEUE(state) {
    // console.log('incre before', state.httpRequestQueue)
    state.httpRequestQueue++
    // console.log('incre after', state.httpRequestQueue)
  },
  DECREMENT_HTTP_REQUEST_QUEUE(state) {
    // console.log('decre before', state.httpRequestQueue)
    state.httpRequestQueue--
    if (state.httpRequestQueue < 0)
      state.httpRequestQueue = 0
    // console.log('decre after', state.httpRequestQueue)
  },
  CLEAR_HTTP_QUEUE(state){
    state.httpRequestQueue = 0
  },
  SET_SIDEBAR_IS_OPEN(state, value) {
    state.sidebarOpen = value
  },
  ADD_PENDING_ALERT(state, alert) {
    state.pendingAlerts.push(alert)
  },
  ADD_ALERT(state, alert) {
    state.alerts.push(alert)
  },
  REMOVE_ALERT(state, alert) {
    const index = state.alerts.findIndex(item => item.key === alert.key)
    if (index > -1)
      state.alerts.splice(index, 1)
  },
  CLEAR_PENDING_ALERTS(state) {
    state.pendingAlerts = []
  },
  CLEAR_ALERTS(state) {
    state.alerts = []
  },
  ADD_SNACKBAR(state, snackbar) {
    state.snackbars.push(snackbar)
  },
  REMOVE_SNACKBAR(state, snackbar) {
    const index = state.snackbars.findIndex(item => item.key === snackbar.key)
    if (index > -1)
      state.snackbars.splice(index, 1)
    state.snackbars = []
  },
  SET_SNACKBAR(state, payload) {
    state.snackbar = payload
  },
}

const actions = {
  HandleSidebarOpenStatus({commit}, payload) {
    commit('SET_SIDEBAR_IS_OPEN', payload)
  },
  HandleAddingAlert({commit}, alert) {
    // commit('ADD_ALERT', alert)
    console.log('HandleAddingAlert' , alert)
    commit('ADD_PENDING_ALERT', alert)
  },
  HandleRemovingAlert({commit}, alert) {
    commit('REMOVE_ALERT', alert)
  },
  HandleAddingSnackbar({commit, dispatch}, snackbar) {
    console.log('HandleAddingSnackbar', snackbar)
    commit('ADD_SNACKBAR', snackbar)
    // window.setTimeout(dispatch('HandleRemovingSnackbar', snackbar), 5000)
  },
  HandleRemovingSnackbar({commit}, snackbar) {
    commit('REMOVE_SNACKBAR', snackbar)
  },
  HandleSettingSnackbar({commit}, payload) {
    console.log('HandleSettingSnackbar', payload)
    commit('SET_SNACKBAR', payload)
  },
}


export {
  state,
  getters,
  actions,
  mutations,
}

import Vue from 'vue'

const state = {
  windowWidth: -1,
  httpRequestQueue: 0,
  sidebarOpen: false,
  alerts: [],
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
  SET_SIDEBAR_IS_OPEN(state, value) {
    state.sidebarOpen = value
  },
  ADD_ALERT(state, alert) {
    state.alerts.push(alert)
  },
  REMOVE_ALERT(state, alert) {
    const index = state.alerts.indexOf(alert)
    state.alerts.splice(index, 1)
  },
}

const actions = {
  HandleSidebarOpenStatus({commit}, payload) {
    commit('SET_SIDEBAR_IS_OPEN', payload)
  },
}


export {
  state,
  getters,
  actions,
  mutations,
}

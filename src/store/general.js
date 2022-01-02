const state = {
  httpRequestQueue: 0,
}

const getters = {
  hasHttpRequestWaiting: state => state.httpRequestQueue > 0,
}

const mutations = {
  INCREMENT_HTTP_REQUEST_QUEUE(state) {
    console.log('incre before' , state.httpRequestQueue)
    state.httpRequestQueue++
    console.log('incre after' , state.httpRequestQueue)

  },
  DECREMENT_HTTP_REQUEST_QUEUE(state) {
    console.log('decre before' , state.httpRequestQueue)
    state.httpRequestQueue--
    if (state.httpRequestQueue < 0)
      state.httpRequestQueue = 0
    console.log('decre after' , state.httpRequestQueue)
  },
}

const actions = {}


export {
  state,
  getters,
  actions,
  mutations,
}

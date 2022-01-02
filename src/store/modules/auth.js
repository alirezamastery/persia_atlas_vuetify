const state = {
  user: null,
  userPhoneNumber: null
}

const getters = {
  isAuthenticated: state => !!state.user,
  StateUser: state => state.user,
}

const mutations = {
  setPhoneNumber(state, number) {
    state.phoneNumber = number;
  },
  setUser(state, username) {
    state.user = username;
  },
  logout(state, user) {
    state.user = user;
  },
}

const actions = {
  LogIn({commit}, userMobile) {
    // const data = await this.axios.post('token/', user);
    // console.log('login response:',data)
    commit('setUser', userMobile);
  },
  LogOut({commit}) {
    let user = null;
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    commit('logout', user);
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

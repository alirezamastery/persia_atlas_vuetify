import Vue from 'vue'

const state = {
  user: null,
  userPhoneNumber: null,
  userAvatarURL: null,
  profile: {
    first_name: null,
    last_name: null,
    avatar: null,
  },
}

const getters = {
  isAuthenticated: state => !!state.user,
  StateUser: state => state.user,
}

const mutations = {
  SET_PHONE_NUMBER(state, number) {
    state.phoneNumber = number
  },
  SET_USER(state, username) {
    state.user = username
  },
  SET_PROFILE(state, payload) {
    for (const [key, value] of Object.entries(payload)) {
      console.log(key, value)
      let val = value
      if (key === 'avatar')
        val = process.env.VUE_APP_SERVER_BASE_URL + value
      Vue.set(state.profile, key, val)
    }
  },
  SET_PROFILE_KEY(state, key, value) {
    Vue.set(state.profile, key, value)
  },
  SET_AVATAR(state, url) {
    Vue.set(state.profile, 'avatar', url)
  },
  LOGOUT(state, user) {
    state.user = user
  },
}

const actions = {
  LogIn({commit}, userMobile) {
    commit('SET_USER', userMobile)
  },
  LogOut({commit}) {
    let user = null
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    commit('LOGOUT', user)
  },
  SetProfile({commit}, payload) {
    commit('SET_PROFILE', payload)
  },
  SetProfileKeyValue({commit}, key, value) {
    commit('SET_PROFILE_KEY', key, value)
  },
  SetAvatar({commit}, url) {
    commit('SET_AVATAR', url)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}

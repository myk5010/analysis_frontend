
const state = {
  message: '',
  msgTime: 0,
}

const mutations = {
  SET_MESSAGE_INFO: (state, message) => {
    state.message = message
  },
  SET_MESSAGE_TIME: (state, time) => {
    state.msgTime = time
  },
}

const getters = {
  message: state => {
    return state.message
  },
  msgTime: state => {
    return state.msgTime
  },
}

const actions = {
  // 保存提示信息
  async saveMessage({ commit }, msgData) {
    commit('SET_MESSAGE_INFO', msgData.msg)
    commit('SET_MESSAGE_TIME', msgData.time)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
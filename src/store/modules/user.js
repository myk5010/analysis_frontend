import { getToken, setToken, removeToken } from '@/utils/cookie'
import { login, logout, getInfo, getPermission } from '@/api/user'
// import Vue from 'vue'

const state = {
  userInfo: {},
  userPermission: [],
  userToken: getToken()
}

const mutations = {
  SET_USER_INFO: (state, userData) => {
    sessionStorage.setItem('userInfo', JSON.stringify(userData))
    state.userInfo = userData
  },
  SET_USER_PERMISSION: (state, permission) => {
    sessionStorage.setItem('userPermission', JSON.stringify(permission))
    state.userPermission = permission
  },
  SET_USER_TOKEN: (state, tokenData) => {
    state.userToken = tokenData
  },
}

const getters = {
  userInfo: state => {
    return state.userInfo
  },
  userPermission: state => {
    return state.userPermission
  },
  userToken: state => {
    return state.userToken
  }
}

const actions = {
  // 登录
  async userLogin({ commit }, userData) {
    const { token_type, access_token } = await login({
      username: userData.username.trim(),
      password: window.btoa(userData.password)
    })
    // 用户token
    const tokenData = token_type + ' ' + access_token
    setToken(tokenData)
    commit('SET_USER_TOKEN', tokenData)
  },
  // 获取用户信息
  async getUser({ commit }) {
    const { data } = await getInfo()
    commit('SET_USER_INFO', data)
    return data
  },
  // 用户权限
  async userPermission({ commit }, userInfo) {
    const permission = await getPermission(userInfo.id)
    commit('SET_USER_PERMISSION', permission)
  },
  // 删除 token, 清除用户数据
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_USER_TOKEN', '')
      removeToken()
      sessionStorage.clear()
      resolve()
    })
  },
  // 退出登录
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.userToken).then(() => {
        commit('SET_USER_TOKEN', '')
        commit('SET_USER_PERMISSION', [])
        removeToken()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
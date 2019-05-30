import { login, logout, getInfo } from '@/api/login'

const user = {
  state: {
    authkey: localStorage.getItem("authkey"),
    // authkey: '',
    resources:[],
    sysUser:{}
  },

  mutations: {
    SET_AUTHKEY: (state, authkey) => {
      state.authkey = authkey
    },
    SET_resources: (state, resources) => {
      state.resources = resources
    },
    SET_sysUser: (state, sysUser) => {
      state.sysUser = sysUser
    }
  },

  actions: {
    // 登录
    Login({ commit }, loginInfo) {
      const username = loginInfo.parameter.dlmc.trim();
      return new Promise((resolve, reject) => {
        login(username, loginInfo.parameter.dlmm).then(response => {
          const data = response.result;
          localStorage.setItem("authkey",data.authkey)
          localStorage.setItem("resources",data.resources)
          localStorage.setItem("sysUser",data.sysUser)
          commit('SET_AUTHKEY', data.authkey);
          resolve()
        }).catch(error => {
          console.log(error);
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.authkey).then(() => {
          commit('SET_AUTHKEY', '')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_AUTHKEY', '')
        resolve()
      })
    }
  }
}

export default user

import * as types from '../type'
import U from '../../axios/user'
import notice from "../../axios/notice";

const state = {
  token: localStorage.getItem('pagetoken'),
  notice: '',
  name:'',
  id:'',
  loginForm:false
}
const mutations = {
  [types.TOKEN_CREATE]: (state, val) => {
    state.token = val
    localStorage.setItem('pagetoken', val)
  },
  [types.TOKEN_DELETE]: (state) => {
    state.token = null
    localStorage.removeItem('pagetoken')
  },
  [types.NOTICE_CREATE]: (state, val) => {
    state.notice = val
  },
  [types.NAME_SET]: (state, val) => {
    state.name = val.name
    state.id = val.id
  },
  [types.LOGIN_SET_TRUE]: (state) => {
    state.loginForm = true
  },
  [types.LOGIN_SET_FALSE]: (state) => {
    state.loginForm = false
  }
}
const actions = {
  createToken({ commit }, { name, password }) {
    return new Promise((resolve, reject) => {
      U.login({ name, password })
        .then(res => {
          if (res.data.success === true) {
            let token = res.data.token
            commit(types.TOKEN_CREATE, token)

          }
          if (res.data.success === false) {
            commit(types.TOKEN_DELETE)
          }
          console.log(res)
          commit(types.NOTICE_CREATE, res.data.msg)
          // commit(types.NAME_SET,name)
          resolve(res.data.success)

        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
export default {
  state,
  mutations,
  actions
}

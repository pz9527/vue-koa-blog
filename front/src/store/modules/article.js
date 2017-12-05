import * as types from '../type'
import A from '../../axios/article'

const state = {
  articleList: [],
  currentPage: '1',
  limit: 1000,
  cate: '',
  currentArticle: '',
  initData: []

}
const mutations = {
  [types.ARTICLE_GET_ALL]: (state, val) => {
    state.articleList = val
  },
  [types.ARTICLE_DELETE]: (state, val) => {
    state.articleList.splice(val, 1)
  },
  [types.ARTICLE_MODIFY]: (state, val) => {
    state.currentArticle=val
  },
  [types.PAGE_CURRENT_SET]: (state, val) => {
    state.currentPage = val
  },
  [types.PAGE_LIMIT_SET]: (state, val) => {
    state.limit = val
  },
  [types.PAGE_CATE_SET]: (state, val) => {
    state.cate = val
  },
  [types.PAGE_TOTAL_SET]: (state, val) => {
    state.initData = val
  },
  [types.ARTICLE_GET]: (state, val) => {
    state.currentArticle = val
  },
}
const actions = {
  getArticleByPage({ commit, state }) {
    return new Promise((resolve, reject) => {
      A.getArticleByPage(state.limit, state.currentPage, state.cate)
        .then(res => {
          console.log(res)
          if (res.data.code = 200) {
            let data = res.data
            commit(types.ARTICLE_GET_ALL, data)
            resolve(data)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  init({ commit }) {
    return new Promise((resolve, reject) => {
      A.getTotal()
        .then(res => {
          if (res.data.code = 200) {
            let data = res.data
            commit(types.PAGE_TOTAL_SET, data)
            resolve(data)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  delArticle({commit},{index,id}){
    return new Promise((resolve,reject)=>{
      A.delArticleById(id)
      .then(res=>{
        if(res.data.success===true){
          commit(types.ARTICLE_DELETE,index)
        }
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

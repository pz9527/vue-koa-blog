import axios from 'axios'
export default {
    getAllArticle() {
        return axios.get('/artcile/')
    },
    createArticle(data) {
        return axios.post('/artcile/', data)
    },
    getArticleById(id) {
        return axios.get(`/article?id=${id}`) 
    }, getArticleByPage(limit, page, cate) {
        return axios.get(`/article?limit=${limit}&page=${page}&cate=${cate}`)
    },
    getArticleByCateId(id) {
        return axios.get(`/article?cateid=${id}`)
    },
    delArticleById(id) {
        return axios.delete(`/article/${id}`)
    },
    modifyArticle(id, data) {
        return axios.patch(`/articles/${id}`, data);
    },
    getCateById(id) {
        return axios.get(`/cate/${id}`)
    },
    getTotal() {
        return axios.get('/total')
    },
}

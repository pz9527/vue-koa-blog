import axios from 'axios'
export default{
    login(data) {
        return axios.post('/user/login',data)
    },
    logout(){
        return axios.get('/user/logout')
    },
    updUserInfo(data){
        return axios.post('/user/modifyInfo',data)
    },
    updUserPwd(data){
        return axios.post('/user/modifyPwd',data)
    }
}

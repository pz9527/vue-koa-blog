import axios from 'axios'
export default{
    pushNotice(data){
        return axios.post('/notice')
    }
}
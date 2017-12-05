import axios from 'axios'
import store from '../store'
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = 5000;
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (store.state.token.token) {
        config.headers.Autherization = `token ${store.state.token.token}`;
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response) {
        switch (error.response.status) {
            case 401:
                store.commit('TOKEN_DELETE'); //可能是token失效，清除他
                store.commit('RESET');
        }
    }
    return Promise.reject(error);
});
import axios from 'axios';
import store from './store';
import router from './router'

const http = axios.create({
    baseURL: 'http://47.101.50.208/api/',  //请求数据的地址，部署到服务器作相应的改变
    timeout: 600000,//请求超时的毫秒数
})
//添加请求拦截器,在请求头中加入token
http.interceptors.request.use(
    config => {
        if(localStorage.getItem('token')){
            config.headers.token = localStorage.getItem('token');
            ///config.headers.token = store.state.b.token
        }
        if(localStorage.getItem('username')){
            config.headers.username = localStorage.getItem('username');
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)
//响应拦截器，看看是否返回401
http.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if(error.response){
            switch(error.response.status){
                case 401: {
                    //console.log("拦截器：验证失败");
                    //localStorage.removeItem('Authorization');
                    store.commit('del_token');
                    //router.push('/login');   //服务器未授权，同样会重定向到登陆界面，之后重新登录获取新的token
                } break;
                // case 404: {
                //     console.log("404： 找不到相关资源");
                // } break;
                // case 500: {
                //     console.log("拦截器：500: 服务器内部错误");
                // } break;
                // default: console.log("发生未知错误");
                //后面几个状态码的拦截器貌似并没有生效
            }
        }
        return Promise.reject(error);
    }
)
export default http;
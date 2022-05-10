// 对axios进行二次封装
import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'


// 配置对象
const requests = axios.create({
    baseURL: '/api',
    timeout: 5000
});
// 请求拦截器
requests.interceptors.request.use((config)=>{
    // 进度条开始
    nprogress.start()
    if(localStorage.getItem("UUIDTOKEN")){
        // 配置请求头信息，携带uuid用作游客身份
        config.headers.userTempId = localStorage.getItem("UUIDTOKEN")
    }
    if(sessionStorage.getItem("TOKEN")){
        // 配置请求头信息，携带用户token
        config.headers.token = sessionStorage.getItem("TOKEN")
    }
    
    return config;
}, function (error) {
    return Promise.reject(error);
});
// 响应拦截器
requests.interceptors.response.use(function (response) {
    // 进度条结束
    nprogress.done()
    return response.data;
}, function (error) {
    return Promise.reject(error);
});
export default requests
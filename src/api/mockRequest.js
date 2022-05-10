// 对axios进行二次封装
import axios from 'axios'

// 配置对象
const requests = axios.create({
    baseURL: '/mock',
    timeout: 5000
});
// 请求拦截器
requests.interceptors.request.use((config)=>{
    return config;
}, function (error) {
    return Promise.reject(error);
});
// 响应拦截器
requests.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error);
});
export default requests
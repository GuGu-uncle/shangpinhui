import { reqGetCode, reqUserRegister,reqUserLogin,reqUserInfo,reqUserLogout } from "@/api"
// 存储登录页跟注册页数据的小仓库
const state = () => {
    return {
        // 验证码
        code:'',
        // 获取本地的token
        token:sessionStorage.getItem("TOKEN"),
        // 用户名
        userInfo:{}
    }
} 
const mutations = {
    GETCODE(state,code){
        state.code = code
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    USERLOGOUT(state){
        state.userInfo = ''
    }
}
const actions = {
    // 发送请求获取验证码
    async getCode({commit},phone){
        let res = await reqGetCode(phone)
        if(res.code == 200){
            commit("GETCODE",res.data)
            return '成功'
        }else{
            return Promise.reject(new Error(res.message))
        }
    },
    // 发送请求注册用户
    async userRegister(context,params){
        let res = await reqUserRegister(params)
        if(res.code === 200){
            return '成功'
        }else{
            return Promise.reject(new Error(res.message))
        }
    },
    // 发送请求登录
    async userLogin(context,parpams){
        let res = await reqUserLogin(parpams)
        if(res.code === 200){
            // 将token存储到本地
            sessionStorage.setItem("TOKEN",res.data.token)
            return '成功'
        }else{
            return Promise.reject(new Error(res.message))
        }
    },
    // 发送请求获取用户信息
    async getUserInfo({commit}){
        let res = await reqUserInfo()
        if(res.code === 200){
            commit("GETUSERINFO",res.data)
            return '成功'
        }else{
            return Promise.reject(new Error(res.message))
        }
    },
    // 发送请求退出登录
    async userLogout({commit}){
        let res = await reqUserLogout()
        if(res.code === 200){
            sessionStorage.removeItem("TOKEN")
            commit("USERLOGOUT")
            return '成功'
        }else{
            return Promise.reject(new Error(res.message))
        }
    }
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}
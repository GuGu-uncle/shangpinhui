// 配置路由的文件

import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import store from '@/store'

const router = createRouter({
    history: createWebHistory(),
    routes,
    // 滚动行为
    scrollBehavior() {
        // 始终滚动到顶部
        return { top: 0 }
    },
})
// 配置全局前置守卫
router.beforeEach(async (to, from, next) => {
    // 获取sessionStorage里的token
    let token = sessionStorage.getItem("TOKEN")
    // 获取user仓库里面的用户信息里的用户名
    let name = store.state.user.userInfo.name
    if(token){
        // 登录后
        if(to.path === '/login'){
            // 单击跳转到登录页时，返回跳转前的页面
            next('/home')
        }else{
            // 跳转到非登录页前判断是否有用户信息
            if(name){
                // 有用户信息直接跳转
                next()
            }else{
                // 如果没有用户信息则派发action获取用户信息
                try {
                    // 获取用户信息成功
                    await store.dispatch("getUserInfo")
                    next()
                } catch (error) {
                    // 获取用户信息失败(token失效)
                    // 退出登录清除token再重新获取
                    await store.dispatch("userLogout")
                    next('/login')
                }
            }
        }
    }else{
        // 没登录，不能去交易相关、不能去支付相关【pay|paysuccess】、不能去个人中心
        if(to.path.indexOf('trade') != -1 || to.path.indexOf('pay') != -1 || to.path.indexOf('center') != -1){
            // 跳转到登录页
            next(`/login?redirect=${to.path}`)
        }else{
            next()
        }
    }
})

export default router
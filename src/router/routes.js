// 引入路由组件

// 一级路由
// 主页
// import Home from '@/views/Home'
// // 登录
// import Login from '@/views/Login'
// // 注册
// import Register from '@/views/Register'
// // 搜索
// import Search from '@/views/Search'
// // 商品详情
// import Detail from '@/views/Detail'
// // 加入购物车成功
// import AddCartSuccess from '@/views/AddCartSuccess'
// // 购物车
// import ShopCart from '@/views/ShopCart'
// // 订单
// import Trade from '@/views/Trade'
// // 支付
// import Pay from '@/views/Pay'
// // 支付成功
// import PaySuccess from '@/views/PaySuccess'
// // 个人中心
// import Center from '@/views/Center'

// // 二级路由
// import MyOrder from '@/views/Center/MyOrder'

// 配置路由
export default [
    {
        path: '/home',
        // 路由懒加载
        component: () => import("@/views/Home"),
        meta: { show: true }
    }, {
        path: '/login',
        component: () => import("@/views/Login"),
        meta: { show: false }
    }, {
        path: '/register',
        component: () => import("@/views/Register"),
        meta: { show: false }
    }, {
        path: '/search/:keyword?',
        component: () => import("@/views/Search"),
        meta: { show: true },
        name: 'search'
    }, {
        path: '/detail/:skuId',
        component: () => import("@/views/Detail"),
        meta: { show: true }
    }, {
        path: '/addcartsuccess',
        name: 'addcartsuccess',
        component: () => import("@/views/AddCartSuccess"),
        meta: { show: true }
    }, {
        path: '/shopcart',
        component: () => import("@/views/ShopCart"),
        meta: { show: true }
    }, {
        path: '/trade',
        component: () => import("@/views/Trade"),
        meta: { show: true },
        // 路由独享守卫
        beforeEnter: (to, from,next) => {
            if(from.path == '/shopcart'){
                // 从购物车来的放行
                next()
            }else{
                // 不是从购物车来的跳转到购物车页面
                next('/shopcart')
            }
        },
    }, {
        path: '/pay',
        component: () => import("@/views/Pay"),
        meta: { show: true },
        beforeEnter (to, from, next) {
            // 不是从trade页面来的跳转到trade页面
            if (from.path==='/trade') {
                next()
            } else {
                next('/trade')
            }
        }
    }, {
        path: '/paysuccess',
        component: () => import("@/views/PaySuccess"),
        meta: { show: true }
    }, {
        path: '/center',
        component: () => import("@/views/Center"),
        meta: { show: true },
        children:[
            {
                path:'myorder',
                component:() => import("@/views/Center/MyOrder"),
            },{
                // 重定向
                path:'',
                redirect:'/center/myorder'
            }
        ]
    },{
        // 重定向
        path: '/',
        redirect: '/home'
    }
]
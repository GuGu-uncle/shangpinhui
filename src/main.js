import { createApp } from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router'
// 引入组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
// 执行mock
import '@/mock/mockServer'
// 引入vuex
import store from '@/store'
// swiper轮播图样式
import "swiper/swiper-bundle.min.css"
// 引入API
import * as API from '@/api'
// 引入element-plus样式
import 'element-plus/dist/index.css'
// 引入图片懒加载插件
import lazyPlugin from 'vue3-lazy'
// 引入gif图片
import gif from '@/assets/1.gif'

const app = createApp(App)
// 注册全局组件
app.component(TypeNav.name,TypeNav)
app.component(Carousel.name,Carousel)
app.component(Pagination.name,Pagination)
app.use(store)
app.use(router)
app.use(lazyPlugin,{
    loading: gif
})
app.mount('#app')
// 将API挂载到全局上
app.config.globalProperties.$API = API

<template>
  <Header></Header>
  <!-- 路由组件出口 -->
  <router-view></router-view>
  <template v-if="$route.meta.show">
    <Footer></Footer>
  </template>
  
</template>

<script>
// 引入自定义组件
import Header from './components/Header'
import Footer from './components/Footer'
import { onMounted } from "vue"
import { useStore } from "vuex"
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  setup(){
    onMounted(() => {
      // 判断sessionStorage中是否有store的数据
      if(storeData){
        // 如果浏览器的sessionStorage中有三级联动的数据则不发送请求
        if(JSON.parse(storeData).home.categoryList.length) return
      }
      // 发送请求获取三级联动的数据
      store.dispatch("categoryList")
    })
    const store = useStore()
    let storeData = sessionStorage.getItem('store')
    // 在页面加载时读取sessionStorage里的状态信息
    // if (storeData){
    //   // 存储状态
    //   store.replaceState(Object.assign({}, store.state, JSON.parse(storeData)))
    // }
    // // 在页面刷新时将vuex里的信息保存到sessionStorage里
    // window.addEventListener('beforeunload', () => {
    //   sessionStorage.setItem('store', JSON.stringify(store.state))
    // })
  }
}
</script>

<style>
</style>

<template>
  <!-- 商品分类导航 -->
  <TypeNav/>
  <!-- 轮播图 -->
  <ListContainer/>
  <!-- 每日推荐 -->
  <Recommend/>
  <!-- 商品排行 -->
  <Rank/>
  <!-- 猜你喜欢 -->
  <Like/>
  <!-- 楼层 -->
  <Floor v-for="item in floorList" :key="item.id" :item="item"/>
  <!-- 商标 -->
  <Brand/>
</template>

<script>
import ListContainer from './ListContainer'
import Recommend from './Recommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'
import {onMounted,computed} from 'vue'
import {useStore} from 'vuex'
// import { ElButton } from 'element-plus'
export default {
  components:{
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  setup(){
    onMounted(() => {
      // 发送请求获取底部电器跟手机的信息
      store.dispatch('getFloorList')
    })

    const store = useStore()

    const floorList = computed(() => store.state.home.floorList)

    return {
      // 底部电器跟手机的信息
      floorList
    }
  }
}
</script>

<style>

</style>
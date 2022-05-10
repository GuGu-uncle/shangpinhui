// home模块小仓库
import {reqCategoryList,reqBannerList,reqFloorList} from '@/api'
const state = ()=>{
    return {
        // 保存三级联动数据
        categoryList:[],
        // 保存轮播图数据
        bannerList:[],
        // floor组件的数据
        floorList:[]
    }
}
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList
    }
}
const actions = {
    // 获取三级联动数据
    async categoryList({commit}){
        let res = await reqCategoryList()
        if(res.code === 200){
            commit('CATEGORYLIST',res.data)
        }
    },
    // 获取轮播图数据
    async getBannerList({commit}){
        let res = await reqBannerList()
        if(res.code === 200){
            commit('GETBANNERLIST',res.data)
        }
    },
    // 获取floor的数据
    async getFloorList({commit}){
        let res = await reqFloorList()
        if(res.code === 200){
            commit('GETFLOORLIST',res.data)
        }
    }
}
const getters = { }
export default {
   state,
   mutations,
   actions,
   getters
}
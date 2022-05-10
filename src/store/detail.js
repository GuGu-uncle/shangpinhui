import { reqGoodsInfo,reqAddOrUpdateShopCart } from "@/api"

// detail模块小仓库
const state = () => {
    return {
        // 商品详情
        goodsInfo:{}
    }
}
const mutations = {
    GETGOODSINFO(state,goodsInfo){
        state.goodsInfo = goodsInfo
    }
}
const actions = {
    // 获取商品详情
    async getGoodsList({commit},skuId){
        let res = await reqGoodsInfo(skuId)
        if(res.code === 200){
            commit("GETGOODSINFO",res.data)
        }
    },
    // 将商品加入到购物车或者改变购物车商品数量
    async reqAddOrUpdateShopCart(context,{skuId,skuNum}){
        let res = await reqAddOrUpdateShopCart(skuId,skuNum)
        if(res.code === 200){
            return "成功"
        }else{
            return Promise.reject(new Error("加入购物车失败"))
        }
    }
}
const getters = {
    categoryView(state){
        return state.goodsInfo.categoryView || {}
    },
    skuInfo(state){
        return state.goodsInfo.skuInfo || {}
    },
}
export default {
    state,
    mutations,
    actions,
    getters
}
import {reqShopCartList,reqChangeChecked,reqDeleteCart} from '@/api'
import {getUUID} from "@/utils/uuid_token"
// shopcart小仓库
const state = () => {
    return {
        // 获取唯一的UUID
        uuid_token:getUUID(),
        // 购物车商品列表数据
        shopCartList:[]
    }
}
const mutations = {
    GETSHOPCARTLIST(state,shopCartList){
        state.shopCartList = shopCartList
    }
}
const actions = {
    // 获取购物车列表数据
    async getShopCartList({commit}){
        let res = await reqShopCartList()
        if(res.code === 200){
            commit("GETSHOPCARTLIST",res.data)
        }
    },
    // 改变商品的选中
    async changeChecked(context,{skuID,isChecked}){
        let res = await reqChangeChecked(skuID,isChecked)
        if(res.code === 200){
            return '成功'
        }else{
            return Promise.reject(new Error("faile"))
        }
    },
    // 删除购物车商品
    async deleteCart(context,skuId){
        let res = await reqDeleteCart(skuId)
        if(res.code === 200){
            return '成功'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 改变全选
    changeAllChecked(context,isChecked){
        // isChecked = 1,全选
        // isChecked = 0,全不选
        let promiseAll = []
        context.getters.shopCartList.cartInfoList.forEach(item => {
            if(item.isChecked != isChecked){
                let res = context.dispatch("changeChecked",{skuID:item.skuId,isChecked})
                promiseAll.push(res)
            }
        })
        // 最终返回结果(全成功则成功，有一个失败则失败)
        return Promise.all(promiseAll)
    },
    // 删除所有选中的商品
    deleteAllChecked({dispatch,getters}){
        let promiseAll = []
        getters.shopCartList.cartInfoList.forEach(item => {
            if(item.isChecked === 1){
                let promise = dispatch("deleteCart",item.skuId)
                promiseAll.push(promise)
            }
        })
        // 最终返回结果(全成功则成功，有一个失败则失败)
        return Promise.all(promiseAll)
    }
}
const getters = {
    // 购物车商品信息
    shopCartList(state){
        return state.shopCartList[0] || {}
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
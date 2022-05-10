import { reqUserAddressInfo,reqOrderInfo,reqSubmitOrder } from "@/api"
// 订单小仓库
const state = () => {
    return {
        // 地址信息
        addressInfo:[],
        // 商品信息
        orderInfo:{},
        // 订单id
        orderId:''
    }
}
const mutations = {
    // 存储地址信息
    GETUSERADDRESSINFO(state,addressInfo){
        state.addressInfo = addressInfo
    },
    // 存储商品信息
    GETORDERINFO(state,orderInfo){
        state.orderInfo = orderInfo
    },
    // 存储订单id
    SUBMITORDER(state,orderId){
        state.orderId = orderId
    }
}
const actions = {
    // 发送请求获取地址信息
    async getUserAddressInfo({commit}){
        let res = await reqUserAddressInfo()
        if(res.code === 200){
            commit("GETUSERADDRESSINFO",res.data)
        }
    },
    // 发送请求获取订单页商品信息
    async getOrderInfo({commit}){
        let res = await reqOrderInfo()
        if(res.code === 200){
            commit("GETORDERINFO",res.data)
        }
    },
    // 提交订单
    async submitOrder({commit},{tradeNo,data}){
        let res = await reqSubmitOrder(tradeNo,data)
        if(res.code === 200){
            commit("SUBMITORDER",res.data)
            return '成功'
        }else{
            return Promise.reject(res.message)
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
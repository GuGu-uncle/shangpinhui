import { reqSearchList } from "@/api"

// search模块小仓库
const state = () => {
    return {
        // search搜索商品数据
        searchList: {}
    }
}
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
}
const actions = {
    // 发送请求获取搜索商品数据
    async getSearchList({commit}, params) {
        let res = await reqSearchList(params)
        if (res.code === 200) {
            commit("GETSEARCHLIST", res.data)
        }
    }
}
const getters = {
    // 参数数据
    attrsList(state) {
        return state.searchList.attrsList || []
    },
    // 商品列表数据
    goodsList(state) {
        return state.searchList.goodsList || []
    },
    // 品牌数据
    trademarkList(state) {
        return state.searchList.trademarkList || []
    },
}
export default {
    state,
    mutations,
    actions,
    getters
}
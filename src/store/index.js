import { createStore } from 'vuex'
// 引入小仓库
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'
import user from './user'
import trade from './trade'
export default createStore({
    modules:{
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
})
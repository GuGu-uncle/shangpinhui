// 对api进行统一管理

// 后端接口
import requests from './request'

// mock模拟数据接口
import mockRequest from './mockRequest'

// 首页三级联动接口
export const reqCategoryList = () => requests({url:'/product/getBaseCategoryList',method:'get'})
// search搜索商品(params至少是一个空对象)
export const reqSearchList = (params = {}) => requests({url:'/list',method:'post',data:params})
// detail商品详情
export const reqGoodsInfo = (skuId) => requests({url:`/item/${skuId}`,method:'get'})
// 加入购物车或者修改购物车商品数量
export const reqAddOrUpdateShopCart = (skuId,skuNum) => requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})
// 获取购物车信息
export const reqShopCartList = () => requests({url:'/cart/cartList',mothod:'get'})
// 改变购物车的商品选中
export const reqChangeChecked = (skuID,isChecked) => requests({url:`/cart/checkCart/${skuID}/${isChecked}`,method:'get'})
// 删除购物车商品
export const reqDeleteCart = (skuId) => requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})
// 获取验证码
export const reqGetCode = (phone) => requests({url:`/user/passport/sendCode/${phone}`,method:'get'})
// 注册用户
export const reqUserRegister = (params) => requests({url:'/user/passport/register',method:'post',data:params})
// 登录获取token
export const reqUserLogin = (params) => requests({url:'/user/passport/login',method:'post',data:params})
// 获取用户信息
export const reqUserInfo = () => requests({url:'user/passport/auth/getUserInfo',method:'get'})
// 退出登录
export const reqUserLogout = () => requests({url:'/user/passport/logout',method:'get'})
// 获取用户地址信息
export const reqUserAddressInfo = () => requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})
// 获取订单页商品信息
export const reqOrderInfo = () => requests({url:'/order/auth/trade',method:'get'})
// 提交订单
export const reqSubmitOrder = (tradeNo,data) => requests({url:`order/auth/submitOrder?tradeNo=${tradeNo}`,method:'post',data})
// 获取订单支付信息
export const reqGetPayInfo = (orderId) => requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})
// 获取订单支付状态
export const reqPayStatus = (orderId) => requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})
// 获取我的订单
export const reqMyOrderList = (page,limit) => requests({url:`/order/auth/${page}/${limit}`,method:'get'})


// 模拟数据
// 轮播图（Home首页轮播图接口）
export const reqBannerList = () => mockRequest({url:'/banners',method:'get'})
// floor数据接口
export const reqFloorList = () => mockRequest({url:'/floors',method:'get'})
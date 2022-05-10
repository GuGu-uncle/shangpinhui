<template>
  <div class="order-right">
    <div class="order-content">
      <div class="title">
        <h3>我的订单</h3>
      </div>
      <div class="chosetype">
        <table>
          <thead>
            <tr>
              <th width="29%">商品</th>
              <th width="31%">订单详情</th>
              <th width="13%">收货人</th>
              <th>金额</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="orders">
        <!-- 我的订单 -->
        <table class="order-item" v-for="myOrder in myOrderList.records" :key="myOrder.id">
          <thead>
            <tr>
              <th colspan="5">
                <span class="ordertitle">
                  {{myOrder.createTime}} 订单编号：{{myOrder.outTradeNo}}
                  <span class="pull-right delete">
                    <img src="../images/delete.png" />
                  </span>
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- 订单详情 -->
            <tr v-for="(orderDetail,index) in myOrder.orderDetailList" :key="orderDetail.skuId">
              <td width="60%">
                <div class="typographic">
                  <img :src="orderDetail.imgUrl" style="width:80px"/>
                  <a href="#" class="block-text">
                    {{orderDetail.skuName}}
                  </a>
                  <span>x{{orderDetail.skuNum}}</span>
                  <a href="#" class="service">售后申请</a>
                </div>
              </td>
              <td rowspan="2" v-if="index === 0" width="8%" class="center">{{myOrder.consignee}}</td>
              <td rowspan="2" v-if="index === 0" width="13%" class="center">
                <ul class="unstyled">
                  <li>总金额¥{{myOrder.totalAmount}}.00</li>
                  <li>在线支付</li>
                </ul>
              </td>
              <td rowspan="2" v-if="index === 0" width="8%" class="center">
                <a href="#" class="btn">{{myOrder.orderStatusName}} </a>
              </td>
              <td rowspan="2" v-if="index === 0" width="13%" class="center">
                <ul class="unstyled">
                  <li>
                    <a href="mycomment.html" target="_blank">评价|晒单</a>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 分页器 -->
      <Pagination 
        :pageNo="pageNo * 1" 
        :pageSize="pageSize *1" 
        :total="myOrderList.total *1" 
        :continues="3" 
        @getPageNo="getPageNo"
      />
    </div>
    <!--猜你喜欢-->
    <div class="like">
      <h4 class="kt">猜你喜欢</h4>
      <ul class="like-list">
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike01.png" />
          </div>
          <div class="attr">
            <em>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</em>
          </div>
          <div class="price">
            <em>¥</em>
            <i>3699.00</i>
          </div>
          <div class="commit">已有6人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike02.png" />
          </div>
          <div class="attr">Apple苹果iPhone 6s/6s Plus 16G 64G 128G</div>
          <div class="price">
            <em>¥</em>
            <i>4388.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike03.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike04.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {getCurrentInstance,onMounted,ref } from 'vue'
export default {
  name:'MyOrder',
  setup(){
    onMounted(() => {
      getData()
    })

    const {proxy} = getCurrentInstance()
    // api
    const API = proxy.$API
    // 页码
    const pageNo = ref("1")
    // 每页的数据条数
    const pageSize = ref("2")
    // 个人订单信息
    const myOrderList  = ref({})
    // 获取个人订单信息
    const getData = async () => {
      let res = await API.reqMyOrderList(pageNo.value,pageSize.value)
      if(res.code === 200){
        myOrderList.value = res.data
      }
    }
    const getPageNo = (page) => {
      pageNo.value = page + ''
      getData()
    }
    
    return {
      pageNo,
      pageSize,
      myOrderList,
      getPageNo
    }
  }
}
</script>

<style>
</style>
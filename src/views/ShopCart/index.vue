<template>
  <!-- 购物车 -->
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="cartInfo in cartInfoList"
          :key="cartInfo.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartInfo.isChecked === 1"
              @change="changeChecked(cartInfo)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl" />
            <div class="item-msg">{{ cartInfo.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cartInfo.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="changeSkuNum('reduce', cartInfo)"
              >-</a
            >
            <!-- 输入商品数量 -->
            <input
              autocomplete="off"
              type="text"
              :value="cartInfo.skuNum"
              minnum="1"
              class="itxt"
              @change="changeSkuNum('input', cartInfo, $event)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="changeSkuNum('plus', cartInfo)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartInfo.skuPrice * cartInfo.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:" class="sindelet" @click="deleteCart(cartInfo)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isCheckedAll" @change="changeAllChecked($event)" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:" @click="deleteAllChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link to="/trade" class="sum-btn">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex"
import { onMounted, computed } from "vue"
// 使输入的内容只能为正整数的方法
import handleNum from "@/utils/handleNum"
// 节流
import { throttle } from "lodash"
export default {
  name: "ShopCart",
  setup() {
    onMounted(() => {
      getData()
    })
    const getData = () => {
      // 发送请求获取购物车列表数据
      store.dispatch("getShopCartList")
    }

    const store = useStore()
    // 购物车列表数据
    const cartInfoList = computed(
      () => store.getters.shopCartList.cartInfoList || []
    )
    // 商品总价
    const totalPrice = computed(() => {
      let sum = 0
      cartInfoList.value.forEach((item) => {
        if(item.isChecked === 1) sum += item.skuPrice * item.skuNum
      })
      return sum
    })
    // 是否全选中
    const isCheckedAll = computed(() => {
      if(cartInfoList.value.length === 0) return false
      return cartInfoList.value.every((item) => item.isChecked === 1)
    })
    // 改变购物车商品数量的回调
    const changeSkuNum = throttle(async (type, cartInfo, event) => {
      // 商品数量变化的值
      let changeNum = 0
      switch (type) {
        case "reduce":
          // 如果当前数量大于1则数量减一
          cartInfo.skuNum > 1 ? (changeNum = -1) : ""
          break
        case "input":
          // 使输入的内容只能为正整数
          event.target.value = handleNum(event.target.value, cartInfo.skuNum)
          changeNum = event.target.value - cartInfo.skuNum
          break
        case "plus":
          // 数量加一
          changeNum = 1
          break
      }
      try {
        // changeNum不等于0时，发送请求修改购物车商品数量
        if(changeNum != 0){
          await store.dispatch("reqAddOrUpdateShopCart", {skuId: cartInfo.skuId,skuNum: changeNum})
          // 获取最新的数据
          getData()
        }
      } catch (error) {
        alert("修改失败")
      }
    }, 1000)
    // 改变商品选中的函数
    const changeChecked = async (cartInfo) => {
      let isChecked = cartInfo.isChecked === 1 ? '0' : '1'
      try {
        // 发送请求更改选中的状态
        await store.dispatch("changeChecked",{skuID:cartInfo.skuId,isChecked})
        // 获取最新的数据
        getData()
      } catch (error) {
        alert("修改失败")
      }
      
    }
    // 删除商品调用的函数
    const deleteCart = async (cartInfo) => {
      // 确认框
      if(confirm("确定要删除该商品吗？") === true){
        try {
          // 发送请求删除购物车中的商品
          await store.dispatch("deleteCart",cartInfo.skuId)
          // 发送请求更新数据
          getData()
        } catch (error) {
          alert("删除失败")
        }
      }
    }
    // 改变全选的函数
    const changeAllChecked = async (event) => {
      let isChecked = event.target.checked ? '1' : '0' 
      try {
        // 发送请求将所有商品全选中或者全不选中
        await store.dispatch("changeAllChecked",isChecked)
        // 发送请求获取更新后的数据
        getData()
      } catch (error) {
        alert("修改失败")
      }
    }
    // 删除所有选中的商品的函数
    const deleteAllChecked = async () => {
      if(confirm("是否要将所有选中的商品删除？") === true){
        try {
          // 发送请求删除选中的商品
          await store.dispatch("deleteAllChecked")
          // 更新数据
          getData()
        } catch (error) {
          alert(error.message)
        }
      }
    }

    return {
      cartInfoList,
      totalPrice,
      isCheckedAll,
      changeSkuNum,
      changeChecked,
      deleteCart,
      changeAllChecked,
      deleteAllChecked
    }
  },
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 20%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3 {
        width: 18%;
      }
      .cart-th4 {
        width: 12%;
      }
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 10%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 0%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 15%;
        }

        .cart-list-con5 {
          width: 15%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
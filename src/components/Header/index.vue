<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="!name">
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link class="register" to="/register">免费注册</router-link>
          </p>
          <p v-else>
            <a to="/login">{{name}}</a>
            <a class="register" @click="userLogout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center/myorder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button 
            class="sui-btn btn-xlarge btn-danger" 
            type="button"
            @click="goSearch()">
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import {ref,computed} from 'vue'
import {useRouter,useRoute} from 'vue-router'
import {useStore} from 'vuex'
// 引入事件总线
import emitter from '@/mybus'
export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    // 搜索框的内容
    let keyword = ref("")
    // 获取用户名
    const name = computed(() => store.state.user.userInfo.name)
    // 点击搜索按钮触发的函数
    function goSearch(){
      let info = {
        name:'search',
        params:{
          keyword:keyword.value
        }
      }
      if(route.query){
        info.query = route.query
      }
      // 路由跳转
      router.push(info)
    }
    // 通过全局事件总线将keyword置为空
    emitter.on('clearKeyword', () => {
      keyword.value = ''
    })
    // 用户点击退出登录时调用的函数
    const userLogout = () => {
      try{
        // 发送请求退出登录
        store.dispatch("userLogout")
        // 跳转至首页
        router.push('/home')
      } catch (error){
        alert(error.message)
      }
    }

    return {
      goSearch,
      keyword,
      name,
      userLogout
    } 
  }
};
</script>

<style scoped lang="less">
// 头部
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
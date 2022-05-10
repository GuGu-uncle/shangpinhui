<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <router-link to="/login">登陆</router-link>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input @change="handlePhone" type="text" name="phone" placeholder="请输入你的手机号" :value="phone">
        <span class="error-msg">{{ phoneError }}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input @change="handleCode" type="text" name="code"  placeholder="请输入验证码" :value="code">
        <button style="width:100px;height:38px;" @click="getCode">发送验证码</button>
        <span class="error-msg">{{ codeError }}</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input @change="handlePasswordOne" type="password" name="passwordOne" placeholder="请输入你的登录密码" :value="passwordOne">
        <span class="error-msg">{{ passwordOneError }}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input @change="handlePasswordTwo" type="password" name="passwordTwo" placeholder="请输入确认密码" :value="passwordTwo">
        <span class="error-msg">{{ passwordTwoError }}</span>
      </div>
      <div class="controls">
        <input @change="agree = !agree" name="agree" type="checkbox" :checked="agree">
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">{{ agreeError }}</span>
      </div>
      <div class="btn">
        <button @click="userRegister">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号
      </div>
    </div>
  </div>
</template>

<script>
  import {useStore} from 'vuex'
  import {useRouter} from 'vue-router'
  // 表单验证
  import { useForm, useField } from 'vee-validate'
  export default {
    name: 'Register',
    setup(){
      const store = useStore()
      const router = useRouter()
      // 表单验证
      const simpleSchema = {
        // 验证手机号
        phone(value) {
          if (/^1\d{10}$/.test(value)) {
            return true;
          }
          return '手机格式有问题'
        },
        // 验证验证码
        code(value) {
          if (/^\d{6}$/.test(value)) {
            return true;
          }
          return '验证码格式有问题'
        },
        // 验证密码
        passwordOne(value) {
          if (/^\w{8,20}$/.test(value)) {
            return true;
          }
          return '请输入8-20位密码(数字跟字母大小写）'
        },
        // 验证第二次输入的密码
        passwordTwo(value,{form}) {
          if (value === form.passwordOne) {
            return true;
          }
          return '两次输入的密码不一致'
        },
        // 验证是否同意协议
        agree(value) {
          if (value) {
            return true;
          }
          return '请勾选协议'
        },
      }
      const {meta} = useForm({
        validationSchema: simpleSchema,
      });
      const { value: phone, errorMessage: phoneError,handleChange:handlePhone } = useField('phone');
      const { value: code, errorMessage: codeError,handleChange:handleCode } = useField('code');
      const { value: passwordOne, errorMessage: passwordOneError,handleChange:handlePasswordOne } = useField('passwordOne');
      const { value: passwordTwo, errorMessage: passwordTwoError,handleChange:handlePasswordTwo } = useField('passwordTwo');
      const { value: agree, errorMessage: agreeError } = useField('agree');
      // 按发送验证码时调用的函数
      const getCode = async () => {
        // 手机号验证成功时发送请求获取验证码
        if(phone.value && !phoneError.value){
          try {
            await store.dispatch("getCode",phone.value)
            // 将验证码直接显示在验证码输入框内
            code.value = store.state.user.code
          } catch (error) {
            alert(error.message)
          }
        }
      }
      // 点击完成注册时调用的函数
      const userRegister = async () => {
        // 所有表单验证成功时发送请求
        if(meta.value.valid){
          try {
            // 发送注册用户请求
            await store.dispatch("userRegister",{
              phone:phone.value,
              password:passwordOne.value,
              code:code.value
            })
            // 跳转到登录页面
            router.push('/login')
          } catch (error) {
            alert(error.message)
          }
        }
      }

      return {
        phone,
        phoneError,
        handlePhone,
        code,
        codeError,
        handleCode,
        passwordOne,
        passwordOneError,
        handlePasswordOne,
        passwordTwo,
        passwordTwoError,
        handlePasswordTwo,
        agree,
        agreeError,
        getCode,
        userRegister,
      }
    }
  }
</script>

<style lang="less" scoped>
  .register-container {
    .register {
      width: 1200px;
      height: 445px;
      border: 1px solid rgb(223, 223, 223);
      margin: 0 auto;

      h3 {
        background: #ececec;
        margin: 0;
        padding: 6px 15px;
        color: #333;
        border-bottom: 1px solid #dfdfdf;
        font-size: 20.04px;
        line-height: 30.06px;

        span {
          font-size: 14px;
          float: right;

          a {
            color: #e1251b;
          }
        }
      }

      div:nth-of-type(1) {
        margin-top: 40px;
      }

      .content {
        padding-left: 390px;
        margin-bottom: 18px;
        position: relative;

        label {
          font-size: 14px;
          width: 96px;
          text-align: right;
          display: inline-block;
        }

        input {
          width: 270px;
          height: 38px;
          padding-left: 8px;
          box-sizing: border-box;
          margin-left: 5px;
          outline: none;
          border: 1px solid #999;
        }

        img {
          vertical-align: sub;
        }

        .error-msg {
          position: absolute;
          top: 100%;
          left: 495px;
          color: red;
        }
      }

      .controls {
        text-align: center;
        position: relative;

        input {
          vertical-align: middle;
        }

        .error-msg {
          position: absolute;
          top: 100%;
          left: 495px;
          color: red;
        }
      }

      .btn {
        text-align: center;
        line-height: 36px;
        margin: 17px 0 0 55px;

        button {
          outline: none;
          width: 270px;
          height: 36px;
          background: #e1251b;
          color: #fff !important;
          display: inline-block;
          font-size: 16px;
        }
      }
    }

    .copyright {
      width: 1200px;
      margin: 0 auto;
      text-align: center;
      line-height: 24px;

      ul {
        li {
          display: inline-block;
          border-right: 1px solid #e4e4e4;
          padding: 0 20px;
          margin: 15px 0;
        }
      }
    }
  }
</style>
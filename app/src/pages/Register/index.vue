<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input v-model="phone" name="phone" type="text" v-validate="{required:true,regex:/^1\d{10}$/}" :class="{invalid:errors.has('phone')}" placeholder="邮箱/用户名/手机号">
        <!-- <input v-model="phone" type="text" placeholder="请输入你的手机号"> -->
        <span class="error-msg">{{errors.first("phone")}}</span>
      </div>
      <!-- 需要进行表单验证 -->
      <div class="content">
        <label>验证码:</label>
        <!-- 需要添加name字段 以供vaildate.js匹配规则  v-validate指令中的required表示是否验证  regex表示正则表达式  -->
        <input v-model="code" name="code" type="text" v-validate="{required:true,regex:/^\d{6}$/}" :class="{invalid:errors.has('code')}" placeholder="请输入验证码">
        <button @click="getCode(phone)" style="width: 100px;height: 38px;">获取验证码</button>
        <span class="error-msg">{{errors.first("code")}}</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input v-model="passWord" name="password" type="text" v-validate="{required:true,regex:/^[0-9A-Za-z]{8,20}$/}" :class="{invalid:errors.has('password')}" placeholder="请输入你的登录密码">
        <span class="error-msg">{{errors.first("password")}}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input v-model="surePassWord" name="password1" type="text" v-validate="{required:true,is:passWord}" :class="{invalid:errors.has('password1')}" placeholder="请输入确认密码">
        <span class="error-msg">{{errors.first("password1")}}</span>
      </div>
      <div class="controls">
        <input type="checkbox" name="agree" v-validate="{required:true,tongyi:true}" :class="{invalid:errors.has('agree')}"  :checked="agree" @change="agreeRegister">
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">{{errors.first('agree')}}</span>
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
export default {
  name: 'Register',
  data() {
    return {
      // 手机号
      phone: '',
      // 验证码
      code: '',
      passWord: '',
      surePassWord: '',
      agree:true
    }
  },
  methods: {
    async getCode(phone) {
      try {
        phone && await this.$store.dispatch('getCode', phone);
        // 正常情况无需修改表单的值  等待用户填写 然后将填写的验证码发送到后端进行验证即可
        this.code = this.$store.state.user.code;
        console.log('验证码是' + this.$store.state.user.code);

      } catch (error) {

      }
    },
    async userRegister() {
      // 如果验证成功 那么则会返回成功
      const success = await this.$validator.validateAll();
      if(success){
        const { phone, code, passWord, surePassWord ,agree} = this;
      try {
        (phone && code && agree &&passWord === surePassWord) && await this.$store.dispatch('userRegister', { phone, code, password: passWord });
        this.$router.push({
          name:'login'
        });
      } catch (error) {
        console.log(error.message);
      }
      }

    },
    agreeRegister(event){
      this.agree = event.target.checked
    }
  },

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
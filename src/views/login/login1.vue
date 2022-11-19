<template>
  <div class="login" :style="'background-image:url(' + Background + ');'">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
      <h3 class="title">供应商管理系统</h3>
      <el-tag v-if="error" type="danger" class="w100p f14 h40 lh40 mb20">{{ error }}</el-tag>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="用户名">
          <svg-icon slot="prefix" icon-class="user" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" show-password auto-complete="off" placeholder="密码">
          <svg-icon slot="prefix" icon-class="password" />
        </el-input>
      </el-form-item>
      <el-form-item prop="kaptcha">
        <el-input v-model="loginForm.kaptcha" auto-complete="off" placeholder="验证码" style="width: 190px">
          <svg-icon slot="prefix" icon-class="photo" />
        </el-input>
        <div class="login-code">
          <img :src="kaptchaUrl" @click="getKaptcha" title="点击刷新验证码" />
        </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin: 0 0 25px 0">记住我</el-checkbox>
      <el-form-item style="width: 100%">
        <el-button :loading="loading" size="medium" type="primary" style="width: 100%" @click.native.prevent="handleLogin">
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import Background from '@/assets/background.jpg'
export default {
  name: 'Login',
  data() {
    return {
      Background: Background,
      kaptchaUrl: process.env.VUE_APP_SUPPLIER_API + '/kaptcha.jpg',
      cookiePass: '',
      loginForm: {
        username: '',
        password: '',
        rememberMe: false,
        kaptcha: '',
        uuid: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
        password: [{ required: true, trigger: 'blur', message: '密码不能为空' }],
        kaptcha: [{ required: true, trigger: 'blur', message: '验证码不能为空' }]
      },
      error: '',
      loading: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    // 获取验证码
    this.getKaptcha()
    // 获取用户名密码等Cookie
    this.getCookie()
  },
  methods: {
    getKaptcha() {
      //this.loginForm.kaptcha = ''
      this.$set(this.loginForm, 'kaptcha', '')
      this.kaptchaUrl = process.env.VUE_APP_SUPPLIER_API + '/kaptcha.jpg?' + Math.random()
    },
    getCookie() {
      const username = Cookies.get('username')
      let password = Cookies.get('password')
      const rememberMe = Cookies.get('rememberMe')
      // 保存cookie里面的加密后的密码
      this.cookiePass = password === undefined ? '' : password
      password = password === undefined ? this.loginForm.password : password
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password,
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true

          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.loading = false
              this.$router.push({ path: this.redirect || '/' })
            })
            .catch(({ response }) => {
              this.error = response.data.message
              this.loading = false
              this.getKaptcha()
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 点击回车键登录
    keyDown(e) {
      if (e.keyCode == 13 || e.keyCode == 100) {
        this.handleLogin()
      }
    }
  },
  mounted() {
    // 绑定监听事件
    window.addEventListener('keydown', this.keyDown)
  },
  destroyed() {
    // 销毁事件
    window.removeEventListener('keydown', this.keyDown, false)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-size: cover;
}
.title {
  margin: 0 auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 385px;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  display: inline-block;
  height: 38px;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
</style>

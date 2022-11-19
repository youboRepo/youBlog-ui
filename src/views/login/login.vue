<template>
    <div class="top">
        <div class="box">
		<form autocomplete="off">
			<h2>Sign in</h2>
			<div class="inputBox">
				<input v-model="loginForm.username" type="text" required="required">
				<span>UserName</span>
				<i></i>
			</div>
			<div class="inputBox">
				<input v-model="loginForm.password" type="password" required="required">
				<span>Password</span>
				<i></i>
			</div>
            <div>
                
                <input v-model="loginForm.kaptcha" type="text" required="required">
                <div class="login-code">
                    <img :src="kaptchaUrl" @click="getKaptcha" title="点击刷新验证码" />
                </div>
			</div>
			<div class="links">
				<a href="#">Forgot Password ?</a>
				<a href="#">Signup</a>
			</div>
			<input type="submit" value="Login">
		</form>
	</div>
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

<style>
/* 引入需要的字体 */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'Poppins', sans-serif;
}

body {
	display: flex;
	justify-content: center !important;
	align-items: center !important;
	min-height: 100vh;
	flex-direction: column;
	background: #23242a;
}

.box {
    top: 50%;
    margin-top: 200px;
	position: relative;
	width: 380px;
	height: 480px;
	background: #1c1c1c;
	border-radius: 8px;
	overflow: hidden;
}

.box::before {
	content: '';
	z-index: 1;
	position: absolute;
	top: -50%;
	left: -50%;
	width: 380px;
	height: 420px;
	transform-origin: bottom right;
	background: linear-gradient(0deg, transparent, #45f3ff, #45f3ff);
	animation: animate 6s linear infinite;
}

.box::after {
	content: '';
	z-index: 1;
	position: absolute;
	top: -50%;
	left: -50%;
	width: 380px;
	height: 420px;
	transform-origin: bottom right;
	background: linear-gradient(0deg, transparent, #45f3ff, #45f3ff);
	animation: animate 6s linear infinite;
	animation-delay: -3s;
}

@keyframes animate {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}

form {
	position: absolute;
	inset: 2px;
	background: #28292d;
	padding: 50px 40px;
	border-radius: 8px;
	z-index: 2;
	display: flex;
	flex-direction: column;
}

h2 {
	color: #45f3ff;
	font-weight: 500;
	text-align: center;
	letter-spacing: 0.1em;
}

.inputBox {
	position: relative;
	width: 300px;
	margin-top: 35px;
}

.inputBox input {
	position: relative;
	width: 100%;
	padding: 20px 10px 10px;
	background: transparent;
	outline: none;
	box-shadow: none;
	border: none;
	color: #23242a;
	font-size: 1em;
	letter-spacing: 0.05em;
	transition: 0.5s;
	z-index: 10;
}

.inputBox span {
	position: absolute;
	left: 0;
	padding: 20px 0px 10px;
	pointer-events: none;
	font-size: 1em;
	color: #8f8f8f;
	letter-spacing: 0.05em;
	transition: 0.5s;
}

.inputBox input:valid~span,
.inputBox input:focus~span {
	color: #45f3ff;
	transform: translateX(0px) translateY(-34px);
	font-size: 0.75em;
}

.inputBox i {
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 2px;
	background: #45f3ff;
	border-radius: 4px;
	overflow: hidden;
	transition: 0.5s;
	pointer-events: none;
	z-index: 9;
}

.inputBox input:valid~i,
.inputBox input:focus~i {
	height: 44px;
}

.links {
	display: flex;
	justify-content: space-between;
}

.links a {
	margin: 10px 0;
	font-size: 0.75em;
	color: #8f8f8f;
	text-decoration: beige;
}

.links a:hover,
.links a:nth-child(2) {
	color: #45f3ff;
}

input[type="submit"] {
	border: none;
	outline: none;
	padding: 11px 25px;
	background: #45f3ff;
	cursor: pointer;
	border-radius: 4px;
	font-weight: 600;
	width: 100px;
	margin-top: 10px;
}

input[type="submit"]:active {
	opacity: 0.8;
}
</style>
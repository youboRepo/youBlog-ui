<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <search id="header-search" class="right-menu-item" />

        <error-log class="errLog-container right-menu-item hover-effect" />

        <screenfull id="screenfull" class="right-menu-item hover-effect" />

        <el-tooltip content="布局大小" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>
      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" />
          <span class="user-info">
            {{ $store.state.user.name == undefined ? $store.state.user.username : $store.state.user.name }}
            <i class="el-icon-caret-bottom" />
          </span>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item v-if="$store.state.user.userType == 1" @click.native="toUserInfo">个人信息</el-dropdown-item>
          <el-dropdown-item v-if="$store.state.user.userType == 1" @click.native="toUpdatePassword">修改密码</el-dropdown-item>
          <el-dropdown-item v-if="$store.state.user.isSwitchUser" @click.native="logoutSwitch">退出切换</el-dropdown-item>
          <el-dropdown-item v-else @click.native="dialogVisible.switchUser = true">切换用户</el-dropdown-item>
          <a v-for="link in links" :key="link.name" target="_blank" :href="link.href">
            <el-dropdown-item>{{ link.name }}</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!-- 切换用户 -->
    <switch-user-dialog :visible.sync="dialogVisible.switchUser" />

    <!-- 个人信息 -->
    <el-dialog title="个人信息" :visible.sync="dialogVisible.userInfo" :modal="false" width="420px">
      <el-form ref="userForm" :model="user" label-width="80px">
        <el-form-item label="供应商号" prop="supplierNumber">
          <el-input v-model="user.supplierNumber" disabled />
        </el-form-item>
        <el-form-item label="登录账号" prop="username">
          <el-input v-model="user.username" disabled />
        </el-form-item>
        <el-form-item label="用户姓名" prop="name">
          <el-input v-model="user.name" />
        </el-form-item>
        <el-form-item label="联系方式" prop="contactQq">
          <el-input v-model="user.contactQq" />
        </el-form-item>
      </el-form>
      <dialog-footer slot="footer" @submit="userInfo" />
    </el-dialog>

    <!-- 修改密码 -->
    <el-dialog title="修改密码" :visible.sync="dialogVisible.updatePassword" :modal="false" width="420px">
      <el-form ref="updatePasswordForm" :model="user" label-width="80px">
        <el-form-item label="当前密码" prop="currentPassword" :verify="verifyCurrentPassword">
          <el-input v-model="user.currentPassword" type="password" placeholder="请输入当前密码" auto-complete="off" />
        </el-form-item>
        <el-form-item label="重置密码" prop="password" :verify="verifyPassword">
          <el-input v-model="user.password" type="password" placeholder="请输入重置密码" auto-complete="off" />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword" :verify="verifyConfirmPassword">
          <el-input v-model="user.confirmPassword" type="password" placeholder="请输入确认密码" auto-complete="off" />
        </el-form-item>
      </el-form>
      <dialog-footer slot="footer" @submit="updatePassword" />
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'
import { links } from '@/settings'
import { getUser, updateUser, updatePassword, verifyPassword } from '@/api/user/user'
import { logoutSwitch } from '@/api/common'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    Search
  },
  data() {
    return {
      links,
      user: {
        id: undefined,
        name: '',
        contactQq: '',
        currentPassword: '',
        password: '',
        confirmPassword: ''
      },
      dialogVisible: {
        userInfo: false,
        updatePassword: false,
        switchUser: false
      }
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'device'])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout').then(logoutUrl => {
        window.location.href = logoutUrl
      })
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    // 退出切换按钮
    logoutSwitch() {
      logoutSwitch().then(() => {
        location.reload()
      })
    },
    // 个人信息按钮
    toUserInfo() {
      getUser(this.$store.state.user.userId).then(({ data }) => {
        this.user = data
      })
      this.dialogVisible.userInfo = true
    },
    // 个人信息提交
    userInfo() {
      this.$refs.userForm.validate().then(() => {
        updateUser(this.user).then(() => {
          this.$success('修改成功')
        })
      })
    },
    // 修改密码按钮
    toUpdatePassword() {
      this.dialogVisible.updatePassword = true
      this.$nextTick(() => {
        this.$refs.updatePasswordForm.resetFields()
      })
    },
    // 修改密码提交
    updatePassword() {
      this.$refs.updatePasswordForm.validate().then(() => {
        const { id, password } = this.user
        updatePassword(id, password).then(() => {
          this.dialogVisible.updatePassword = false
          this.$success('修改成功')
        })
      })
    },
    // 校验当前密码
    verifyCurrentPassword(rule, value, callback) {
      verifyPassword(this.$store.state.user.userId, value).then(({ data }) => {
        if (data) {
          callback(new Error(data))
        } else {
          callback()
        }
      })
    },
    // 校验登录密码
    verifyPassword(rule, value, callback) {
      var regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[#@!~%^&*;]).{8,20}$/
      if (!regex.test(value)) {
        callback(new Error('密码必须包含数字、字母、特殊字符(#@!~%^&*;)，长度8-20之间'))
      } else {
        callback()
      }
    },
    // 校验确认密码
    verifyConfirmPassword(rule, value, callback) {
      if (value !== this.user.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 5px;
      padding-right: 0;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        cursor: pointer;
        height: 45px;
        font-size: 14px;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .user-info {
          display: inline-block;
          vertical-align: super;
        }
      }
    }
  }
}
</style>

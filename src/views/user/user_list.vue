<template>
  <div>
    <!-- 搜索表单 -->
    <search-form :model="query" @search="getUserPageList">
      <search-form-item label="登录账号" prop="likeUsername">
        <el-input v-model="query.likeUsername" clearable placeholder="模糊查询请输入登录账号" />
      </search-form-item>
      <search-form-item label="用户姓名" prop="likeName">
        <el-input v-model="query.likeName" clearable placeholder="模糊查询请输入用户姓名" />
      </search-form-item>
      <search-form-item label="供应商号" prop="likeSupplierNumber">
        <el-input v-model="query.likeSupplierNumber" clearable placeholder="模糊查询请输入供应商号" />
      </search-form-item>
      <search-form-item label="联系方式" prop="likeContactQq">
        <el-input v-model="query.likeContactQq" clearable placeholder="模糊查询请输入用联系方式" />
      </search-form-item>
      <search-form-item label="备注信息" prop="likeRemark">
        <el-input v-model="query.likeRemark" clearable placeholder="模糊查询请输入用备注信息" />
      </search-form-item>
      <search-form-item label="用户角色" prop="roleId">
        <el-select v-model="query.roleId" clearable filterable class="w100p" placeholder="查询请选择用户角色">
          <el-option v-for="item in dataSource.roles" :key="item.id" :value="item.id" :label="item.roleName" />
        </el-select>
      </search-form-item>
      <search-form-item label="是否可用" prop="enabled">
        <el-select v-model="query.enabled" clearable class="w100p" placeholder="查询请选择是否可用">
          <el-option :value="true" label="可用" />
          <el-option :value="false" label="禁用" />
        </el-select>
      </search-form-item>
      <search-form-item label="是否锁定" prop="isLock">
        <el-select v-model="query.isLock" clearable class="w100p" placeholder="查询请选择是否锁定">
          <el-option :value="true" label="锁定" />
          <el-option :value="false" label="未锁" />
        </el-select>
      </search-form-item>
      <template v-slot:toolbar>
        <el-button v-permission="['15030200']" type="primary" icon="el-icon-plus" @click="toCreateUser">添加</el-button>
        <el-dropdown trigger="click">
          <el-button>
            批量操作
            <i class="el-icon-arrow-down el-icon--right" />
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-permission="['15031100']" @click.native="dialogVisible.importUser = true">批量导入用户</el-dropdown-item>
            <el-dropdown-item v-permission="['15030500']" @click.native="toAddUserRole">批量添加角色</el-dropdown-item>
            <el-dropdown-item v-permission="['15030500']" @click.native="toDeleteUserRole">批量删除角色</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </search-form>

    <!-- 数据表格 -->
    <data-table ref="dataTable" v-loading="dataLoading" :data="page.records" row-key="userId" stripe>
      <el-table-column prop="username" label="登录账号" />
      <el-table-column prop="name" label="用户姓名" />
      <el-table-column prop="supplierNumber" label="供应商号" />
      <el-table-column prop="roleNameJson" label="用户角色" />
      <el-table-column prop="contactQq" label="联系方式" />
      <el-table-column prop="remark" label="备注信息" />
      <switch-column prop="enabled" label="是否可用" :change="updateEnabled" width="80" />
      <switch-column prop="isLock" label="是否锁定" :change="updateIsLock" width="80" />
      <action-column text="编辑" @click="toUpdateUser" :disabled="$unauth('15030300')">
        <template v-slot="{ row }">
          <el-dropdown-item v-permission="['15030500']" @click.native="toUpdatePassword(row)">修改密码</el-dropdown-item>
          <el-dropdown-item @click.native="businessId = row.id">查看日志</el-dropdown-item>
        </template>
      </action-column>
    </data-table>

    <!-- 分页控件 -->
    <page :total="page.total" :size.sync="query.size" :current.sync="query.current" @change="getUserPageList" />

    <!-- 查看日志 -->
    <view-log module="Login" :business-id.sync="businessId" />

    <!-- 数据表单 -->
    <el-dialog :title="isUpdate ? '编辑用户' : '添加用户'" :visible.sync="dialogVisible.user" width="550px">
      <el-form ref="submitForm" :model="user" label-width="80px">
        <el-form-item label="登录账号" prop="username" :verify="verifyUsername">
          <el-input v-model.trim="user.username" placeholder="请输入登录账号" :disabled="isUpdate" auto-complete="off" />
        </el-form-item>
        <el-form-item v-if="!isUpdate" label="登录密码" prop="password" :verify="verifyPassword">
          <el-input v-model="user.password" type="password" placeholder="请输入登录密码" :disabled="defaultPassword" auto-complete="off">
            <template slot="append">
              <el-checkbox v-model="defaultPassword" title="默认密码，同登录账号" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item v-if="!isUpdate" label="确认密码" prop="confirmPassword" :verify="verifyConfirmPassword">
          <el-input v-model="user.confirmPassword" type="password" placeholder="请输入确认密码" :disabled="defaultPassword" auto-complete="off" />
        </el-form-item>
        <el-form-item label="用户姓名" prop="name">
          <el-input v-model.trim="user.name" placeholder="请输入用户姓名" />
        </el-form-item>
        <el-form-item v-if="user.userType == 1 || !isUpdate" label="供应商号" prop="supplierNumber" :verify="verifySupplierNumber">
          <el-input v-model.trim="user.supplierNumber" placeholder="请输入供应商号" :disabled="isUpdate" />
        </el-form-item>
        <el-form-item label="联系方式" prop="contactQq">
          <el-input v-model="user.contactQq" placeholder="请输入联系方式" />
        </el-form-item>
        <el-form-item label="备注信息" prop="remark">
          <el-input v-model="user.remark" placeholder="请输入备注信息" />
        </el-form-item>
        <el-form-item label="用户角色" prop="roleIds">
          <el-select v-model="user.roleIds" clearable multiple class="w100p" placeholder="请选择用户角色">
            <el-option v-for="item in dataSource.roles" :key="item.id" :value="item.id" :label="item.roleName" />
          </el-select>
        </el-form-item>
      </el-form>
      <dialog-footer slot="footer" @submit="isUpdate ? updateUser() : createUser()" />
    </el-dialog>

    <!-- 修改密码 -->
    <el-dialog title="修改密码" :visible.sync="dialogVisible.updatePassword" width="420px">
      <el-form ref="updatePasswordForm" :model="user" label-width="80px">
        <el-form-item label="登录密码" prop="password" :verify="verifyPassword">
          <el-input v-model="user.password" type="password" placeholder="请输入登录密码" auto-complete="off" />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword" :verify="verifyConfirmPassword">
          <el-input v-model="user.confirmPassword" type="password" placeholder="请输入确认密码" auto-complete="off" />
        </el-form-item>
      </el-form>
      <dialog-footer slot="footer" @submit="updatePassword" />
    </el-dialog>

    <!-- 导入用户 -->
    <import-dialog title="导入用户" :visible.sync="dialogVisible.importUser" :action="action" accept=".xlsx" @success="getUserPageList">
      <el-link class="ml10" type="primary" href="/supplier/file/UserTemplate.xlsx" target="_blank">下载导入模板</el-link>
    </import-dialog>

    <!-- 添加角色 -->
    <el-dialog title="添加角色" :visible.sync="dialogVisible.addUserRole" width="30%">
      <el-select v-model="user.roleIds" clearable filterable multiple class="w100p" placeholder="请选择用户角色">
        <el-option v-for="role in dataSource.roles" :key="role.id" :value="role.id" :label="role.roleName" />
      </el-select>
      <dialog-footer slot="footer" @submit="addUserRole" />
    </el-dialog>

    <!-- 删除角色 -->
    <el-dialog title="删除角色" :visible.sync="dialogVisible.deleteUserRole" width="30%">
      <el-select v-model="user.roleIds" clearable filterable multiple class="w100p" placeholder="请选择用户角色">
        <el-option v-for="role in dataSource.roles" :key="role.id" :value="role.id" :label="role.roleName" />
      </el-select>
      <dialog-footer slot="footer" @submit="deleteUserRole" />
    </el-dialog>
  </div>
</template>

<script>
import {
  getUserPageList,
  getUser,
  createUser,
  updateUser,
  updateEnabled,
  updateIsLock,
  updatePassword,
  createUserRole,
  deleteUserRole,
  verifyUsername,
  verifySupplierNumber
} from '@/api/user/user'
import { getRoleList } from '@/api/user/role'

export default {
  name: 'UserList',
  data() {
    return {
      dataLoading: true,
      page: { records: [], total: 0 },
      query: {
        size: 10,
        current: 1,
        likeName: '',
        likeUsername: '',
        likeSupplierNumber: '',
        likeContactQq: '',
        likeRemark: '',
        roleId: undefined,
        enabled: undefined,
        isLock: undefined
      },
      user: {
        id: undefined,
        username: '',
        password: '',
        confirmPassword: '',
        name: '',
        supplierNumber: '',
        contactQq: '',
        remark: '',
        roleIds: []
      },
      dialogVisible: {
        user: false,
        updatePassword: false,
        importUser: false,
        addUserRole: false,
        deleteUserRole: false
      },
      dataSource: {
        roles: []
      },
      businessId: undefined,
      isUpdate: false,
      defaultPassword: false,
      action: process.env.VUE_APP_SUPPLIER_API + '/users/import'
    }
  },
  created() {
    // 获取用户列表
    this.getUserPageList()

    // 获取角色列表
    getRoleList({}).then(({ data }) => {
      this.dataSource.roles = data
    })
  },
  methods: {
    // 获取用户列表
    getUserPageList() {
      this.dataLoading = true
      getUserPageList(this.query).then(({ data }) => {
        this.page = data
        this.dataLoading = false
      })
    },
    // 创建用户按钮
    toCreateUser() {
      this.isUpdate = false
      this.defaultPassword = false
      this.dialogVisible.user = true
      this.$nextTick(() => {
        this.$refs.submitForm.resetFields()
      })
    },
    // 创建用户提交
    createUser() {
      // 使用默认密码
      if (this.defaultPassword) {
        this.user.password = this.user.username
        this.user.confirmPassword = this.user.username
      }

      this.$refs.submitForm.validate().then(() => {
        createUser(this.user).then(() => {
          this.dialogVisible.user = false
          this.$success('创建成功')
          this.getUserPageList()
        })
      })
    },
    // 修改用户按钮
    toUpdateUser(rwo) {
      getUser(rwo.id).then(({ data }) => {
        this.user = data
      })
      this.isUpdate = true
      this.defaultPassword = false
      this.dialogVisible.user = true
      this.$nextTick(() => {
        this.$refs.submitForm.clearValidate()
      })
    },
    // 修改用户提交
    updateUser() {
      this.$refs.submitForm.validate().then(() => {
        updateUser(this.user).then(() => {
          this.dialogVisible.user = false
          this.$success('修改成功')
          this.getUserPageList()
        })
      })
    },
    // 修改是否可用
    updateEnabled(enabled, row) {
      return updateEnabled(row.id, enabled)
    },
    // 修改是否锁定
    updateIsLock(isLock, row) {
      return updateIsLock(row.id, isLock)
    },
    // 修改密码按钮
    toUpdatePassword(row) {
      this.defaultPassword = false
      this.dialogVisible.updatePassword = true
      this.user = { ...row }
      this.user.password = ''
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
    // 添加角色按钮
    toAddUserRole() {
      if (this.$refs.dataTable.selection.length === 0) {
        this.$warning('请选择操作数据')
        return
      }
      this.user.roleIds = []
      this.dialogVisible.addUserRole = true
    },
    // 添加角色提交
    addUserRole() {
      const userRoles = []
      this.$refs.dataTable.selection.forEach(({ id }) => {
        this.user.roleIds.forEach(roleId => {
          userRoles.push({ userId: id, roleId })
        })
      })
      createUserRole(userRoles).then(() => {
        this.dialogVisible.addUserRole = false
        this.$success('添加成功')
        this.getUserPageList()
      })
    },
    // 删除角色按钮
    toDeleteUserRole() {
      if (this.$refs.dataTable.selection.length === 0) {
        this.$warning('请选择操作数据')
        return
      }
      this.user.roleIds = []
      this.dialogVisible.deleteUserRole = true
    },
    // 删除角色提交
    deleteUserRole() {
      const userRoles = []
      this.$refs.dataTable.selection.forEach(({ id }) => {
        this.user.roleIds.forEach(roleId => {
          userRoles.push({ userId: id, roleId })
        })
      })
      deleteUserRole(userRoles).then(() => {
        this.dialogVisible.deleteUserRole = false
        this.$success('删除成功')
        this.getUserPageList()
      })
    },
    // 校验登录账号
    verifyUsername(rule, value, callback) {
      if (this.isUpdate) {
        callback()
      } else {
        verifyUsername(value).then(({ data }) => {
          if (data) {
            callback(new Error(data))
          } else {
            callback()
          }
        })
      }
    },
    // 校验登录密码
    verifyPassword(rule, value, callback) {
      // 使用默认密码
      if (this.defaultPassword) {
        callback()
      }

      var regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[#@!~%^&*;]).{8,20}$/
      if (!regex.test(value)) {
        callback(new Error('密码必须包含数字、字母、特殊字符(#@!~%^&*;)，长度8-20之间'))
      } else {
        callback()
      }
    },
    // 校验确认密码
    verifyConfirmPassword(rule, value, callback) {
      // 使用默认密码
      if (this.defaultPassword) {
        callback()
      }

      if (value !== this.user.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    },
    // 校验供应商号
    verifySupplierNumber(rule, value, callback) {
      if (this.isUpdate) {
        callback()
      } else {
        verifySupplierNumber(value).then(({ data }) => {
          if (data) {
            callback(new Error(data))
          } else {
            callback()
          }
        })
      }
    }
  }
}
</script>

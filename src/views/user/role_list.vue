<template>
  <div>
    <!-- 搜索表单 -->
    <search-form :model="query" @search="getRolePageList" tableRef>
      <search-form-item label="角色名字" prop="likeRoleName">
        <el-input v-model="query.likeRoleName" clearable placeholder="模糊查询请输入角色名字" />
      </search-form-item>
      <search-form-item label="登录账号" prop="likeUsername">
        <el-input v-model="query.likeUsername" clearable placeholder="模糊查询请输入用户名" />
      </search-form-item>
      <search-form-item label="权限代码" prop="permissionCodes">
        <tree-select v-model="query.permissionCodes" :options="dataSource.authPermissionTree" multiple :limit="1"
          leaf-priority placeholder="查询请选择权限代码" />
      </search-form-item>

      <template v-slot:toolbar>
        <el-button type="primary" :disabled="$unauth('15020200')" icon="el-icon-plus" @click="toCreateRole">添加</el-button>
      </template>
    </search-form>

    <!-- 数据表格 -->
    <data-table ref="dataTable" v-loading="dataLoading" :data="page.records" stripe>
      <el-table-column prop="id" label="角色编号" width="100" />
      <el-table-column prop="roleName" label="角色名字" width="100" />
      <el-table-column prop="usernameJoin" label="登录账号" show-overflow-tooltip />
      <el-table-column prop="remark" label="备注信息" width="100" />
      <el-table-column prop="createByName" label="创建人" width="100" />
      <el-table-column prop="createTime" label="创建时间" width="100" />
      <el-table-column prop="updateByName" label="修改人" width="100" />
      <el-table-column prop="updateTime" label="修改时间" width="100" />
      <action-column text="编辑" :disabled="$unauth('15020300')" @click="toUpdateRole">
        <template v-slot="{ row }">
          <el-dropdown-item :disabled="$unauth('15020400')" @click.native="deleteRole(row.id)">删除</el-dropdown-item>
          <el-dropdown-item @click.native="businessId = row.id">查看日志</el-dropdown-item>
        </template>
      </action-column>
    </data-table>

    <!-- 分页控件 -->
    <page :total="page.total" :size.sync="query.size" :current.sync="query.current" @change="getRolePageList" />

    <!-- 查看日志 -->
    <view-log module="ROLE" :business-id.sync="businessId" />

    <!-- 数据表单 -->
    <el-dialog :title="isUpdate ? '编辑角色' : '添加角色'" :visible.sync="dialogVisible.createUpdate" width="950px">
      <el-form ref="submitForm" :model="role" label-width="80px">
        <el-form-item label="角色名字" prop="roleName">
          <el-input v-model.trim="role.roleName" placeholder="请输入角色名字" />
        </el-form-item>
        <el-form-item label="备注信息" prop="remark">
          <el-input v-model="role.remark" placeholder="请输入备注信息" />
        </el-form-item>
        <el-form-item label="角色权限">
          <el-input v-model="filterText" placeholder="输入权限名称过滤" />
          <el-scrollbar class="mt10 b1s br4" wrap-class="h400">
            <el-tree ref="permissionTree" :data="dataSource.authPermissionTree"
              :default-checked-keys="role.permissionCodes" node-key="id" :filter-node-method="filterNode" show-checkbox>
              <span slot-scope="{ node, data }">
                <template v-if="node.isLeaf">
                  <svg-icon v-if="data.id.indexOf('_') != -1" icon-class="data" />
                  <svg-icon v-else icon-class="operate" />
                </template>
                <template v-else>
                  <svg-icon v-if="node.expanded" icon-class="folder-open" />
                  <svg-icon v-else icon-class="folder" />
                </template>
                {{ node.label }}
                {{ data.id }}
              </span>
            </el-tree>
          </el-scrollbar>
        </el-form-item>
      </el-form>
      <dialog-footer slot="footer" @submit="isUpdate ? updateRole() : createRole()" />
    </el-dialog>
  </div>
</template>

<script>
import { getRolePageList, getRole, createRole, updateRole, deleteRole } from '@/api/user/role'
import { getAuthPermissionTree } from '@/api/user/permission.js'

export default {
  name: 'RoleList',
  props: {
    permissionCodes: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      dataLoading: true,
      page: { records: [], total: 0 },
      query: {
        size: 10,
        current: 1,
        likeRoleName: '',
        likeUsername: '',
        permissionCodes: []
      },
      role: {
        id: undefined,
        roleName: '',
        remark: '',
        permissionCodes: []
      },
      dialogVisible: {
        createUpdate: false
      },
      dataSource: {
        authPermissionTree: []
      },
      isUpdate: false,
      businessId: undefined,
      filterText: ''
    }
  },
  created() {
    // 获取角色列表
    this.getRolePageList()

    // 获取有权权限
    getAuthPermissionTree().then(({ data }) => {
      this.dataSource.authPermissionTree = data
    })
  },
  activated() { },
  watch: {
    filterText(value) {
      this.ids = []
      this.$refs.authPermissionTree.filter(value)
    }
  },
  methods: {
    // 获取角色列表
    getRolePageList() {
      this.dataLoading = true
      getRolePageList(this.query).then(({ data }) => {
        this.page = data
        this.dataLoading = false
      })
    },
    // 创建角色按钮
    toCreateRole() {
      this.isUpdate = false
      this.dialogVisible.createUpdate = true
      this.$nextTick(() => {
        this.$refs.permissionTree.setCheckedKeys([])
        this.$refs.submitForm.resetFields()
      })
    },
    // 创建角色提交
    createRole() {
      this.$refs.submitForm.validate().then(() => {
        // 获取选中权限列表
        this.role.permissionCodes = this.$refs.permissionTree.getCheckedNodes(false, true).map(v => v.id)
        createRole(this.role).then(() => {
          this.dialogVisible.createUpdate = false
          this.$success('创建成功')
          this.getRolePageList()
        })
      })
    },
    // 修改角色按钮
    toUpdateRole(rwo) {
      getRole(rwo.id).then(({ data }) => {
        this.$nextTick(() => {
          this.$refs.permissionTree.setCheckedKeys(data.permissionCodes)
        })
        this.role = data
      })
      this.isUpdate = true
      this.dialogVisible.createUpdate = true
      this.$nextTick(() => {
        this.$refs.submitForm.clearValidate()
      })
    },
    // 修改角色提交
    updateRole() {
      this.$refs.submitForm.validate().then(() => {
        this.role.permissionCodes = this.$refs.permissionTree.getCheckedNodes(false, true).map(v => v.id)
        updateRole(this.role).then(() => {
          this.dialogVisible.createUpdate = false
          // 获取选中权限列表
          this.$success('修改成功')
          this.getRolePageList()
        })
      })
    },
    // 删除角色提交
    deleteRole(id) {
      this.$$confirm('确认删除？').then(() => {
        deleteRole(id).then(() => {
          this.$success('删除成功')
          this.getRolePageList()
        })
      })
    },
    // 过滤节点
    filterNode(value, data) {
      if (!value) {
        return true
      }
      if (this.ids.indexOf(data.pid) !== -1 || data.label.indexOf(value) !== -1) {
        this.ids.push(data.id)
        return true
      }
      return false
    }
  }
}
</script>

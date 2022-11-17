<template>
  <div>
    <el-scrollbar class="left-block" wrap-class="oxh">
      <el-tree
        ref="permissionTree"
        :data="permissionTree"
        highlight-current
        :expand-on-click-node="false"
        :props="{ label: 'permissionName' }"
        :default-expanded-keys="[1]"
        node-key="permissionCode"
        @node-click="toUpdatePermission"
      >
        <span slot-scope="{ node }" class="el-tree-node__label">
          {{ node.label }}
          <i v-if="node.level < 3" class="el-icon-plus ml5" v-permission="['15010200']" title="添加权限" @click.stop="toCreatePermission(node.data.permissionCode)" />
          <i v-if="node.isLeaf" class="el-icon-delete ml5" v-permission="['15010400']" title="删除权限" @click.stop="deletePermission(node.data.id)" />
        </span>
      </el-tree>
    </el-scrollbar>
    <el-form v-if="permission" ref="submitForm" class="right-block" :model="permission" label-width="100px">
      <el-form-item label="父类标识" prop="parentId">
        <el-input v-model="permission.parentId" :disabled="true" />
      </el-form-item>
      <el-form-item label="权限名字" prop="permissionName" verify>
        <el-input v-model="permission.permissionName" maxlength="32" />
      </el-form-item>
      <el-form-item label="权限代码" prop="permissionCode" verify>
        <el-input v-model="permission.permissionCode" maxlength="8" />
      </el-form-item>
      <el-form-item label="分配类型" prop="assignType" verify>
        <el-radio-group v-model="permission.assignType">
          <el-radio :label="1">角色</el-radio>
          <el-radio :label="2">用户</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="资源类型" prop="resourceType" verify>
        <el-radio-group v-model="permission.resourceType">
          <el-radio :label="1">菜单</el-radio>
          <el-radio :label="2">权限</el-radio>
        </el-radio-group>
      </el-form-item>
      <submit-button v-permission="['15010300']" @submit="submitPermission" />
    </el-form>
  </div>
</template>

<script>
import { getPermissionList, createPermission, updatePermission, deletePermission } from '@/api/user/permission.js'

export default {
  name: 'PermissionTree',
  data() {
    return {
      permissionTree: [],
      permission: undefined
    }
  },
  created() {
    // 获取权限列表
    getPermissionList().then(({ data }) => {
      this.permissionTree = this.$toTree(data, {
        id: 'permissionCode',
        pid: 'parentId'
      })
    })
  },
  methods: {
    // 创建权限按钮
    toCreatePermission(parentId) {
      this.permission = { parentId }
    },
    // 修改权限按钮
    toUpdatePermission(data, node) {
      if (node.level === 1) {
        this.permission = undefined
      } else {
        this.permission = { ...data }
      }
    },
    // 提交权限按钮
    submitPermission() {
      this.$refs.submitForm.validate().then(() => {
        if (this.permission.id) {
          updatePermission(this.permission).then(() => {
            this.$success('修改成功')
          })
        } else {
          createPermission(this.permission).then(({ data }) => {
            this.$refs.permissionTree.append(data, data.parentId)
            this.$success('创建成功')
          })
        }
      })
    },
    // 删除权限提交
    deletePermission(id) {
      this.$$confirm('确认删除该权限？').then(() => {
        deletePermission(id).then(() => {
          this.$success('删除成功')
          const node = this.$refs.permissionTree.getNode(id)
          this.$refs.permissionTree.remove(node)
          if (this.permission && this.permission.id === id) {
            this.permission = undefined
          }
        })
      })
    }
  }
}
</script>

<style scoped>
.left-block {
  position: absolute;
  top: 70px;
  bottom: 88px;
  left: 20px;
  width: 300px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
.left-block div.el-tree-node__content i {
  display: none;
}
.left-block div.el-tree-node__content:hover i {
  display: inline-block;
}
.right-block {
  padding-left: 300px;
}
</style>

<template>
  <el-dialog title="切换用户" :visible.sync="dialogVisible" append-to-body width="380px" @open="init">
    <el-select v-model="username" clearable filterable remote :remote-method="remoteMethod" class="w100p" placeholder="请选择用户">
      <el-option v-for="(value, key) in userMap" :key="key" :value="key" :label="value" />
    </el-select>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { switchUser, getSwitchUserMap } from '@/api/common'

export default {
  name: 'SwitchUserDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      username: '',
      userMap: {}
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible
      },
      set(visible) {
        this.$emit('update:visible', visible)
      }
    }
  },
  methods: {
    init() {
      this.username = ''
      this.remoteMethod()
    },
    handleSubmit() {
      if (this.username == null || this.username == '') {
        this.$warning('请选择要切换的用户')
        return
      }
      switchUser(this.username).then(() => {
        location.reload()
      })
    },
    remoteMethod(keyword) {
      getSwitchUserMap(keyword).then(({ data }) => {
        this.userMap = data
      })
    }
  }
}
</script>
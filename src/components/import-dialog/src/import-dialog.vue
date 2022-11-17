<template>
  <el-dialog class="import-dialog" :title="title" :visible.sync="dialogVisible" width="30%">
    <el-upload v-bind="{ action, data, multiple, accept, limit }" :on-success="handleSuccess" :on-error="handleError">
      <el-button slot="trigger" type="primary">选择文件</el-button>
      <slot></slot>
    </el-upload>
  </el-dialog>
</template>

<script>
export default {
  name: 'ImportDialog',
  props: {
    title: {
      required: true,
      type: String
    },
    visible: Boolean,
    action: {
      required: true,
      type: String
    },
    data: Object,
    multiple: {
      type: Boolean,
      default: true
    },
    accept: String,
    limit: {
      type: Number,
      default: 100
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
    // 处理成功
    handleSuccess(response, file, fileList) {
      if (response.code == 20000) {
        this.$message.success('导入成功')
        this.$emit('success', response, file, fileList)
        return
      }
      this.$message.error(response.message)
      this.$emit('error', file, fileList)
    },
    // 处理错误
    handleError(error, file, fileList) {
      this.$message.error('上传失败')
      this.$emit('error', file, fileList)
    }
  }
}
</script>

<style lang="scss" scoped>
.import-dialog ::v-deep .el-dialog {
  .el-upload-list {
    height: 360px;
    margin-top: 10px;
    overflow-y: auto;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    .el-upload-list__item:first-child {
      margin-top: 0;
    }
  }
}
</style>
<template>
  <div class="dialog-footer">
    <div class="left">
      <slot></slot>
    </div>
    <el-button @click="handleCancel">取消</el-button>
    <el-button type="primary" @click="handleSubmit">确定</el-button>
  </div>
</template>

<script>
export default {
  name: 'DialogFooter',
  methods: {
    handleSubmit() {
      this.$emit('submit')
    },
    handleCancel() {
      this.$parent.hide()
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped>
.left {
  float: left;
}
</style>
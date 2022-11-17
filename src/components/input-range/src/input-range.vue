<template>
  <el-row class="input-range" :gutter="4">
    <el-col :span="12">
      <el-input v-model="value[0]" placeholder="开始值" />
    </el-col>
    <el-col :span="12">
      <el-input v-model="value[1]" placeholder="结束值" />
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'InputRange',
  props: {
    value: Array
  }
}
</script>

<style scoped>
.input-range {
  clear: both;
}
</style>
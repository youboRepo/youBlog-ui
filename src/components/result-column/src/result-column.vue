<template>
  <el-table-column label="操作结果" class-name="p0i" :width="width" :filters="filters" :filter-method="filterMethod">
    <template slot-scope="{ row: { result, message } }">
      <el-alert v-if="result == 0" title="等待操作" :closable="false" />
      <el-alert v-else-if="result == 1" type="warning" title="正在操作" :closable="false" />
      <el-alert v-else-if="result == 2" type="success" title="操作成功" :closable="false" />
      <template v-else-if="result == 3">
        <div v-if="message" title="点击显示详细错误">
          <el-popover :content="message" :disabled="!message">
            <el-alert slot="reference" type="error" title="操作失败" :closable="false" />
          </el-popover>
        </div>
        <el-alert v-else type="error" title="操作失败" :closable="false" />
      </template>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: 'ResultColumn',
  props: {
    width: {
      type: [Number, String],
      default: 100
    }
  },
  computed: {
    filters() {
      let successCount = 0
      let dangerCount = 0
      const data = this.$parent.data
      if (data) {
        successCount = data.filter(item => item.result == 2).length
        dangerCount = data.filter(item => item.result == 3).length
      }
      return [
        { value: 2, text: '成功' + successCount },
        { value: 3, text: '失败' + dangerCount }
      ]
    }
  },
  methods: {
    filterMethod(value, row) {
      return row.result == value
    }
  }
}
</script>

<style scoped>
.el-alert {
  padding: 8px 4px;
}
.el-popover__reference {
  cursor: pointer;
}
</style>
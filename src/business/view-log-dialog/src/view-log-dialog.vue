<template>
  <el-dialog title="查看日志" :visible.sync="visible">
    <el-table :data="logs" height="500" size="small" stripe border highlight-current-row>
      <el-table-column prop="creationDate" label="时间" width="200" />
      <el-table-column prop="operatorName" label="操作人" width="160" />
      <el-table-column prop="content" label="内容">
        <template slot-scope="{ row }">
          <pre>{{ row.content }}</pre>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
import { getOperationLogList } from '@/api/common'

export default {
  name: 'ViewLogDialog',
  props: {
    module: String,
    businessId: Number
  },
  data() {
    return {
      logs: []
    }
  },
  computed: {
    visible: {
      get() {
        return this.module != null && this.businessId != null
      },
      set() {
        this.logs = []
        this.$emit('update:businessId')
      }
    }
  },
  watch: {
    businessId() {
      if (this.businessId) {
        getOperationLogList(this.module, this.businessId).then(({ data }) => {
          this.logs = data
        })
      }
    }
  }
}
</script>

<style scoped>
pre {
  white-space: pre-wrap;
  margin: 0;
}
</style>
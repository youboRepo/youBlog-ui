<template>
  <el-dialog title="查看日志" :visible.sync="visible" @open="init">
    <el-table :data="logs" size="small" height="500" stripe border highlight-current-row>
      <el-table-column prop="operatorName" label="操作用户" width="120" show-overflow-tooltip />
      <el-table-column prop="createTime" label="操作时间" width="160" show-overflow-tooltip />
      <el-table-column prop="content" label="操作内容">
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
  name: 'ViewLog',
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
        this.$emit('update:businessId')
      }
    }
  },
  methods: {
    init() {
      this.logs = []
      getOperationLogList(this.module, this.businessId).then(({ data }) => {
        this.logs = data
      })
    }
  }
}
</script>

<style scoped>
pre {
  margin: 0;
  white-space: pre-wrap;
}
</style>
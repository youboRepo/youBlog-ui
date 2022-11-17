<template>
  <!-- 数据表格 -->
  <data-table ref="dataTable" v-loading="dataLoading" :data="page.records" stripe>
    <el-table-column prop="id" label="用户标识" />
    <el-table-column prop="username" label="用户名字" />
    <el-table-column prop="supplierId" label="供应商标识" />
    <el-table-column prop="supplierNumber" label="供应商号" />
    <el-table-column prop="loginTime" label="登陆时间" />
  </data-table>
</template>

<script>
import { getOnlineUserList } from '@/api/system/online_user'

export default {
  name: 'OnlineUserList',
  data() {
    return {
      dataLoading: true,
      page: { records: [], total: 0 }
    }
  },
  created() {
    this.getOnlineUserList()
  },
  methods: {
    getOnlineUserList() {
      this.dataLoading = true
      getOnlineUserList().then(({ data }) => {
        this.page.records = data
        this.dataLoading = false
      })
    }
  }
}
</script>

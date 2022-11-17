<template>
  <el-date-picker class="date-range" type="daterange" v-bind="{ value, valueFormat, startPlaceholder, endPlaceholder }" @input="update" :picker-options="usePickerOptions && pickerOptions" />
</template>

<script>
export default {
  name: 'DateRange',
  props: {
    value: Array,
    valueFormat: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    startPlaceholder: {
      type: String,
      default: '开始日期'
    },
    endPlaceholder: {
      type: String,
      default: '结束日期'
    },
    usePickerOptions: {
      type: Boolean,
      default: false
    },
    pickerOptions: {
      type: Object,
      default: () => ({
        shortcuts: [{
          text: '本月',
          onClick(picker) {
            const now = new Date()
            const end = new Date(now.getFullYear(), now.getMonth(), now.getDate())
            const start = new Date(end.getFullYear(), end.getMonth(), 1)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近7天',
          onClick(picker) {
            const now = new Date()
            const end = new Date(now.getFullYear(), now.getMonth(), now.getDate())
            const start = new Date(end.getTime() - 1000 * 3600 * 24 * 6);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近30天',
          onClick(picker) {
            const now = new Date()
            const end = new Date(now.getFullYear(), now.getMonth(), now.getDate())
            const start = new Date(end.getTime() - 1000 * 3600 * 24 * 29);
            picker.$emit('pick', [start, end]);
          }
        }]
      })
    }
  },
  methods: {
    update(value) {
      this.$emit('input', value || [])
    }
  }
}
</script>

<style scoped>
.search-form .date-range {
  width: 100%;
}
</style>
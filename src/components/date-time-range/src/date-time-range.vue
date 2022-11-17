<template>
  <el-date-picker class="date-time-range" type="datetimerange" v-bind="{ value, valueFormat, startPlaceholder, endPlaceholder, defaultTime }" @input="update" />
</template>

<script>
export default {
  name: 'DateTimeRange',
  props: {
    value: Array,
    valueFormat: {
      type: String,
      default: 'yyyy-MM-dd HH:mm:ss'
    },
    startPlaceholder: {
      type: String,
      default: '开始时间'
    },
    endPlaceholder: {
      type: String,
      default: '结束时间'
    },
    defaultTime: {
      type: Array,
      default() {
        return ['00:00:00', '23:59:59']
      }
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
.search-form .date-time-range {
  width: 100%;
}
</style>
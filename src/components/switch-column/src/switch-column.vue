<template>
  <el-table-column v-bind="{ prop, label, width }">
    <template slot-scope="{ row }">
      <el-switch v-model="row[prop]" :disabled="disabled" @change="handleChange($event, row)" />
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: 'SwitchColumn',
  props: {
    prop: {
      required: true,
      type: String
    },
    label: String,
    width: [Number, String],
    disabled: Boolean,
    change: Function
  },
  methods: {
    handleChange(value, row) {
      if (!this.change) return
      const response = this.change(value, row)
      if (response instanceof Promise) {
        response.then(() => {
          this.$message.success('切换成功')
          this.$emit('success')
        })
        response.catch(() => {
          setTimeout(() => {
            row[this.prop] = !value
          }, 500)
          this.$emit('error')
        })
      }
    }
  }
}
</script>
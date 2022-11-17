<template>
  <el-table-column v-bind="{ prop, label, width }">
    <template slot-scope="{ row }">
      <el-link :href="href | replace(row)" type="primary" target="_blank">
        {{ row[prop] }}
      </el-link>
      <slot :row="row" />
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: 'LinkColumn',
  props: {
    prop: {
      required: true,
      type: String
    },
    label: String,
    width: [Number, String],
    href: {
      required: true,
      type: String
    }
  },
  filters: {
    replace(value, row) {
      for (let key in row) {
        value = value.replace(new RegExp('{' + key + '}', 'g'), row[key])
      }
      return value
    }
  }
}
</script>
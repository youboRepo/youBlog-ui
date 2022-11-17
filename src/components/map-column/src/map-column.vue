<template>
  <el-table-column v-bind="{ prop, label, width, showOverflowTooltip }">
    <template slot-scope="{ row }">
      {{ map[row[prop]] || defaultValue }}
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: 'MapColumn',
  props: {
    prop: {
      required: true,
      type: String
    },
    label: String,
    map: {
      type: Object,
      default: () => {
        return {}
      }
    },
    defaultValue: String,
    width: [Number, String],
    showOverflowTooltip: Boolean
  }
}
</script>
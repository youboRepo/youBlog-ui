<template>
  <el-table-column v-bind="{ prop, label, align, sortable, width }">
    <template slot-scope="{ row }">
      <span>{{ row[prop] | rounding(scale) }}</span>
      <span v-if="currency" class="ml4">{{ row[currency] }}</span>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: 'NumberColumn',
  props: {
    prop: {
      required: true,
      type: String
    },
    label: String,
    width: [Number, String],
    align: String,
    sortable: [Boolean, String],
    scale: {
      type: Number,
      default: 2
    },
    currency: String
  },
  filters: {
    rounding(value, scale) {
      return value && value.toFixed(scale)
    }
  }
}
</script>
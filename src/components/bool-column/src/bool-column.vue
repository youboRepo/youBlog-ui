<template>
  <el-table-column :prop="prop" :label="label" :width="width">
    <template slot-scope="{ row }">
      {{ row[prop] ? trueLabel : falseLabel }}
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: 'BoolColumn',
  props: {
    prop: {
      required: true,
      type: String
    },
    label: String,
    trueLabel: {
      type: String,
      default: '是'
    },
    falseLabel: {
      type: String,
      default: '否'
    },
    width: [Number, String]
  }
}
</script>
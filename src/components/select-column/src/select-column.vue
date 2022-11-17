<template>
  <el-table-column :prop="prop" :label="label" :width="width">
    <template slot-scope="{ row }">
      <el-select v-model="row[prop]">
        <slot>
          <el-option :value="true" :label="trueLabel" />
          <el-option :value="false" :label="falseLabel" />
        </slot>
      </el-select>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: 'SelectColumn',
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
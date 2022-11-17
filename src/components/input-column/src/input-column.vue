<template>
  <el-table-column :prop="prop" :label="label" :width="width" :min-width="minWidth">
    <template slot-scope="{ row }">
      <el-input v-model="row[prop]" v-bind="$attrs">
        <template slot="append">
          <slot name="append" :row="row"></slot>
        </template>
      </el-input>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: 'InputColumn',
  inheritAttrs: false,
  props: {
    prop: {
      required: true,
      type: String
    },
    label: String,
    width: [Number, String],
    minWidth: [Number, String]
  }
}
</script>
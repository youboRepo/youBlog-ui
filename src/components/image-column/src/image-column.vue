<template>
  <el-table-column :prop="prop" :label="label" :width="width" class-name="image">
    <template slot-scope="{ row }">
      <el-image :style="{ width: width + 'px', height: width + 'px' }" :src="[row[prop]].flat()[0]" :preview-src-list="[row[previewProp || prop]].flat()" lazy />
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: 'ImageColumn',
  props: {
    prop: {
      required: true,
      type: String
    },
    label: String,
    width: {
      type: [Number, String],
      default: 100
    },
    previewProp: String
  }
}
</script>

<style scoped>
td.image .el-image {
  display: block;
}
td.image .el-image ::v-deep img {
  transition: all 0.2s linear;
}
td.image .el-image ::v-deep img:hover {
  transform: scale(1.1, 1.1);
  filter: contrast(130%);
}
</style>
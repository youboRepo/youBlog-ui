<template>
  <div>
    <el-scrollbar class="left-tree" wrap-class="oxh">
      <el-tree ref="tree" v-bind="{ data, nodeKey, expandOnClickNode, defaultExpandedKeys, highlightCurrent, props: { label } }" @node-click="handleNodeClick">
        <template #default="slotProps">
          <span class="el-tree-node__label">
            {{ slotProps.node.label }}
            <slot name="node" v-bind="slotProps" />
          </span>
        </template>
      </el-tree>
    </el-scrollbar>
    <div v-if="editable" class="right-form">
      <slot />
    </div>
    <submit-button @submit="handleSubmit" :disabled="!editable">
      <template #left>
        <slot name="button" />
      </template>
    </submit-button>
  </div>
</template>

<script>
export default {
  name: 'TreeLayout',
  props: {
    data: Array,
    nodeKey: String,
    expandOnClickNode: {
      type: Boolean,
      default: true
    },
    defaultExpandedKeys: Array,
    highlightCurrent: {
      type: Boolean,
      default: true
    },
    label: String,
    editable: Boolean
  },
  methods: {
    handleNodeClick(data, node) {
      this.$emit('node-click', data, node)
    },
    handleSubmit() {
      this.$emit('submit')
    }
  }
}
</script>

<style scoped>
.left-tree {
  position: absolute;
  top: 70px;
  bottom: 88px;
  left: 20px;
  width: 300px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
.right-form {
  margin-left: 310px;
}
</style>
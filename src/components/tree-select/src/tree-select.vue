<template>
  <treeselect v-bind="{ value, valueConsistsOf, normalizer, noOptionsText, ...$attrs }" :class="{ ellipsis }" @input="update" />
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  name: 'TreeSelect',
  components: { Treeselect },
  inheritAttrs: false,
  props: {
    value: null,
    all: Boolean,
    leafPriority: Boolean,
    allWithIndeterminate: Boolean,
    idKey: String,
    labelKey: String,
    childrenKey: String,
    isDisabled: Boolean,
    noOptionsText: {
      type: String,
      default: '没有可用的选项'
    }
  },
  computed: {
    valueConsistsOf() {
      if (this.all) {
        return 'ALL'
      }
      if (this.leafPriority) {
        return 'LEAF_PRIORITY'
      }
      if (this.allWithIndeterminate) {
        return 'ALL_WITH_INDETERMINATE'
      }
      return undefined
    },
    ellipsis() {
      return this.multiple && this.value && this.value.length > 1
    }
  },
  methods: {
    update(value, instanceId) {
      this.$emit('input', value, instanceId)
    },
    normalizer(node) {
      const { idKey, labelKey, childrenKey, isDisabled } = this
      if (idKey || labelKey || childrenKey) {
        return {
          id: node[idKey || 'id'],
          label: node[labelKey || 'label'],
          children: node[childrenKey || 'children'],
          isDisabled
        }
      }
      return { ...node, isDisabled }
    }
  }
}
</script>

<style scoped>
.vue-treeselect ::v-deep .vue-treeselect__multi-value {
  height: 27px;
  overflow: hidden;
}
.vue-treeselect ::v-deep .vue-treeselect__multi-value-label {
  white-space: nowrap;
}
.ellipsis ::v-deep .vue-treeselect__multi-value-label {
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 100px;
}
</style>
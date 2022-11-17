<template>
  <el-cascader v-bind="{ key, value, options, showAllLevels, ...$attrs }" :props="{ emitPath, multiple }" class="w100p" @input="input" @change="change" />
</template>

<script>
export default {
  name: 'Cascader',
  inheritAttrs: false,
  props: {
    value: {},
    options: {
      required: true,
      type: Array
    },
    showAllLevels: {
      type: Boolean,
      default: false
    },
    emitPath: {
      type: Boolean,
      default: false
    },
    multiple: Boolean
  },
  data() {
    return {
      key: 0
    }
  },
  watch: {
    options() {
      this.key++
    }
  },
  methods: {
    input(value) {
      this.$emit('input', value)
    },
    change(value) {
      this.$emit('change', value)
    }
  }
}
</script>
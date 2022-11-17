<template>
  <el-row v-bind="{ gutter, type, style }">
    <slot />
  </el-row>
</template>

<script>
export default {
  name: 'Row',
  props: {
    gutter: Number,
    type: String
  },
  computed: {
    style() {
      const style = {}
      if (this.type == 'flex') {
        style['flex-wrap'] = 'wrap'
        if (this.gutter) {
          style['row-gap'] = this.gutter + 'px'
        }
      }
      return style
    }
  }
}
</script>

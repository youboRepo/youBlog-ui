<template>
  <i class="el-icon-d-arrow-right" :class="{ expand }" :title="expand ? '全部折叠' : '全部展开'" @click="handleSwitch" />
</template>

<script>
export default {
  name: 'ExpandIcon',
  props: {
    expand: {
      type: Boolean,
      default: true
    },
    keep: String
  },
  created() {
    const keep = this.keep
    if (keep) {
      const expand = this.$cache.get(keep)
      if (expand != null) {
        this.$emit('update:expand', expand)
      }
    }
  },
  methods: {
    handleSwitch() {
      const expand = !this.expand
      this.$emit('update:expand', expand)
      this.$emit('switch', expand)

      const keep = this.keep
      if (keep) {
        this.$cache.set(keep, expand)
      }
    }
  }
}
</script>

<style scoped>
i {
  font-weight: bold;
  cursor: pointer;
}
i:hover {
  font-size: larger;
}
.expand {
  transform: rotate(90deg);
}
</style>
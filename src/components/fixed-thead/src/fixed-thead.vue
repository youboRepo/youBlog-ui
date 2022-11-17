<template>
  <div :class="{ 'fixed-thead': fixed }">
    <slot></slot>
    <el-backtop v-if="backtop" :bottom="90" :right="22" />
  </div>
</template>

<script>
export default {
  name: 'FixedThead',
  props: {
    backtop: [Boolean]
  },
  data() {
    return {
      fixed: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.fixed = document.documentElement.scrollTop > this.$el.offsetTop
    }
  }
}
</script>

<style scoped>
.fixed-thead ::v-deep .el-table__header-wrapper {
  position: fixed;
  z-index: 9;
  top: 0;
  border-top: 1px solid #ebeef5;
}
.fixed-header + .app-main .fixed-thead ::v-deep .el-table__header-wrapper {
  top: 50px;
}
.hasTagsView .app-main .fixed-thead ::v-deep .el-table__header-wrapper {
  top: 84px;
}
</style>
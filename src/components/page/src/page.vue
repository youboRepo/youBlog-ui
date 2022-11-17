<template>
  <div class="page">
    <el-pagination
      :class="{ 'fixed-page': fixed }"
      background
      :layout="layout"
      :pager-count="pagerCount"
      :page-sizes="sizes"
      :total="total"
      :page-size.sync="pageSize"
      :current-page.sync="currentPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
      <slot />
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Page',
  props: {
    total: {
      required: true,
      type: Number
    },
    size: {
      type: Number,
      default: 10
    },
    current: {
      type: Number,
      default: 1
    },
    sizes: {
      type: Array,
      default() {
        return [10, 30, 50, 100, 300, 500, 1000]
      }
    },
    fixed: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    layout() {
      if (this.$isMobile()) {
        return 'prev, pager, next'
      }
      return 'total, sizes, prev, pager, next, jumper, slot'
    },
    pagerCount() {
      if (this.$isMobile()) {
        return 5
      }
      return 7
    },
    pageSize: {
      get() {
        return this.size
      },
      set(size) {
        this.$emit('update:size', size)
      }
    },
    currentPage: {
      get() {
        return this.current
      },
      set(current) {
        this.$emit('update:current', current)
      }
    }
  },
  methods: {
    handleSizeChange(size) {
      this.$emit('change', { current: this.currentPage, size: size })
    },
    handleCurrentChange(current) {
      this.$emit('change', { current: current, size: this.pageSize })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';

.page {
  height: 68px;
}
.page ::v-deep .el-pagination > slot {
  display: inline-block;
  position: absolute;
  right: 20px;
  font-weight: normal;
}
.fixed-page {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  padding-left: 20px;
}
.hideSidebar .fixed-page {
  width: calc(100% - 54px);
}
.mobile .fixed-page {
  width: 100%;
}
</style>
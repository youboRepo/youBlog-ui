<template>
  <div :class="{ 'fixed-thead': fixed && scroll }">
    <el-table ref="table" v-bind="{ data, rowKey, border, highlightCurrentRow, ...$attrs }" :stripe="stripe == undefined ? !expand : stripe" class="data-table" :class="{ expand }">
      <el-table-column v-if="rowKey" :prop="rowKey" type="selection" width="51" />
      <slot />
    </el-table>
    <el-backtop v-if="backtop" :bottom="90" :right="22" />
  </div>
</template>

<script>
export default {
  name: 'DataTable',
  inheritAttrs: false,
  props: {
    data: {
      required: true,
      type: Array
    },
    rowKey: String,
    border: {
      type: Boolean,
      default: true
    },
    highlightCurrentRow: {
      type: Boolean,
      default: true
    },
    stripe: {
      type: Boolean,
      default: undefined
    },
    expand: Boolean,
    fixed: {
      type: Boolean,
      default: true
    },
    backtop: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      scroll: false
    }
  },
  computed: {
    selection() {
      return this.$refs.table.selection
    },
    columns() {
      return this.$refs.table.columns
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.scroll = document.documentElement.scrollTop > this.$el.offsetTop
    },
    toggleRowSelection(row) {
      this.$refs.table.toggleRowSelection(row)
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
  width: auto;
}
.fixed-toolbar + .fixed-thead ::v-deep .el-table__header-wrapper {
  top: 50px;
}
.fixed-header + .app-main .fixed-thead ::v-deep .el-table__header-wrapper {
  top: 50px;
}
.fixed-header + .app-main .fixed-toolbar + .fixed-thead ::v-deep .el-table__header-wrapper {
  top: 100px;
}
.hasTagsView .fixed-header + .app-main .fixed-thead ::v-deep .el-table__header-wrapper {
  top: 84px;
}
.hasTagsView .fixed-header + .app-main .fixed-toolbar + .fixed-thead ::v-deep .el-table__header-wrapper {
  top: 134px;
}
</style>
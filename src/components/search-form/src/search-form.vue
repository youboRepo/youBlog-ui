<template>
  <el-form ref="searchForm" class="search-form" :class="{ 'fixed-toolbar': fixed && scroll }" :model="model" @submit.native.prevent>
    <el-row :gutter="20" class="mb20">
      <slot></slot>
    </el-row>
    <div class="toolbar">
      <div>
        <el-button v-if="tableRef" @click="reverse">反选</el-button>
        <slot name="toolbar"></slot>
      </div>
      <div>
        <el-button type="primary" native-type="submit" icon="el-icon-search" @click="search" :disabled="disabled">搜索</el-button>
        <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
      </div>
    </div>
  </el-form>
</template>

<script>
export default {
  name: 'SearchForm',
  props: {
    model: {
      required: true,
      type: Object
    },
    tableRef: {
      type: [String, Boolean],
      default: 'dataTable'
    },
    disabled: Boolean,
    fixed: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      scroll: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    // 搜索按钮
    search() {
      this.$refs.searchForm.validate().then(() => {
        this.model.current = 1
        this.$emit('search')
      })
    },
    // 重置按钮
    reset() {
      this.$refs.searchForm.resetFields()
      this.$emit('reset')
    },
    // 反选按钮
    reverse() {
      const tableRef = this.$parent.$refs[this.tableRef]
      if (tableRef) {
        const column = tableRef.columns.find(c => {
          return c.selectable != null
        })
        tableRef.data.forEach(row => {
          if (!column || column.selectable(row)) {
            tableRef.toggleRowSelection(row)
          }
        })
      }
      this.$emit('reverse')
    },
    // 处理滚动
    handleScroll() {
      if (this.$el.offsetHeight > 0) {
        this.scroll = document.documentElement.scrollTop > this.$el.offsetTop + this.$el.offsetHeight - 60
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';

.toolbar {
  display: flex;
  justify-content: space-between;
}
.mobile .toolbar {
  flex-direction: column-reverse;
}
.mobile .toolbar > div:first-child {
  margin-top: 20px;
}
.fixed-toolbar .toolbar {
  position: fixed;
  top: 0;
  right: 20px;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth} - 40px);
  transition: width 0.28s;
  background: #fff;
  border-top: 1px solid #ebeef5;
  padding-top: 5px;
  padding-bottom: 5px;
}
.hideSidebar .fixed-toolbar .toolbar {
  width: calc(100% - 54px - 40px);
}
.mobile .fixed-toolbar .toolbar {
  width: calc(100% - 40px);
}
.fixed-header + .app-main .fixed-toolbar .toolbar {
  top: 50px;
}
.hasTagsView .fixed-header + .app-main .fixed-toolbar .toolbar {
  top: 84px;
}
</style>
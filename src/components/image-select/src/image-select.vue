<template>
  <el-dialog v-el-drag-dialog :title="title" :visible.sync="dialogVisible" :width="width" append-to-body @opened="handleOpen">
    <div v-if="search" class="search">
      <el-input ref="input" v-model="input" placeholder="请输入条件搜索" @keyup.enter.native="handleSearch" />
      <el-button type="primary" @click="handleSearch">搜索</el-button>
    </div>
    <el-scrollbar>
      <ul>
        <li v-for="image in images" :key="image.url" :class="{ check: image.check }">
          <el-image :src="image.url" @click="handleSelect(image)" />
          <label v-show="image.check">
            <i class="el-icon-check" />
          </label>
        </li>
      </ul>
    </el-scrollbar>
    <dialog-footer v-if="multiple" slot="footer" @submit="handleSubmit" />
  </el-dialog>
</template>

<script>
import { get } from '@/api/common'

export default {
  name: 'ImageSelect',
  props: {
    title: {
      type: String,
      default: '选择图片'
    },
    visible: Boolean,
    width: {
      type: String,
      default: '690px'
    },
    url: {
      required: true,
      type: String
    },
    params: Object,
    multiple: Boolean,
    search: String,
    limit: Number
  },
  data() {
    return {
      input: '',
      images: []
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible
      },
      set(visible) {
        this.$emit('update:visible', visible)
      }
    }
  },
  methods: {
    handleOpen() {
      this.images = []
      this.getImageUrl(this.url, this.params)
      if (this.search) {
        this.input = ''
        this.$refs.input.focus()
      }
    },
    handleSearch() {
      const input = this.input
      if (input) {
        this.images = []
        this.getImageUrl(this.url, { [this.search]: input })
      } else {
        this.$message.error('请输入条件搜索')
      }
    },
    handleSelect(image) {
      if (this.multiple) {
        // 存在限制
        // 当前未选
        // 超过限制
        const limit = this.limit
        const checks = this.images.filter(v => v.check)
        if (limit && !image.check && checks.length >= limit) {
          this.$message.error('只能选择 ' + limit + ' 张图片')
        } else {
          image.check = !image.check
        }
        return
      }
      this.$emit('select', image.url)
      this.dialogVisible = false
    },
    handleSubmit() {
      const urls = this.images.filter(v => v.check).map(v => v.url)
      this.$emit('submit', urls)
      this.dialogVisible = false
    },
    getImageUrl(url, params) {
      get(url, params).then(({ data }) => {
        if (data && data.length > 0) {
          const urls = [...new Set(data)]
          this.images = urls.map(url => {
            return { url, check: false }
          })
        } else {
          this.$message.error('没有找到图片')
        }
      })
    }
  }
}
</script>

<style scoped>
.search {
  margin-bottom: 10px;
}
.search > .el-input {
  padding-right: 80px;
}
.search > .el-button {
  position: absolute;
  right: 20px;
}
.el-scrollbar ::v-deep .el-scrollbar__wrap {
  height: 447px;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
ul > li {
  position: relative;
  overflow: hidden;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  width: 100px;
  height: 100px;
}
ul > li.check {
  border: 1px solid #f56c6c;
}
.el-image {
  display: block;
  width: 100%;
  height: 100%;
}
ul > li > label {
  width: 50px;
  height: 30px;
  background: #f56c6c;
  position: absolute;
  left: -18px;
  top: -8px;
  text-align: center;
  color: #ffffff;
  font-size: 20px;
  transform: rotate(-45deg);
}
ul > li > label i {
  margin-top: 11px;
  transform: rotate(45deg);
}
</style>
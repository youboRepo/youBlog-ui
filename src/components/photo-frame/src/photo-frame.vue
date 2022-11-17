<template>
  <div class="photo-frame" @drop.prevent.stop>
    <div v-loading="loading" class="frame" :class="{ border }" :style="{ width: size + 'px', height: size + 'px' }">
      <el-image :src="src" :lazy="lazy" class="block w100p h100p">
        <div slot="error" class="el-image__error">
          <i class="el-icon-picture-outline" />
        </div>
      </el-image>
      <div class="tool top">
        <i class="el-icon-close" title="点击删除图片" @click="deletePhoto" />
        <i v-if="src" class="el-icon-printer" title="点击复制图片" @click="copyPhoto" />
        <i v-if="src" class="el-icon-view" title="点击打开图片" @click="openPhoto" />
      </div>
      <div class="tool bottom">
        <i class="el-icon-link" title="点击输入图片" @click="toInputPhoto" />
        <i v-if="url" class="el-icon-check" title="点击选择图片" @click="toSelectPhoto" />
        <el-upload v-if="action" v-bind="{ action, data }" :before-upload="upload" :on-success="success" :on-error="error" :show-file-list="false" accept="image/jpeg">
          <i class="el-icon-upload2" title="点击上传图片" />
        </el-upload>
      </div>
    </div>
    <image-select v-if="url" :visible.sync="dialogVisible.selectPhoto" v-bind="{ url, params, search }" @select="selectPhoto" />
    <el-dialog v-el-drag-dialog title="输入图片" :visible.sync="dialogVisible.inputPhoto" width="540px" append-to-body>
      <el-input ref="input" v-model="input" placeholder="请输入图片地址" class="mb10" :validate-event="false" />
      <el-image :src="input" class="block w500 h500">
        <div slot="error" class="el-image__error">
          <i class="el-icon-picture-outline" />
        </div>
      </el-image>
      <dialog-footer slot="footer" @submit="inputPhoto" />
    </el-dialog>
  </div>
</template>

<script>
import { post } from '@/api/common'

export default {
  name: 'PhotoFrame',
  props: {
    src: String,
    size: {
      type: Number,
      default: 120
    },
    action: String,
    data: Object,
    url: String,
    params: Object,
    search: String,
    convert: String,
    lazy: Boolean,
    border: Boolean
  },
  data() {
    return {
      loading: false,
      input: '',
      dialogVisible: {
        selectPhoto: false,
        inputPhoto: false
      }
    }
  },
  methods: {
    // 打开图片
    openPhoto() {
      window.open(this.src)
    },
    // 复制图片
    copyPhoto() {
      this.$copy(this.src)
    },
    // 删除图片
    deletePhoto() {
      this.$emit('update:src', undefined)
      this.$emit('delete')
    },
    // 上传图片
    upload() {
      this.loading = true
    },
    success({ message, data }) {
      this.loading = false
      if (message) {
        this.$message.error(message)
      } else {
        this.$emit('update:src', data)
        this.$emit('upload', data)
      }
    },
    error() {
      this.loading = false
      this.$message.error('上传失败')
    },
    // 选择图片
    toSelectPhoto() {
      this.dialogVisible.selectPhoto = true
    },
    selectPhoto(url) {
      const convert = this.convert
      if (convert) {
        this.loading = true
        const params = { ...this.data, url }
        post(convert, { params })
          .then(({ message, data }) => {
            if (message) {
              this.$message.error(message)
            } else {
              this.$emit('update:src', data)
              this.$emit('select', data)
            }
            this.loading = false
          })
          .catch(() => {
            this.loading = false
          })
      } else {
        this.$emit('update:src', url)
        this.$emit('select', url)
      }
      this.dialogVisible.selectPhoto = false
    },
    // 输入图片
    toInputPhoto() {
      this.input = this.src
      this.dialogVisible.inputPhoto = true
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },
    inputPhoto() {
      const input = this.input
      if (input) {
        this.$emit('update:src', input)
        this.$emit('input', input)
        this.dialogVisible.inputPhoto = false
      } else {
        this.$message.error('请输入图片地址')
      }
    }
  }
}
</script>

<style scoped>
.frame {
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.frame.border {
  border: 1px solid #e4e7ed;
}
.tool {
  display: none;
  flex-direction: row-reverse;
  justify-content: space-between;
  position: absolute;
  width: 100%;
  line-height: normal;
  background: rgba(0, 0, 0, 0.6);
}
.tool.top {
  top: 0;
}
.tool.bottom {
  bottom: 0;
}
.tool.bottom > div {
  display: inline;
}
.frame:hover .tool {
  display: flex;
}
.tool i {
  width: 30px;
  line-height: 30px;
  text-align: center;
  color: #999999;
  font-size: 20px;
  cursor: pointer;
}
.tool i:hover {
  color: #ffffff;
  background: #006699;
}
.tool i.el-icon-close:hover {
  background: red;
}
</style>
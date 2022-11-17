<template>
  <div class="photo-album">
    <draggable v-model="srcList" class="draggable" :class="{ border }" filter=".tool">
      <photo-frame
        v-for="(src, index) in srcs"
        :key="index"
        :src.sync="srcs[index]"
        v-bind="{ size, action, data, url, params, search, convert, lazy, border }"
        @delete="deletePhoto(index)"
      />
      <div class="tool">
        <i v-if="limit == null || srcs.length < limit" class="el-icon-plus" title="点击添加图片" @click="addPhoto" />
        <el-upload v-if="action" v-bind="{ action, data }" :on-success="success" :on-error="error" :show-file-list="false" accept="image/jpeg" multiple>
          <i class="el-icon-upload2" title="点击上传图片" />
        </el-upload>
        <i v-if="url" class="el-icon-check" title="点击选择图片" @click="toSelectPhoto" />
        <i class="el-icon-delete" title="点击清除图片" @click="cleanPhoto" />
      </div>
    </draggable>
    <image-select v-if="url" :visible.sync="dialogVisible.selectPhoto" v-bind="{ url, params, search, limit }" multiple @submit="selectPhoto" />
  </div>
</template>

<script>
import axios from 'axios'
import { post } from '@/api/common'

export default {
  name: 'PhotoAlbum',
  props: {
    srcs: {
      type: Array,
      default: () => {
        return []
      }
    },
    size: Number,
    action: String,
    data: Object,
    url: String,
    params: Object,
    search: String,
    convert: String,
    limit: Number,
    lazy: Boolean,
    border: Boolean
  },
  data() {
    return {
      dialogVisible: {
        selectPhoto: false
      }
    }
  },
  computed: {
    srcList: {
      get() {
        return this.srcs
      },
      set(srcs) {
        this.$emit('update:srcs', srcs)
      }
    }
  },
  methods: {
    // 删除图片
    deletePhoto(index) {
      this.srcs.splice(index, 1)
    },
    // 添加图片
    addPhoto() {
      this.srcs.push('')
    },
    // 上传图片
    success(response, file, fileList) {
      if (fileList.filter(v => v.response).length !== fileList.length) return
      const urls = fileList.filter(v => v.response.data).map(v => v.response.data)
      this.$emit('update:srcs', urls)
      this.$emit('upload', urls)
    },
    error() {
      this.$message.error('上传失败')
    },
    // 选择图片
    toSelectPhoto() {
      this.dialogVisible.selectPhoto = true
    },
    selectPhoto(urls) {
      const convert = this.convert
      if (convert) {
        axios
          .all(
            urls.map(url => {
              const params = { ...this.data, url }
              return post(convert, { params })
            })
          )
          .then(responses => {
            const urls = responses.filter(v => v.data).map(v => v.data)
            this.$emit('update:srcs', urls)
            this.$emit('select', urls)
          })
      } else {
        this.$emit('update:srcs', urls)
        this.$emit('select', urls)
      }
      this.dialogVisible.selectPhoto = false
    },
    // 清除图片
    cleanPhoto() {
      this.$emit('update:srcs', [])
    }
  }
}
</script>

<style scoped>
.draggable {
  display: flex;
  flex-wrap: wrap;
}
.draggable.border {
  gap: 10px;
}
.photo-frame {
  cursor: move;
}
.tool {
  width: 30px;
  line-height: normal;
}
.tool:hover {
  background: rgba(0, 0, 0, 0.6);
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
</style>
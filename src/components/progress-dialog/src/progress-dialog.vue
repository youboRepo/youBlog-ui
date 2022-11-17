<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" @open="init">
    <el-progress :percentage="percentage" :stroke-width="26" class="mb10" text-inside />
    <el-input ref="input" v-model="text" type="textarea" rows="16" class="-p2" />
  </el-dialog>
</template>

<script>
export default {
  name: 'ProgressDialog',
  props: {
    title: {
      required: true,
      type: String
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      percentage: 0,
      text: ''
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
    init() {
      this.percentage = 0
      this.text = ''
    },
    go(count, length, text, message) {
      if (count > length) {
        count = length
      }
      this.percentage = parseInt((count / length) * 100)
      if (this.text) {
        this.text += '\n'
      }
      this.text += text
      if (message) {
        this.text += '\n' + message
      }
      this.$nextTick(() => {
        this.$refs.input.$refs.textarea.scrollTop = this.$refs.input.$refs.textarea.scrollHeight
      })
    }
  }
}
</script>
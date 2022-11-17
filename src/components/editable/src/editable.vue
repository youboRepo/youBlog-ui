<template>
  <el-popover v-model="visible" placement="top" :disabled="disabled" @show="inputValue = value" @after-enter="$refs.input && $refs.input.focus()">
    <el-date-picker v-if="type == 'datetime'" v-model="inputValue" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" v-bind="$attrs" />
    <el-date-picker v-else-if="type == 'date'" v-model="inputValue" type="date" value-format="yyyy-MM-dd" v-bind="$attrs" />
    <el-time-select v-else-if="type == 'time'" v-model="inputValue" v-bind="$attrs" />
    <el-select v-else-if="type == 'select'" v-model="inputValue" v-bind="$attrs">
      <slot />
    </el-select>
    <el-input v-else-if="type == 'input'" ref="input" v-model="inputValue" v-bind="$attrs" />
    <el-input v-else ref="input" v-model="inputValue" type="textarea" :rows="2" v-bind="$attrs" />
    <div class="tr mt10">
      <el-button size="mini" @click="visible = false">取消</el-button>
      <el-button size="mini" type="primary" @click="submit(inputValue)">确定</el-button>
    </div>
    <el-link slot="reference" type="primary" title="点击修改" :disabled="disabled">{{ value || value === 0 ? value : '空' }}</el-link>
  </el-popover>
</template>

<script>
export default {
  name: 'Editable',
  inheritAttrs: false,
  props: {
    value: [String, Number],
    type: {
      type: String,
      default: 'textarea'
    },
    disabled: Boolean
  },
  data() {
    return {
      visible: false,
      inputValue: ''
    }
  },
  methods: {
    submit(value) {
      this.visible = false
      this.$emit('submit', value)
    }
  }
}
</script>

<style scoped>
div.el-textarea ::v-deep textarea {
  padding: 5px;
}
.el-link {
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
}
</style>
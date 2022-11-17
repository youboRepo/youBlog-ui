<template>
  <div class="submit-button">
    <div class="fixed-button">
      <el-row type="flex">
        <el-col :span="12">
          <slot name="left"></slot>
        </el-col>
        <el-col :span="12" class="tr">
          <slot>
            <el-button v-if="print" type="primary" v-print="print">打印</el-button>
            <el-button v-else type="primary" :disabled="disabled" @click="handleSubmit" v-text="submitText">提交</el-button>
            <el-button v-if="showCancel" @click="handleCancel" v-text="cancelText">取消</el-button>
            <router-link v-if="to" :to="to" class="ml10">
              <el-button>返回</el-button>
            </router-link>
          </slot>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubmitButton',
  props: {
    submitText: {
      type: String,
      default: '提交'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    showCancel: {
      type: Boolean,
      default: false
    },
    to: String,
    fixed: {
      type: Boolean,
      default: true
    },
    disabled: Boolean,
    print: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('submit')
    },
    handleCancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';

.submit-button {
  height: 68px;
}
.fixed-button {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  padding: 10px 20px;
}
.hideSidebar .fixed-button {
  width: calc(100% - 54px);
}
.mobile .fixed-page {
  width: 100%;
}
</style>
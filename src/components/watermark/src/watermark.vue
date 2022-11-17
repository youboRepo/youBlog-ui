<template>
  <div v-if="base64" class="watermark" :style="{ 'background-image': 'url(' + base64 + ')' }" />
</template>

<script>
export default {
  name: 'Watermark',
  computed: {
    base64() {
      // 获取工号
      //const jobNumber = this.$store.getters.jobNumber
      const jobNumber = 'KINGSOLD'
      if (!jobNumber) {
        return jobNumber
      }

      // 创建画布
      var canvas = document.createElement('canvas')
      // 设置宽度
      canvas.width = 200
      // 设置高度
      canvas.height = 150
      // 获取画笔
      var context = canvas.getContext('2d')
      // 设置字体
      context.font = 'bold 32px Helvetica'
      // 设置颜色
      context.fillStyle = 'gray'
      // 设置透明
      context.globalAlpha = 0.05
      // 设置旋转
      context.rotate((-30 * Math.PI) / 180)
      // 绘制文字
      context.fillText(jobNumber, -10, 125)
      // 生成图片
      return canvas.toDataURL('image/png')
    }
  }
}
</script>

<style scoped>
.watermark {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  z-index: 9999;
  pointer-events: none;
}
</style>
<template>
  <el-card :body-style="$attrs">
    <slot />
  </el-card>
</template>

<script>
export default {
  name: 'Card',
  inheritAttrs: false
}
</script>

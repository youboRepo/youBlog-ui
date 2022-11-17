<template>
  <div :style="$attrs">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'FlexItem',
  inheritAttrs: false
}
</script>

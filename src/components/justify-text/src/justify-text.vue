<template>
  <div>
    <span v-if="label">{{ label }}</span>
    <slot name="label" />
    <span class="fr">
      <slot />
    </span>
  </div>
</template>

<script>
export default {
  name: 'JustifyText',
  props: {
    label: String
  }
}
</script>
<template>
  <div :class="['j-col', `j-col-${cols}`]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'JCol',
  props: {
    cols: {
      type: [String, Number],
      default: '24',
    },
    xs: {
      type: [String, Number],
      default: null,
    },
    md: {
      type: [String, Number],
      default: null,
    },
    lg: {
      type: [String, Number],
      default: null,
    },
  },
}
</script>

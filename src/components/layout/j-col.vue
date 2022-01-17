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
  render(h) {
    const classList = [`j-col-${this.cols}`]
    if (this.xs) {
      classList.push(`j-col-xs-${this.xs}`)
    }
    if (this.md) {
      classList.push(`j-col-md-${this.md}`)
    }
    if (this.lg) {
      classList.push(`j-col-lg-${this.lg}`)
    }
    return h(
      'div',
      {
        class: ['j-col', ...classList],
      },
      this.$slots.default,
    )
  },
}
</script>

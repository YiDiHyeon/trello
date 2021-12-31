<template>
  <w-dialog
    :visible.sync="visible"
    :before-close="handleCloseDialog"
    max-width="90%"
    height="auto"
    width="auto"
  >
    <div class="dialog-container">
      <div class="dialog-header text-center">
        <h2 class="text-size-18 mg-t-8 gray-deep">Modify</h2>
      </div>
      <div class="dialog-content mg-t-8">
        <div class="card">
          <input v-model="title" placeholder="" type="text" class="input" />
          <button class="btn gray mg-l-10" @click="handleCloseDialog">OK</button>
        </div>
      </div>
    </div>
  </w-dialog>
</template>

<script>
export default {
  name: 'NewPolicyInfoDialog',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      title: '',
    }
  },
  methods: {
    handleCloseDialog() {
      this.$emit('handleCloseDialog')
    },
  },
}
</script>

<style scoped></style>

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
        <h2 class="text-size-18 mg-t-8 gray-deep">Add Card</h2>
      </div>
      <div class="dialog-content mg-t-40">
        <div>
          <label><b>title</b></label>
          <input v-model="form.title" placeholder="" type="text" class="input" />
        </div>
        <div class="mg-t-20">
          <label><b>description</b></label>
          <input v-model="form.description" placeholder="" type="text" class="input" />
        </div>
        <div class="btn-wrap mg-t-20">
          <button class="btn gray" @click="handleSubmit">OK</button>
        </div>
      </div>
    </div>
  </w-dialog>
</template>

<script>
import { postTrelloCard } from '@/apis/api/api'

export default {
  name: 'CardDialog',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    element: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      form: {
        listId: '',
        title: '',
        description: '',
      },
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.resetData()
      }
    },
  },
  created() {
    console.log(this.element)
  },
  methods: {
    resetData() {
      this.form.title = ''
      this.form.description = ''
      console.log(this.element)
    },
    handleSubmit() {
      this.form.listId = this.element.id
      if (confirm('등록할꺼?')) {
        postTrelloCard(this.form)
          .then((response) => {
            console.log(response)
            this.handleCloseDialog(true)
          })
          .catch((error) => {})
      }
    },
    handleCloseDialog(reset) {
      this.$emit('handleCloseDialog', reset === true)
    },
  },
}
</script>

<style scoped></style>

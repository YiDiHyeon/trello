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
    list: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      form: {
        cardId: '',
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
  methods: {
    resetData() {
      this.form.title = ''
      this.form.description = ''
    },
    handleSubmit() {
      this.form.cardId = this.list.id
      if (confirm('등록할꺼?')) {
        postTrelloCard(this.form)
          .then((response) => {
            console.log(response)
            this.handleCloseDialog()
          })
          .catch((error) => {})
      }
    },
    handleCloseDialog() {
      this.$emit('handleCloseDialog')
    },
  },
}
</script>

<style scoped></style>

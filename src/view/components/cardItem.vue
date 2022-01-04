<template>
  <j-row>
    <div class="title">
      <b>{{ card.title }}</b>
    </div>
    <div class="contents mg-t-10">
      <span> {{ card.description }}</span>
      <div class="btn-wrap">
        <button class="btn gray mg-l-10" @click="deleteCard(card.id)">Del</button>
        <button class="btn gray mg-l-10">Modi</button>
      </div>
    </div>
  </j-row>
</template>

<script>
import JRow from '@/components/layout/j-row'
import { deleteTrelloCard } from '@/apis/api/api'
export default {
  name: 'CardItem',
  components: { JRow },
  props: {
    card: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      console.log(this.card)
    },
    deleteCard() {
      deleteTrelloCard(this.card.id)
        .then((response) => {
          this.getDetail()
        })
        .catch((error) => {})
    },
  },
}
</script>

<style scoped></style>

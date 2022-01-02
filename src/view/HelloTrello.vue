<template>
  <section class="hello">
    <header class="header">
      <h1>Trello!!</h1>
    </header>
    <article>
      <button class="btn red" @click="addList">List Add+</button>
      <List></List>
      <card-item></card-item>
    </article>
  </section>
</template>
<script>
import List from '@/view/List'
import CardItem from '@/view/cardItem'
export default {
  name: 'HelloTrello',
  components: { CardItem, List },
  data() {
    return {}
  },
  methods: {
    addList() {
      console.log(111)
    },
  },
}
</script>

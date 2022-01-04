<template>
  <div>
    <draggable v-model="card" v-bind="cardDragOptions" group="card" :move="onMove">
      <j-row v-for="item in card" :key="item.id" class="card">
        <!--                    <div @click="handleOpenCard(item)">{{ item.title }}</div>-->
        <card-item></card-item>
      </j-row>
    </draggable>
  </div>
</template>

<script>
export default {
  name: 'CardList',
}
</script>

<style scoped></style>

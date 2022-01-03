<template>
  <j-row>
    <draggable :list="list" class="list-group" group="people">
      <j-col>
        <div v-for="element in list" :key="element.name" class="list-group-item">
          {{ element }}
        </div>
      </j-col>
    </draggable>
  </j-row>
</template>

<script>
import JRow from '@/components/layout/j-row'
import JCol from '@/components/layout/j-col'
import draggable from 'vuedraggable'
import { getTrelloList } from '@/apis/api/api'

export default {
  name: 'List',
  components: { JRow, JCol, draggable },
  data() {
    return {
      dragging: false,
      list: [],
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getList()
    },
    getList() {
      getTrelloList()
        .then((response) => {
          console.log(response)
          this.list = response
        })
        .catch((error) => {})
    },
  },
}
</script>

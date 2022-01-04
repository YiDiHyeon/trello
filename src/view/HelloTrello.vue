<template>
  <section class="hello">
    <header class="header">
      <h1>Trello!!</h1>
    </header>
    <article>
      <div class="addListWrap">
        <input v-model="title" placeholder="Add new list" type="text" class="input" />
        <button class="btn red" @click="addList">List Add+</button>
      </div>
      <j-row>
        <draggable v-model="list" v-bind="listDragOptions" group="list" :move="onMove">
          <j-col v-for="element in list" :key="element.id" cols="6" class="list-group-item">
            <div class="card">
              <div class="title">
                <b> {{ element.title }}</b>
                <div class="btn-wrap">
                  <button class="btn gray mg-l-10" @click="listDelete(element)">Del</button>
                </div>
              </div>
              <j-row>
                <draggable v-model="card" v-bind="cardDragOptions" group="card" :move="onMove">
                  <j-row v-for="item in card" :key="item.id" class="card">
                    <!--                    <div @click="handleOpenCard(item)">{{ item.title }}</div>-->
                    <card-item :card="item"></card-item>
                  </j-row>
                </draggable>
              </j-row>
              <button class="btn" @click="addCard(element)">card Add+</button>
            </div>
          </j-col>
        </draggable>
      </j-row>
    </article>
    <card-dialog
      :visible.sync="cardDialog.visible"
      :list="cardDialog.list"
      :card="cardDialog.item"
      @handleCloseDialog="handleCloseInfoDialog"
    ></card-dialog>
  </section>
</template>
<script>
import draggable from 'vuedraggable'
import { getTrelloList, postTrelloList, deleteTrelloList, getTrelloCard } from '@/apis/api/api'
import JRow from '@/components/layout/j-row'
import JCol from '@/components/layout/j-col'
import CardDialog from '@/view/components/cardDialog'
import CardItem from '@/view/components/cardItem'
export default {
  name: 'HelloTrello',
  components: { CardItem, JRow, JCol, draggable, CardDialog },
  data() {
    return {
      cardDialog: {
        visible: false,
        type: '',
        width: '80%',
      },
      list: [],
      card: [],
      title: '',
      test: '',
    }
  },
  computed: {
    listDragOptions() {
      return {
        group: 'list',
        disabled: false,
        animation: 150, // ms, 정렬시 애니메이션 속도 이동 항목,`0 '— 애니메이션 없음
        easing: 'cubic-bezier(1, 0, 0, 1)', // 애니메이션 완화. 기본값은 null입니다. 예는 https://easings.net/을 참조하세요.
        ghostClass: 'ghost', // 놓을 장소의 클래스명 지정
      }
    },
    cardDragOptions() {
      return {
        group: 'card',
        disabled: false,
        animation: 150, // ms, 정렬시 애니메이션 속도 이동 항목,`0 '— 애니메이션 없음
        easing: 'cubic-bezier(1, 0, 0, 1)', // 애니메이션 완화. 기본값은 null입니다. 예는 https://easings.net/을 참조하세요.
        ghostClass: 'ghost', // 놓을 장소의 클래스명 지정
      }
    },
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getList()
      this.getCardList()
    },
    resetData() {
      this.title = ''
    },
    onMove(evt) {
      console.log(evt)
    },
    handleOpenCard(item) {
      this.cardDialog.card = item
      this.cardDialog.visible = true
    },
    handleCloseInfoDialog() {
      this.cardDialog.visible = false
    },
    getList() {
      getTrelloList({})
        .then((response) => {
          this.list = [...response]
          console.log(response)
        })
        .catch((error) => {})
    },
    getCardList() {
      getTrelloCard()
        .then((response) => {
          console.log(response)
          this.card = response
        })
        .catch((error) => {})
    },
    listDelete(element) {
      console.log(element)
      if (confirm('정말 삭제?')) {
        deleteTrelloList(element.id)
          .then((response) => {
            this.getList()
          })
          .catch(() => {
            // alert('리스트 삭제가 취소되었습니다.')
          })
      }
    },
    addList() {
      const newListTitle = {
        title: this.title,
      }
      postTrelloList(newListTitle)
        .then((response) => {
          this.getList()
          this.title = ''
        })
        .catch((error) => {})
    },
    addCard(list) {
      this.cardDialog.list = list
      this.cardDialog.visible = true
    },
  },
}
</script>
<style lang="scss">
.ghost {
  border: 2px dotted rosybrown;
}
</style>

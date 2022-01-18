<template>
  <section class="hello">
    <header class="header">
      <h1>Trello!!</h1>
    </header>
    <article>
      <div class="addListWrap">
        <input v-model="title" placeholder="Add new lists" type="text" class="input" />
        <button class="btn red" @click="addList">lists Add+</button>
      </div>
      <j-row>
        <draggable v-model="lists" v-bind="listDragOptions" group="lists" :move="onMove">
          <j-col
            v-for="element in lists"
            :key="element.id"
            cols="6"
            lg="6"
            md="12"
            xs="24"
            class="lists-group-item"
          >
            <div class="card">
              <div class="title">
                <b v-if="titleView"> {{ element.title }}</b>
                <input v-else v-model="element.title" type="text" class="input" />
                <div v-if="titleView" class="btn-wrap">
                  <button class="btn gray mg-l-10" @click="listDelete(element)">Del</button>
                  <button class="btn gray mg-l-10" @click="titleView = false">Modi</button>
                </div>
                <div v-else class="btn-wrap">
                  <button v-if="titleView" class="btn gray mg-l-10" @click="listDelete(element)">
                    Del
                  </button>
                  <button class="btn gray mg-l-10" @click="listModify(element)">OK</button>
                  <button class="btn gray mg-l-10" @click="titleView = true">Cancel</button>
                </div>
              </div>
              <j-row>
                <draggable
                  v-model="element.cards"
                  v-bind="cardDragOptions"
                  group="card"
                  :move="onMove"
                >
                  <j-row v-for="item in element.cards" :key="item.id" class="card">
                    <div><b>Title</b><br />{{ item.title }}</div>
                    <div><b>Description</b><br />{{ item.description }}</div>
                    <div>
                      <button class="btn" @click="deleteCard(item)">delete</button
                      ><button class="btn" @click="modifyCard(item)">modify</button>
                    </div>
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
      :element="cardDialog.element"
      @handleCloseDialog="handleCloseCardDialog"
    ></card-dialog>
  </section>
</template>
<script>
import draggable from 'vuedraggable'
import {
  getTrelloList,
  postTrelloList,
  deleteTrelloList,
  deleteTrelloCard,
  ModifyTrelloList,
} from '@/apis/api/api'
import JRow from '@/components/layout/j-row'
import JCol from '@/components/layout/j-col'
import CardDialog from '@/view/components/cardDialog'
export default {
  name: 'HelloTrello',
  components: { CardDialog, JRow, JCol, draggable },
  data() {
    return {
      cardDialog: {
        visible: false,
        type: '',
        width: '80%',
        card: {},
      },
      list: {
        title: '',
      },
      titleView: true,
      newListDescription: '',
      lists: [],
      cards: [],
      title: '',
      test: '',
    }
  },
  computed: {
    listDragOptions() {
      return {
        group: 'lists',
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
    },
    onMove(evt) {
      console.log(evt)
      console.log(evt.draggedContext)
      if (evt.draggedContext) {
        this.getList()
        console.log(11111)
      }
      return true
    },
    handleOpenCard(item) {
      this.cardDialog.card = item
      this.cardDialog.visible = true
    },
    handleCloseCardDialog(reset) {
      this.cardDialog.visible = false
      if (reset) {
        this.getList()
      }
    },
    getList() {
      getTrelloList()
        .then((response) => {
          this.lists = response
        })
        .catch((error) => {})
    },
    listDelete(element) {
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
    listModify(element) {
      console.log(element)
      this.titleView = false
      ModifyTrelloList(element.id, { title: element.title })
        .then((response) => {
          console.log(response)
          this.titleView = true
          this.getList()
        })
        .catch((error) => {})
    },
    addList() {
      const newListTitle = {
        title: this.title,
      }
      if (this.title === '') {
        alert('타이틀을 입력해주세요')
      } else {
        postTrelloList(newListTitle)
          .then((response) => {
            this.getList()
            this.title = ''
          })
          .catch((error) => {})
      }
    },
    addCard(element) {
      this.cardDialog.element = element
      this.cardDialog.visible = true
    },
    deleteCard(item) {
      if (confirm('정말 삭제?')) {
        deleteTrelloCard(item.id)
          .then((response) => {
            this.getList()
          })
          .catch(() => {
            // alert('리스트 삭제가 취소되었습니다.')
          })
      }
    },
    modifyCard(element) {
      console.log(222)
    },
  },
}
</script>
<style lang="scss">
.ghost {
  border: 2px solid lightcoral;
}
</style>

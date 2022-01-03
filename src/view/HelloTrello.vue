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
              <button class="btn" @click="addCard(element)">card Add+</button>
            </div>
          </j-col>
        </draggable>
      </j-row>
    </article>
    <popup-info-dialog
      :visible.sync="modifyDialog.visible"
      @handleCloseDialog="handleCloseInfoDialog"
    ></popup-info-dialog>
  </section>
</template>
<script>
import draggable from 'vuedraggable'
import { getTrelloList, postTrelloList, deleteTrelloList } from '@/apis/api/api'
import JRow from '@/components/layout/j-row'
import JCol from '@/components/layout/j-col'
import popupInfoDialog from '@/view/components/modifyDialog'
export default {
  name: 'HelloTrello',
  components: { JRow, JCol, draggable, popupInfoDialog },
  data() {
    return {
      modifyDialog: {
        visible: false,
        type: '',
        width: '80%',
      },
      newListDescription: '',
      list: [],
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
        chosenClass: 'sortable-chosen', // 선택 항목의 클래스명 지정
        dragClass: 'sortable-drag', // 드래그하는 항목의 클래스명 지정
        // handle: '.test',
        // swapThreshold: 1,
      }
    },
    itemDragOptions() {
      return {
        group: 'options',
        disabled: false,
        animation: 150, // ms, 정렬시 애니메이션 속도 이동 항목,`0 '— 애니메이션 없음
        easing: 'cubic-bezier(1, 0, 0, 1)', // 애니메이션 완화. 기본값은 null입니다. 예는 https://easings.net/을 참조하세요.
        ghostClass: 'ghost', // 놓을 장소의 클래스명 지정
        chosenClass: 'sortable-chosen', // 선택 항목의 클래스명 지정
        dragClass: 'sortable-drag', // 드래그하는 항목의 클래스명 지정
        // handle: '.test',
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
    },
    handleCloseInfoDialog() {
      this.modifyDialog.visible = false
    },
    getList() {
      getTrelloList()
        .then((response) => {
          this.list = response
          console.log(response)
        })
        .catch((error) => {})
    },
    listDelete(element) {
      console.log(element)
      if (confirm('정말 삭제하시겠습니까?')) {
        deleteTrelloList(element.id)
          .then((response) => {
            console.log(response)
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
          console.log(response)
        })
        .catch((error) => {})

      // this.list.push({
      //   id: this.id,
      //   title: this.title,
      //   description: this.description,
      // })
      // this.list.id++
      // this.newListTitle = ''
    },
    addCard(element) {
      this.modifyDialog.visible = true
    },
    addTask(list, id) {
      if (!this.newTaskName) {
        return
      }
      console.log(this.newTaskName)
      console.log(list.id)
      list.element.push({
        id: this.id,
        name: this.name,
        description: this.description,
      })
      this.newTaskName = ''
      list.addingTask = false
    },
    cancelTaskAdd() {},
  },
}
</script>

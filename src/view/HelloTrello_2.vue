<template>
  <section class="hello">
    <header class="header">
      <h1>Trello22</h1>
      <button class="btn outline" @click="newListAdd">Add +</button>
    </header>
    <article class="container">
      <j-row>
        <j-col cols="6" class="">
          <div class="item">
            <h2>Doing</h2>
            <draggable :doing-list="doingList" class="list-group" group="people" @change="log">
              <div v-for="element in doingList" :key="element.name" class="list-group-item">
                <div class="card">
                  <div class="title">
                    <b> {{ element.title }}</b>
                  </div>
                  <div class="contents mg-t-10">
                    <span> {{ element.description }}</span>
                    <div class="btn-wrap">
                      <button class="btn gray mg-l-10" @click="doingListDelete(element)">
                        Del
                      </button>
                      <button class="btn gray mg-l-10" @click="doingListModify(element)">
                        Modi
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </draggable>
            <div
              slot="header"
              class="btn-group list-group-item"
              role="group"
              aria-label="Basic example"
            >
              <button class="btn red mg-t-10" @click="doingListAdd">Add +</button>
            </div>
          </div>
        </j-col>
        <j-col cols="6" class="">
          <div class="item">
            <h2>To Do</h2>
            <draggable :to-do-list="toDoList" class="list-group" group="people" @change="log">
              <div v-for="element in toDoList" :key="element.name" class="list-group-item">
                <div class="card">
                  <div class="title">
                    <b> {{ element.title }}</b>
                  </div>
                  <div class="contents mg-t-10">
                    <span> {{ element.description }}</span>
                    <div class="btn-wrap">
                      <button class="btn gray mg-l-10" @click="toDoListDelete(element)">Del</button>
                      <button class="btn gray mg-l-10" @click="doingListModify(element)">
                        Modi
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </draggable>
            <div
              slot="header"
              class="btn-group list-group-item"
              role="group"
              aria-label="Basic example"
            >
              <button class="btn red mg-t-10" @click="toDoListAdd">Add +</button>
            </div>
          </div>
        </j-col>
        <j-col cols="6" class="">
          <div class="item">
            <h2>Done</h2>
            <draggable
              :done-list="doneList"
              class="list-group"
              group="people"
              filter=".btn"
              @change="log"
            >
              <div v-for="element in doneList" :key="element.name" class="list-group-item">
                <div class="card">
                  <div class="title">
                    <b> {{ element.title }}</b>
                  </div>
                  <div class="contents mg-t-10">
                    <span> {{ element.description }}</span>
                    <div class="btn-wrap">
                      <button class="btn gray mg-l-10" @click="doneListDelete(element)">Del</button>
                      <button class="btn gray mg-l-10" @click="doingListModify(element)">
                        Modi
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </draggable>
            <div
              slot="header"
              class="btn-group list-group-item"
              role="group"
              aria-label="Basic example"
            >
              <button class="btn red mg-t-10" @click="doneListAdd">Add +</button>
            </div>
          </div>
        </j-col>
        <j-col cols="6" class="">
          <div class="item">
            <h2>Done</h2>
            <draggable
              :done-list="doneList"
              class="list-group"
              group="people"
              filter=".btn"
              @change="log"
            >
              <div v-for="element in doneList" :key="element.name" class="list-group-item">
                <div class="card">
                  <div class="title">
                    <b> {{ element.title }}</b>
                  </div>
                  <div class="contents mg-t-10">
                    <span> {{ element.description }}</span>
                    <div class="btn-wrap">
                      <button class="btn gray mg-l-10" @click="doneListDelete(element)">Del</button>
                      <button class="btn gray mg-l-10" @click="doingListModify(element)">
                        Modi
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </draggable>
            <div
              slot="header"
              class="btn-group list-group-item"
              role="group"
              aria-label="Basic example"
            >
              <button class="btn red mg-t-10" @click="doneListAdd">Add +</button>
            </div>
          </div>
        </j-col>
      </j-row>
    </article>
    <popup-info-dialog
      :visible.sync="modifyDialog.visible"
      @handleCloseDialog="handleCloseInfoDialog"
    ></popup-info-dialog>
  </section>
</template>

<script>
import JCol from '@/components/layout/j-col'
import draggable from 'vuedraggable'
import JRow from '@/components/layout/j-row'
import popupInfoDialog from '@/view/components/modifyDialog'
import { getDoingList, getTodoList } from '@/apis/api/api'
let id = 1
export default {
  name: 'HelloTrello_2',
  components: { JRow, JCol, draggable, popupInfoDialog },
  data() {
    return {
      modifyDialog: {
        visible: false,
        type: '',
        width: '80%',
      },
      doingList: [],
      toDoList: [],
      doneList: [],
      dragging: false,
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
      getDoingList()
        .then((response) => {
          console.log(response)
          this.doingList = response
        })
        .catch((error) => {})
      getDoingList()
        .then((response) => {
          this.toDoList = response
        })
        .catch((error) => {})
      getDoingList()
        .then((response) => {
          this.doneList = response
        })
        .catch((error) => {})
    },
    newListAdd() {
      console.log('new list')
    },
    doingListAdd() {
      this.doingList.push({ title: '', description: '' })
    },
    toDoListAdd() {
      this.toDoList.push({ title: '', description: '' })
    },
    doneListAdd() {
      this.doneList.push({ title: '', description: '' })
    },
    doingListDelete(element) {
      if (confirm('삭제할꺼야??')) {
        this.doingList.splice(element, 1)
      }
    },
    toDoListDelete(element) {
      this.toDoList.splice(element, 1)
    },
    doneListDelete(element) {
      this.doneList.splice(element, 1)
    },

    doingListModify() {
      this.modifyDialog.visible = true
    },
    handleCloseInfoDialog() {
      this.modifyDialog.visible = false
    },
    log(evt) {
      window.console.log(evt)
    },
  },
}
</script>

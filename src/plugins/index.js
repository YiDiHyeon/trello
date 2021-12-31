import Vue from 'vue'
import Dialog from '@/components/dialog/index'

const components = [Dialog]

components.forEach((component) => {
  Vue.component(component.name, component)
})

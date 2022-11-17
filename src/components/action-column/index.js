import ActionColumn from './src/action-column.vue'

ActionColumn.install = function (Vue) {
  Vue.component(ActionColumn.name, ActionColumn)
}

export default ActionColumn
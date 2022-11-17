import ViewLog from './src/view-log.vue'

ViewLog.install = function (Vue) {
  Vue.component(ViewLog.name, ViewLog)
}

export default ViewLog
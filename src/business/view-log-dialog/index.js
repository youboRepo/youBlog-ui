import ViewLogDialog from './src/view-log-dialog.vue'

ViewLogDialog.install = function (Vue) {
  Vue.component(ViewLogDialog.name, ViewLogDialog)
}

export default ViewLogDialog
import ProgressDialog from './src/progress-dialog.vue'

ProgressDialog.install = function (Vue) {
  Vue.component(ProgressDialog.name, ProgressDialog)
}

export default ProgressDialog
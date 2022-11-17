import ExportDialog from './src/export-dialog.vue'

ExportDialog.install = function (Vue) {
  Vue.component(ExportDialog.name, ExportDialog)
}

export default ExportDialog
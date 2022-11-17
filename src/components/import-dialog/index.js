import ImportDialog from './src/import-dialog.vue'

ImportDialog.install = function (Vue) {
  Vue.component(ImportDialog.name, ImportDialog)
}

export default ImportDialog
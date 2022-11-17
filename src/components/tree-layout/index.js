import TreeLayout from './src/tree-layout.vue'

TreeLayout.install = function (Vue) {
  Vue.component(TreeLayout.name, TreeLayout)
}

export default TreeLayout
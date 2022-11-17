import NumberColumn from './src/number-column.vue'

NumberColumn.install = function (Vue) {
  Vue.component(NumberColumn.name, NumberColumn)
}

export default NumberColumn
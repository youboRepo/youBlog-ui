import Watermark from './src/watermark.vue'

Watermark.install = function (Vue) {
  Vue.component(Watermark.name, Watermark)
}

export default Watermark
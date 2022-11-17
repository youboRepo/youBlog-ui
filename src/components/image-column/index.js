import ImageColumn from './src/image-column.vue'

ImageColumn.install = function (Vue) {
  Vue.component(ImageColumn.name, ImageColumn)
}

export default ImageColumn
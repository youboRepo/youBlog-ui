import PhotoFrame from './src/photo-frame.vue'

PhotoFrame.install = function (Vue) {
  Vue.component(PhotoFrame.name, PhotoFrame)
}

export default PhotoFrame
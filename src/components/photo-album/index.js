import PhotoAlbum from './src/photo-album.vue'

PhotoAlbum.install = function (Vue) {
  Vue.component(PhotoAlbum.name, PhotoAlbum)
}

export default PhotoAlbum
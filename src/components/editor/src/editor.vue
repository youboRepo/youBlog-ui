<template>
  <tinymce tinymce-script-src="https://cdn.jsdelivr.net/npm/tinymce@5.7.1/tinymce.min.js" :init="init" :value="value" @input="update" />
</template>

<script>
import Tinymce from '@tinymce/tinymce-vue'
import { uploadFile } from '@/api/common'

export default {
  name: 'Editor',
  components: { Tinymce },
  props: {
    value: String,
    module: {
      type: String,
      default: 'image/editor'
    },
    config: Object
  },
  computed: {
    url() {
      return this.$store.state.user.fileServerUrl
    },
    init() {
      return Object.assign(
        {
          language: 'zh_CN',
          language_url: 'https://cdn.jsdelivr.net/npm/tinymce-lang/langs/zh_CN.js',
          height: 300,
          branding: false,
          menubar: false,
          plugins: 'paste image code wordcount',
          toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright | outdent indent | removeformat code image',
          paste_data_images: true,
          document_base_url: this.url,
          images_upload_handler: this.uploadImage
        },
        this.config
      )
    }
  },
  methods: {
    update(value) {
      this.$emit('input', value)
    },
    uploadImage(blobInfo, success, failure) {
      const formData = new FormData()
      formData.append('file', blobInfo.blob(), blobInfo.filename())
      formData.append('module', this.module)
      uploadFile(formData)
        .then(({ data }) => success(data))
        .catch(error => failure(error))
    }
  }
}
</script>
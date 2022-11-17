import SubmitButton from './src/submit-button.vue'

SubmitButton.install = function (Vue) {
  Vue.component(SubmitButton.name, SubmitButton)
}

export default SubmitButton
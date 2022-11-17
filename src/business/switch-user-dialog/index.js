import SwitchUserDialog from './src/switch-user-dialog.vue'

SwitchUserDialog.install = function (Vue) {
  Vue.component(SwitchUserDialog.name, SwitchUserDialog)
}

export default SwitchUserDialog
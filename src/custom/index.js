import Vue from 'vue'
import Cookies from 'js-cookie'
import store from '@/store'
import ElementUI from 'element-ui'
import '@/styles/element-variables.scss'
import '@/assets/custom-theme/index.css'
Vue.use(ElementUI, {
  size: Cookies.get('size') || 'default'
})
ElementUI.Dialog.props.closeOnClickModal.default = false
ElementUI.Input.props.showWordLimit.default = true
ElementUI.DatePicker.mixins[0].props.rangeSeparator.default = '至'
ElementUI.Upload.props.headers.default = () => { return { 'X-Auth-Token': store.getters.token } }
ElementUI.Image.props.lazy.default = true

import ElementUIVerify from 'element-ui-verify'
Vue.use(ElementUIVerify, {
  fieldChange: 'clear',
  errorMessageTemplate: {
    empty: '{alias}不能为空',
    length: '请输入{length}位字符',
    minLength: '输入内容至少{minLength}位',
    maxLength: '输入内容至多{maxLength}位',
    number: '请输入数字',
    int: '请输入整数',
    lt: '输入数字应小于{lt}',
    lte: '输入数字不能大于{lte}',
    gt: '输入数字应大于{gt}',
    gte: '输入数字不能小于{gte}',
    maxDecimalLength: '该输入项最多接受{maxDecimalLength}位小数',
    phone: '请输入正确的手机号',
    email: '请输入正确的邮箱',
    verifyCode: '请输入正确的验证码'
  }
})
ElementUIVerify.addRule({ name: "maxLength", type: Number }, maxLength => ({
  max: maxLength,
  message: ElementUIVerify.getErrorMessage("maxLength", maxLength)
}))

// 注册全局指令
import permission from '@/directive/permission'
import elDragDialog from '@/directive/el-drag-dialog'
import clipboard from '@/directive/clipboard'
import Print from 'vue-print-nb'
Vue.use(permission)
Vue.use(elDragDialog)
Vue.use(clipboard)
Vue.use(Print)

// 注册全局组件
import VueCropper from 'vue-cropper'
Vue.use(VueCropper)

import 'normalize.css/normalize.css'
import '@/styles/index.scss'
import '@/icons'
import '@/custom/ajax'
import '@/permission'
import '@/utils/error-log'

import '@/styles/base.scss'
import '@/styles/common.scss'
import '@/styles/theme.scss'

// 通知提示信息
import { MessageBox, Message } from 'element-ui'
Vue.prototype.$confirm2 = (message = '操作确认') => MessageBox.confirm(message, { type: 'warning' })
Vue.prototype.$$confirm = (message = '操作确认') => MessageBox.confirm(message, { type: 'warning' })
Vue.prototype.$$prompt = (message = '输入值', options) => MessageBox.prompt(message, {inputPattern: (/./), inputErrorMessage: message + '不能为空', ...options})
Vue.prototype.$success = (message = '操作成功') => Message.success(message)
Vue.prototype.$warning = (message = '操作警告') => Message.warning(message)
Vue.prototype.$info = (message = '操作消息') => Message.info(message)
Vue.prototype.$error = (message = '操作错误') => Message.error(message)

// 日期处理类库
import moment from 'moment'
Vue.prototype.$moment = moment

// 表格处理类库
import xlsx from 'xlsx'
Vue.prototype.$xlsx = xlsx

// 深度合并类库
import deepmerge from 'deepmerge'
Vue.prototype.$deepmerge = deepmerge
Vue.prototype.$merge = (target, source) => {
  return deepmerge(target, source, { arrayMerge: (target, source) => source })
}

// 检查操作权限
import checkPermission from '@/utils/permission'
Vue.prototype.$checkPermission = checkPermission
Vue.prototype.$auth = value => {
  return checkPermission([value].flat())
}
Vue.prototype.$unauth = value => {
  return !checkPermission([value].flat())
}

// 挂载复制方法
import copy from '@/utils/clipboard'
Vue.prototype.$copy = copy

// 判断是否手机
const isMobile = Vue.prototype.$isMobile = () => {
  const flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
  return flag != null
}
ElementUI.Dialog.props.fullscreen.default = isMobile()

// 表格最大高度
const getTableMaxHeight = () => {
  let maxHeight = document.documentElement.clientHeight - 100
  if (store.state.settings.fixedHeader) {
    maxHeight -= 50
  }
  return maxHeight < 500 ? 500 : maxHeight
}
Vue.prototype.$tableMaxHeight = getTableMaxHeight()

// 转换树形结构
Vue.prototype.$toTree = (nodes, config) => {
  const id = config && config.id || 'id'
  const pid = config && config.pid || 'pid'
  const children = config && config.children || 'children'

  const idMap = {}
  const jsonTree = []

  nodes.forEach((v) => { v && (idMap[v[id]] = v) })
  nodes.forEach((v) => {
    if (v) {
      const parent = idMap[v[pid]]
      if (parent) {
        !parent[children] && (parent[children] = [])
        parent[children].push(v)
      } else {
        jsonTree.push(v)
      }
    }
  })

  return jsonTree
}

// 分批发送异步请求
import axios from 'axios'
Vue.prototype.$batch = async (items, action, size = 10) => {
  if (items && action) {
    items = [...items];
    while (items.length > 0) {
      await axios.all(items.splice(0, size).map(action));
    }
  }
}

// 获取电脑公网地址
Vue.prototype.$getPublicIp = () => {
  return new Promise(resolve => {
    axios.get('https://api.ipify.org').then(({ data }) => {
      axios.get('http://' + data + ':801/echo').then(() => {
        resolve(data)
      }).catch(() => { })
    }).catch(() => { })
  })
}

// 关闭当前导航页签
Vue.prototype.$closeTag = (path) => {
  store.dispatch('tagsView/delView', { path })
}

// 操作浏览器中缓存
import WebStorageCache from 'web-storage-cache'
const wsCache = new WebStorageCache()
Vue.prototype.$cache = {
  get: (key) => wsCache.get(key),
  set: (key, value) => wsCache.set(key, value),
  setx: (key, value, exp) => wsCache.set(key, value, { exp }),
  uuid: (prefix, value, exp = 3600) => {
    const uuid = new Date().getTime()
    wsCache.set(prefix + '_' + uuid, value, { exp })
    return uuid
  }
}

// 四则运算的计算器
Vue.prototype.$calculator = (lv = 0, rv = 0, op, scale = 2) => {
  lv = Number(lv)
  rv = Number(rv)
  if (op == '+') {
    lv = lv + rv
  } else if (op == '-') {
    lv = lv - rv
  } else if (op == '*') {
    lv = lv * rv
  } else if (op == '/') {
    if (rv != 0) {
      lv = lv / rv
    }
  } else {
    lv = rv
  }
  return lv.toFixed(scale)
}

// 保证安全得到数组
Vue.prototype.$array = (array) => {
  return array || []
}

// 去除字符前后空格
Vue.prototype.$trim = (text) => {
  if (text && text.trim) {
    return text.trim()
  }
  return text
}

// 替换
Vue.prototype.$replace = (text, pattern, replacement) => {
  return text.replace(new RegExp(pattern, 'ig'), replacement)
}

// 固定数字小数位数
Vue.prototype.$toFixed = (value, num) => {
  if (value) {
    return value.toFixed(num)
  }
  return value
}

// 打印
// import { getLodop } from "@/assets/LodopFuncs";
// Vue.prototype.$getLodop = getLodop
// Vue.prototype.$preview = (html) => {
//   const lodop = getLodop()
//   lodop.ADD_PRINT_HTML(0, 0, '100%', '100%', html)
//   lodop.PREVIEW()
// }
// Vue.prototype.$print = (html) => {
//   const lodop = getLodop()
//   lodop.ADD_PRINT_HTML(0, 0, '100%', '100%', html)
//   lodop.PRINT()
// }
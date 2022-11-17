import request from '@/utils/request'
import store from '@/store'
import { MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'

request.defaults.timeout = 60000
request.interceptors.request.handlers.unshift({
  fulfilled: config => {
    delete config.headers['X-Token']
    if (store.getters.token) {
      config.headers['X-Auth-Token'] = getToken()
    }
    return config
  }
})
request.interceptors.response.handlers.unshift({
  fulfilled: async response => {
    const data = response.data
    if (response.config.responseType === 'blob') {
      if (response.data.type === 'application/json') {
        response.data = await new Promise(resolve => {
          const reader = new FileReader()
          reader.onload = function () {
            resolve(JSON.parse(this.result))
          }
          reader.readAsText(data)
        })
      } else {
        const link = document.createElement('a')
        const blob = new Blob([data])
        link.href = window.URL.createObjectURL(blob)
        const content = response.headers['content-disposition']
        const index = content.indexOf('filename=')
        const fileName = content.substring(index + 9)
        link.download = decodeURIComponent(fileName)
        link.click()
        window.URL.revokeObjectURL(link.href)
        response.data = { code: 20000 }
      }
    }
    if (response.config.silentMode) {
      response.data.code = 20000
    }
    return response
  }, rejected: async error => {
    const response = error.response
    if (response) {
      if (response.config.responseType === 'blob' && response.data.type === 'application/json') {
        response.data = await new Promise(resolve => {
          const reader = new FileReader()
          reader.onload = function () {
            resolve(JSON.parse(this.result))
          }
          reader.readAsText(response.data)
        })
      }

      if (response.data.message === '单点登录重定向') {
        MessageBox.confirm('请点击确定以尝试再次登录', '登录超时', { type: 'warning' }).then(() => { location.reload() })
      }
    }

    return Promise.reject(error)
  }
})
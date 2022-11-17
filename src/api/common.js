import request from '@/utils/request'

export function get(url, params) {
  return request({
    baseURL: '/',
    method: 'get',
    url,
    params
  })
}

export function post(url, { data, params }) {
  return request({
    baseURL: '/',
    method: 'post',
    url,
    data,
    params
  })
}

export function switchUser(username) {
  return request({
    url: '/login/impersonate',
    method: 'post',
    params: { username }
  })
}

export function logoutSwitch() {
  return request({
    url: '/logout/impersonate',
    method: 'post'
  })
}

export function getSwitchUserMap(keyword) {
  return request({
    url: '/users/map/switch',
    method: 'get',
    params: { keyword }
  })
}

export function getOperationLogList(businessType, businessId) {
  return request({
    url: '/operation/logs/list',
    method: 'post',
    data: { businessType, businessId }
  })
}

export function uploadFile(data) {
  return request({
    url: '/commons/file/upload',
    method: 'post',
    data
  })
}
import request from '@/utils/request'

export function getPermissionList() {
  return request({
    url: '/permissions/list',
    method: 'get'
  })
}

export function getAuthPermissionTree() {
  return request({
    url: '/permissions/tree/auth',
    method: 'get'
  })
}

export function getPermissionTree() {
  return request({
    url: '/permissions/tree',
    method: 'get'
  })
}

export function createPermission(data) {
  return request({
    url: '/permissions/create',
    method: 'post',
    data
  })
}

export function updatePermission(data) {
  return request({
    url: '/permissions/update',
    method: 'post',
    data
  })
}

export function deletePermission(id) {
  return request({
    url: '/permissions/delete',
    method: 'post',
    params: { id }
  })
}
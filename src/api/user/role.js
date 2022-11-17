import request from '@/utils/request'

export function getRolePageList(data) {
  return request({
    url: '/roles/list/page',
    method: 'post',
    data
  })
}

export function getRoleList(data) {
  return request({
    url: '/roles/list',
    method: 'post',
    data
  })
}

export function getRole(id) {
  return request({
    url: '/roles/' + id,
    method: 'get'
  })
}

export function createRole(data) {
  return request({
    url: '/roles/create',
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: '/roles/update',
    method: 'post',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: '/roles/' + id,
    method: 'delete'
  })
}
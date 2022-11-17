import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/users/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

export function getUserPageList(data) {
  return request({
    url: '/users/list/page',
    method: 'post',
    data
  })
}

export function getUser(id) {
  return request({
    url: '/users/' + id,
    method: 'get'
  })
}

export function createUser(data) {
  return request({
    url: '/users/create',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/users/update',
    method: 'post',
    data
  })
}

export function updateEnabled(id, enabled) {
  return request({
    url: '/users/' + id + '/enabled',
    method: 'post',
    params: { enabled }
  })
}

export function updateIsLock(id, isLock) {
  return request({
    url: '/users/' + id + '/lock',
    method: 'post',
    params: { isLock }
  })
}

export function updatePassword(id, password) {
  return request({
    url: '/users/' + id + '/password',
    method: 'post',
    params: { password }
  })
}

export function createUserRole(data) {
  return request({
    url: '/users/role/create',
    method: 'post',
    data
  })
}

export function deleteUserRole(data) {
  return request({
    url: '/users/role/delete',
    method: 'post',
    data
  })
}

export function verifyUsername(username) {
  return request({
    url: '/users/username/verify',
    method: 'get',
    params: { username }
  })
}

export function verifySupplierNumber(supplierNumber) {
  return request({
    url: '/users/supplier/number/verify',
    method: 'get',
    params: { supplierNumber }
  })
}

export function verifyPassword(id, password) {
  return request({
    url: '/users/' + id + '/password/verify',
    method: 'get',
    params: { password }
  })
}
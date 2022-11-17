import request from '@/utils/request'

export function getSystemParamGroupList(data) {
  return request({
    url: '/system/params/group/list',
    method: 'post',
    data
  })
}

export function createSystemParam(data) {
  return request({
    url: '/system/params/create',
    method: 'post',
    data
  })
}

export function deleteSystemParam(id) {
  return request({
    url: '/system/params/delete',
    method: 'post',
    params: { id }
  })
}

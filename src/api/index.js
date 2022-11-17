import request from '@/utils/request'

export function getStateCountMap() {
  return request({
    url: '/indexs/state/count',
    method: 'get'
  })
}

export function getSupplierGradeMap() {
  return request({
    url: '/indexs/supplier/grade',
    method: 'get'
  })
}

export function getNewQuantityChart() {
  return request({
    url: '/indexs/new/quantity',
    method: 'get'
  })
}

export function getOrderQuantityChart() {
  return request({
    url: '/indexs/order/quantity',
    method: 'get'
  })
}

export function getCompanyNoticeMap() {
  return request({
    url: '/indexs/company/notice',
    method: 'get'
  })
}

export function getTaskPublish() {
  return request({
    url: '/indexs/task/publish',
    method: 'get'
  })
}

export function getNotice() {
  return request({
    url: '/indexs/notice',
    method: 'get'
  })
}

export function createSupplierOpinion(data) {
  return request({
    url: '/indexs/supplier/opinion/create',
    method: 'post',
    data
  })
}

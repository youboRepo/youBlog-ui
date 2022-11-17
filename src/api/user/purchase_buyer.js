import request from '@/utils/request'

export function getPurchaseBuyers() {
    return request({
        url: '/purchase/buyers/list',
        method: 'get'
    })
}
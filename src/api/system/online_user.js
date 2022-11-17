import request from '@/utils/request'

export function getOnlineUserList(data) {
    return request({
        url: '/online/users/list',
        method: 'post',
        data
    })
}
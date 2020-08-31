import request from '@/utils/request'

export function listComment(params) {
  return request({
    url: '/comment/list',
    method: 'get',
    params: { ...params }
  })
}

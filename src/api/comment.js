import request from '@/utils/request'

export function listComment(owner_id) {
  return request({
    url: '/comment/list',
    method: 'get',
    params: { owner_id }
  })
}

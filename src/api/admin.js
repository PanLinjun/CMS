import request from '@/utils/request'

export function listAdmin(params) {
  return request({
    url: '/admin/list',
    method: 'get',
    params
  })
}

export function createAdmin(data) {
  return request({
    url: '/admin/create',
    method: 'post',
    data: data
  })
}

export function updateAdmin(data) {
  return request({
    url: '/admin/update',
    method: 'post',
    data: data
  })
}

export function deleteAdmin(username) {
  return request({
    url: '/admin/delete',
    method: 'get',
    params: { username }
  })
}

export function getAdmin(username) {
  return request({
    url: '/admin/get',
    method: 'get',
    params: { username }
  })
}


import request from '@/utils/request'

export function uploadImg(file) {
  return request({
    url: '/admin/upload/img',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data;charset=UTF-8'
    },
    data: file
  })
}


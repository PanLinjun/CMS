import request from '@/utils/request'

export function getChartData(params) {
  return request({
    url: '/chart/getData',
    method: 'get',
    params: { ...params }
  })
}

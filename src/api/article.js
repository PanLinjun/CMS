import request from '@/utils/request'

export function getInfo() {
	return request({
		url: '/article/list',
		method: 'get'
	})
}


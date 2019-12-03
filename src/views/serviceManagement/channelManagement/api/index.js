import axios from 'axios'

// 渠道列表
export function findChannelManagementList (params) {
    return axios.get('/service/api/common/channel/page', { params })
}
// 渠道详情
export function findChannelDetails (id) {
    return axios.get(`/service/api/common/channel/${id}`)
}
// 更新渠道
export function updateChannel (id, params) {
    return axios.put(`/service/api/common/channel/${id}`, params)
}
// 新建渠道
export function createChannel (params) {
    return axios.post('/service/api/common/channel', params)
}

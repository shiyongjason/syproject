import axios from 'axios'

export const findOrderList = (params) => axios.get(`/service/api/orders/page`, { params })
export const editCustomerInfo = (params) => axios.put(`/service/api/channel-users/${params.userId}`, { ...params })
export const addCustomerInfo = (params) => axios.put(`/service/api/channel-users`, { ...params })
// 更新订单的备注信息
export const updateOrderRemark = (params) => axios.put(`/service/api/orders/${params.id}`, params)
// 渠道订单详情
export function findChannelOrderDetails (params) {
    return axios.get(`/service/api/orders/channel/${params}`)
}
// 有赞订单详情
export function findYouZanOrderDetails (params) {
    return axios.get(`/service/api/orders/youzan/${params}`)
}
// 渠道订单修改
export function updateChannelOrderDetails (id, params) {
    return axios.put(`/service/api/orders/channel/${id}`, params )
}

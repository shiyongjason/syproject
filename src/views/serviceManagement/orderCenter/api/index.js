import axios from 'axios'

export const findOrderList = (params) => axios.get(`/service/api/orders/page`, { params })
export const editCustomerInfo = (params) => axios.put(`/service/api/channel-users/${params.userId}`, { ...params })
export const addCustomerInfo = (params) => axios.put(`/service/api/channel-users`, { ...params })
// 更新订单的备注信息
export const updateOrderRemark = (params) => axios.put(`/service/api/orders/${params.id}`, params)

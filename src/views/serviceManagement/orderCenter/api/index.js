import axios from 'axios'

export const findOrderList = (params) => axios.get(`/service/api/orders/page`, { params })
export const editCustomerInfo = (params) => axios.put(`/service/api/channel-users/${params.userId}`, { ...params })
export const addCustomerInfo = (params) => axios.put(`/service/api/channel-users`, { ...params })

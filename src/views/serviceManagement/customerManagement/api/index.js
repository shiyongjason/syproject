import axios from 'axios'

export const findCustomerList = (params) => axios.get(`/service/api/channel-users`, { params })
export const editCustomerInfo = (params) => axios.put(`/service/api/channel-users/${params.userId}`, { ...params })
export const addCustomerInfo = (params) => axios.post(`/service/api/channel-users`, { ...params })

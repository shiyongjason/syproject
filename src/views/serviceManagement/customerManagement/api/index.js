import axios from 'axios'

// 获取菜单列表
export const findCustomerList = (params) => axios.get(`/service/api/channel-users`, { params })

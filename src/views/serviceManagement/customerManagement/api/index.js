import axios from 'axios'

export const findCustomerList = (params) => axios.get(`/service/api/channel-users`, { params })
export default {
    editCustomerInfo (params) {
        return axios.put(`/service/api/channel-users/${params.id}`, { ...params })
    },
    addCustomerInfo (params) {
        return axios.post(`/service/api/channel-users`, { ...params })
    }
}
// 标签模糊搜索列表
export function findTagList (params) {
    return axios.get(`/service/api/labels/search-label-name`, { params })
}
// 添加标签 到用户
export function createTagWidthUser (params) {
    return axios.post(`/service/api/labels/add-label`, params)
}
// 获取用户详情中的标签名称列表
export function findUserDetailsTagList (params) {
    return axios.get(`/service/api/labels/get-label-name-message`, { params })
}
// 2.3version 获取用户列表
export function findUserList (params) {
    return axios.post(`/service/api/users/customer`, params)
}

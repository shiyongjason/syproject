import axios from 'axios'

// 查找服务管家列表
export function findServiceManagementList (params) {
    return axios.get(`/service/api/service-manager`, { params })
}
// 添加服务管家
export function createServiceManagement (params) {
    return axios.post(`/service/api/service-manager`, params)
}
// 删除服务管家
export function deleteServiceManagement (id) {
    return axios.put(`/service/api/service-manager/${id}`)
}

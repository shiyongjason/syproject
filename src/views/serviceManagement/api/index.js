import axios from 'axios'

// 服务资源类目树结构
export function findServiceResourcesCategory () {
    return axios.get(`/service/api/service-resources/category`)
}
// 服务资源类目 新增
export function createServiceResourcesCategory (params) {
    return axios.post(`/service/api/service-resources/category`, params)
}
// 服务资源类目 修改
export function updateServiceResourcesCategory (id, params) {
    return axios.put(`/service/api/service-resources/category/${id}`, params)
}
// 服务资源类目 删除
export function deleteServiceResourcesCategory (id) {
    return axios.delete(`/service/api/service-resources/category/${id}`)
}
// 服务资源模板新增
export function createServiceResourcesTemplate (params) {
    return axios.post(`/service/api/service-resources/template`, params)
}
// 服务资源模板查询
export function getServiceResourcesTemplate (params) {
    return axios.get(`/service/api/service-resources/template/page`, { params })
}

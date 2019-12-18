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

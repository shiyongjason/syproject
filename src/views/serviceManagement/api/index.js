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
// 服务资源模板删除
export function deleteServiceResourcesTemplate (id) {
    return axios.delete(`/service/api/service-resources/template/${id}`)
}
// 服务资源模板详情
export function getServiceResourcesTemplateDetails (templateId) {
    return axios.get(`/service/api/service-resources/template/detail/${templateId}`)
}
// 服务资源模板修改
export function updateServiceResourcesTemplate (templateId, params) {
    return axios.put(`/service/api/service-resources/template/${templateId}`, params)
}
// 服务资源模板获取联想提示规格名规格值
export function getServiceResourcesAttribute () {
    return axios.get(`/service/api/service-resources/attribute-value/cache`)
}
// 手机号码获取用户信息
export const getWorkOrderUserInfo = (params) => {
    return axios.get(`service/api/channel-users/for-workorder`, { params })
}

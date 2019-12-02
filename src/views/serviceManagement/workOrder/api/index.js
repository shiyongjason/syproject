import axios from 'axios'
// 工单列表
export const findWorkOrderList = (params) => axios.get('service/api/work-orders/page', { params })
// 工单详情
export const findWorkOrderDetail = (id) => axios.get(`service/api/work-orders/${id}`)
// 新增工单
export const createWorkOrder = (id, params) => axios.put(`service/api/work-orders/${id}`, params)
// 修改工单
export const updateWorkOrder = (id, params) => axios.put(`service/api/work-orders/${id}`, params)
// 查找服务管家列表
export function findServiceManagementList (params) {
    return axios.get(`/service/api/service-manager`, { params })
}

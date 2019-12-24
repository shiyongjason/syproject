import axios from 'axios'

export const findOrderList = (params) => axios.get(`/service/api/orders/page`, { params })
export const editCustomerInfo = (params) => axios.put(`/service/api/channel-users/${params.userId}`, { ...params })
export const addCustomerInfo = (params) => axios.put(`/service/api/channel-users`, { ...params })
// 更新订单的备注信息
export const updateOrderRemark = (params) => axios.put(`/service/api/orders/${params.id}`, params)
// 渠道订单详情
export function findChannelOrderDetails (id) {
    return axios.get(`/service/api/orders/channel/order-detail/${id}`)
}
// 有赞订单详情
export function findYouZanOrderDetails (params) {
    return axios.get(`/service/api/orders/youzan/${params}`)
}
// 渠道订单修改
export function updateChannelOrderDetails (id, params) {
    return axios.put(`/service/api/orders/channel/${id}`, params)
}

// 导入订单错误重新编辑保存
export function createChannelOrderList (params) {
    return axios.post(`/service/api/orders/reimport`, params)
}
// 工单管理-工单信息新增(订单入口)
export const createWorkOrder = (params) => axios.post(`service/api/work-orders/for-order`, params)
// 查找服务管家列表
export function findServiceManagementList (params) {
    return axios.get(`/service/api/service-manager`, { params })
}

// mis重新同步
export function updateMisSync (orderId) {
    return axios.post(`/service/api/orders/re-sync-mis/${orderId}`)
}

// mis手动触发同步
export function updateMisSyncManual (orderId) {
    return axios.post(`/service/api/orders/sync-mis-success/${orderId}`)
}

import axios from 'axios'
// 采购单列表
export const getPurchaseList = (params) => axios.get('/project/api/purchase-orders/boss/page', { params })
// 采购单详情
export const getPurchaseOrderDetail = (id) => axios.get(`/project/api/purchase-orders/boss/${id}/detail`)
// 采购单确认详情
export const getPurchaseOrderConfirmDetail = (id) => axios.get(`/project/api/purchase-orders/boss/${id}/confirm-detail`)
// 采购单确认变更详情
export const getPurchaseOrderConfirmChangeDetail = (id) => axios.get(`/project/api/purchase-orders/boss/${id}/change-confirm-detail`)
// 采购单变更确认
export const updatePurchaseOrderChangeConfirmStatus = (id) => axios.get(`/project/api/api/purchase-orders/boss/change-confirm`)
// 采购单确认
export const updatePurchaseOrderConfirmStatus = (id) => axios.get(`/project/api/purchase-orders/boss/confirm`)

import axios from 'axios'
// 采购单列表
export const getPurchaseList = (params) => axios.get('/project/api/purchase-orders/boss/page', { params })
// 采购单列表总计
export const getPurchaseTotal = (params) => axios.get('/project/api/purchase-orders/boss/amount', { params })
// 采购单详情
export const getPurchaseOrderDetail = (id) => axios.get(`/project/api/purchase-orders/boss/${id}/detail`)
// 采购单确认详情
export const getPurchaseOrderConfirmDetail = (id) => axios.get(`/project/api/purchase-orders/boss/${id}/confirm-detail`)
// 采购单确认变更详情 / 查看变更
export const getPurchaseOrderConfirmChangeDetail = (id) => axios.get(`/project/api/purchase-orders/boss/${id}/change-confirm-detail`)
// 采购单查看变更
export const getPurchaseOrderSeeDetail = (changeId) => axios.get(`/project/api/purchase-orders/boss/${changeId}/search-change-confirm-detail`)
// 采购单变更确认
export const updatePurchaseOrderChangeConfirmStatus = (params) => axios.put(`/project/api/purchase-orders/boss/change-confirm`, params)
// 采购单确认
export const updatePurchaseOrderConfirmStatus = (params) => axios.put(`/project/api/purchase-orders/boss/confirm`, params)
// 采购单确认
export const getSeals = (params) => axios.get(`/project/api/contract-approval/${params}/seal-approval-history`, params)
// BOSS-上传共管户
export const uploadCoManagerPhotos = (params) => axios.post(`/project/api/purchase-orders/co-manager`, params)

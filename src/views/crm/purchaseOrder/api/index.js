import axios from 'axios'
// 采购单列表
export const getPurchaseList = (params) => axios.get('/api/purchaseorders/page', { params })
// 采购单详情
export const getStatusOkPurchaseOrder = (id) => axios.get(`/api/purchaseorders/${id}/detail`)

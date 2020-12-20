import axios from 'axios'
// 支付单列表
export const getPaymentOrderList = (params) => axios.get('/project/api/payment-orders', { params })
// 支付单列表总金额
export const getPaymentOrderTotal = (params) => axios.get('/project/api/payment-orders/total-amount', { params })
// 支付单详情
export const getPaymentOrderDetail = (paymentOrderId) => axios.get(`/project/api/payment-orders/${paymentOrderId}`)
// 支付单审核通过
export const updatePaymentOrderStatusPass = (paymentOrderId, params) => axios.patch(`/project/api/payment-orders/${paymentOrderId}/examine-pass`, params)
// 支付单审核不通过
export const updatePaymentOrderStatusNoPass = (paymentOrderId, params) => axios.patch(`/project/api/payment-orders/${paymentOrderId}/examine-fail`, params)
// 上游支付-确认支付提交
export const updatePrevPayPass = (params) => axios.post(`/project/api/supplier-payments/submit`, params)
// 上游支付-上游支付明细
export const getPrevPayMoreDetail = (paymentOrderId) => axios.get(`/project/api/supplier-payments/${paymentOrderId}`)
// 上游支付-上游支付详情
export const getPrevPayDetail = (paymentOrderId) => axios.get(`/project/api/supplier-payments/${paymentOrderId}/pay-confirm`)
// 确认收货
export const updateConfirmReceiptPass = (params) => axios.post(`/project/api/payment-orders/good-confirm`, params)
// 确认收货-详情
export const getConfirmReceiptDetail = (paymentOrderId) => axios.get(`/project/api/payment-orders/${paymentOrderId}/goods`)
// 确认收货-
export const getConfirmReceiptMoreDetail = (paymentOrderId) => axios.get(`/project/api/payment-orders/${paymentOrderId}/goods-detail`)

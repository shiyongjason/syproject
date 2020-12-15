import axios from 'axios'
// 支付单列表
export const getPaymentOrderList = (params) => axios.get('/project/api/payment-orders', { params })
// 支付单列表总金额
export const getPaymentOrderTotal = (params) => axios.get('/project/api/payment-orders/total-amount', { params })
// 支付单详情
export const getPaymentOrderDetail = (paymentOrderId) => axios.get(`/project/api/payment-orders/${paymentOrderId}`)
// 支付单审核通过
export const updatePaymentOrderStatusPass = (paymentOrderId, params) => axios.get(`/project/api/payment-orders/${paymentOrderId}/examine-pass`, params)
// 支付单审核不通过
export const updatePaymentOrderStatusNoPass = (paymentOrderId, params) => axios.get(`/project/api/payment-orders/${paymentOrderId}/examine-fail`, params)

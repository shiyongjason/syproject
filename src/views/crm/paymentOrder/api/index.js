import axios from 'axios'
// 支付单列表
export const getPaymentOrderList = (params) => axios.get('/project/api/payment-orders', { params })
// 支付单列表总金额
export const getPaymentOrderTotal = (params) => axios.get('/project/api/payment-orders/total-amount', { params })
// 支付单详情
export const getPaymentOrderDetail = (paymentOrderId) => axios.get(`/project/api/payment-orders/${paymentOrderId}`)

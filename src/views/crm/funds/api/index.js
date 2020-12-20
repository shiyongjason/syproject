import axios from 'axios'
// boss 资金列表
export const getFundsList = (params) => axios.get('/project/api/fund/query-page', { params })
// boss 资金列表总计
export const getFundsListTotal = (params) => axios.get('/project/api/fund/query-page-sum', { params })
// boss 资金列表查看凭证
export const getFundsTicket = (params) => axios.get('/project/api/fund/query-detail-attach/', { params })
// boss 资金列表 首付款确认收到
export const updateFirstPay = (params) => axios.patch('/project/api/payment-orders/downpayment-received', params)
// boss 资金列表 首付款并未收到
export const updateFirstUnPay = (params) => axios.patch('/project/api/payment-orders/downpayment-not-received', params)
// boss 资金列表 服务费确认收到
export const updateServicePay = (params) => axios.patch('/project/api/payment-orders/service-fee-received', params)
// boss 资金列表 服务费并未收到
export const updateServiceUnPay = (params) => axios.patch('/project/api/payment-orders/service-fee-not-received', params)
// boss 资金列表 尾款支付确认收到
export const updateFinalPay = (params) => axios.patch('/project/api/payment-orders/balance-received', params)
// boss 资金列表 尾款支付确认收到
export const updateFinalUnPay = (params) => axios.patch('/project/api/payment-orders/balance-not-received', params)

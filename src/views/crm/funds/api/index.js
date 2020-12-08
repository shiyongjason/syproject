import axios from 'axios'
// boss 资金列表
export const getFundsList = (params) => axios.get('/project/api/fund/query-page', { params })
// boss 资金列表总计
export const getFundsListTotal = (params) => axios.get('/project/api/fund/query-page-sum', { params })
// boss 资金列表查看凭证
export const getFundsTicket = (params) => axios.get('/project/api/fund/query-detail-attach/', { params })
// boss 资金列表 首付款确认
export const updateFirstPay = (params) => axios.post('/project/api/payment-orders/advance-payment', { params })
// boss 资金列表 取消支付单
export const updateCancelPay = (params) => axios.post('/project/api/payment-orders/cancel', { params })
// boss 资金列表 尾款支付
export const updateFinalPay = (params) => axios.post('/project/api/payment-orders/final-payment', { params })
// boss 资金列表 首付款确认
export const updateServicePay = (params) => axios.post('/project/api/payment-orders/service-fee', { params })
// 资金确认
export const updateFundsEnter = (params) => axios.post('/project/api/fund/confirm', params)

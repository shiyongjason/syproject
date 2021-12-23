import axios from 'axios'
// boss 资金列表
export const getFundsList = (params) => axios.get('/project/api/fund/query-page', { params })
// boss 资金列表总计
export const getFundsListTotal = (params) => axios.get('/project/api/fund/query-page-sum', { params })
// boss 资金列表查看凭证
export const getFundsTicket = (fundId) => axios.get(`/project/api/fund/query-detail/${fundId}`)
// boss 资金列表 首付款确认收到
export const updateFirstPay = (params) => axios.patch('/project/api/payment-orders/downpayment-received', params)
// boss 资金列表 首付款并未收到
export const updateFirstUnPay = (params) => axios.patch('/project/api/payment-orders/downpayment-not-received', params)
// boss 资金列表 服务费确认收到
export const updateServicePay = (params) => axios.patch('/project/api/payment-orders/service-fee-received', params)
// boss 资金列表 服务费并未收到
export const updateServiceUnPay = (params) => axios.patch('/project/api/payment-orders/service-fee-not-received', params)
// boss 资金列表 剩余货款支付确认收到
export const updateFinalPay = (params) => axios.patch('/project/api/payment-orders/balance-received', params)
// boss 资金列表 剩余货款支付确认收到
export const updateFinalUnPay = (params) => axios.patch('/project/api/payment-orders/balance-not-received', params)
// boss 资金列表 剩余货款支付确认收到
export const newFinalUnPay = (params) => axios.put('/project/api/boss/remain-payment/confirm', params)

// 支付凭证保存
export const payVoucher = (params) => axios.post('/project/api/batch-funds/boss/pay-voucher', params)
// 支付单保存
export const payOrderVoucher = (params) => axios.post('/project/api/batch-funds/boss/payment-order-voucher', params)

// 失败 待支付的 数量
export const getBnumber = (params) => axios.get('/project/api/batch-funds/boss/pay-batch-number', { params })
// 查询未支付的账单列表
export const getFundsPayBatch = (params) => axios.get('/project/api/batch-funds/boss/pay-batch', { params })
// 批量保存支付
export const payVoucherBatch = (params) => axios.post('/project/api/batch-funds/boss/pay-voucher-batch', params)
// 批量收到
export const payReceived = (params) => axios.patch('/project/api/batch-funds/boss/pay-receive-batch', params)
// 批量未收到
export const payNoReceived = (params) => axios.patch('/project/api/batch-funds/boss/pay-not-receive-batch', params)
// 批量待确认
export const confirmPay = (params) => axios.get('/project/api/batch-funds/boss/to-be-confirmed', { params })
// 剩余货款查看凭证
export const findRemainPayDetail = (params) => axios.get(`/project/api/fund/boss/${params}/remain-payment-detail`)
// 剩余货款支付
export const updateRemainPayment = (params) => axios.post('/project/api/fund/boss/remain-payment', params)
// 支付确认详情
export const findRemainPayConfirm = (params) => axios.get(`/project/api/fund/boss/${params}/remain-payment-confirm-detail`)
// 剩余货款支付确认
export const updateRemainPayConfirm = (params) => axios.put(`/project/api/fund/boss/remain-payment/confirm`, params)
// 新的 账单详情
export const findFundDetailId = (params) => axios.get(`/project/api/fund/fund-detail/${params}`)
// 新的服务费支付确认
export const updateRemainPaymentConfirm = (params) => axios.put(`/project/api/fund/boss/remain-payment/confirm`, params)
//  预付款列表
export const findPrePaymentList = (params) => axios.get(`/project/api/fund/prepayment-funds`, { params })
// 预付款总金额
export const findPrePaymentAmount = (params) => axios.get('/project/api/fund/prepayment-fund-amount', { params })

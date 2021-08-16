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
// 计算服务费
export const getComputedValue = (params) => axios.get(`/project/api/payment-orders/service-fee/calculate`, { params })
// 更新服务费和时间
export const updateServiceAmountAndTime = (params) => axios.post(`/project/api/fund/update`, params)

// 下载

export const downFile = (params) => axios.get(`/project/api/supplier-payments/${params}/download`)

// 放款交接内容信息
export const getLoanTransferContent = (paymentOrderId) => axios.get(`/project/api/loan-transfers/boss/info/${paymentOrderId}`)

// 放款交接内容-质押与终审决议信息 - 编辑保存
export const postPledgeResolution = (params) => axios.post(`/project/api/loan-transfers/boss/pledge-resolution`, params)

// 支付单-票面金额保存
export const postBillAmount = (params) => axios.post(`/project/api/bill-amount/boss`, params)

// 支付单-更多票面金额记录
export const getMoreBillAmount = (paymentOrderId) => axios.get(`/project/api/bill-amount/boss/${paymentOrderId}`)

// 放款交接内容-采购合同信息 - 编辑查询
export const getLoanTransferDoc = (paymentOrderId) => axios.get(`/project/api/loan-transfers/boss/loan-transfer-doc/${paymentOrderId}`)
// 放款交接内容-采购合同信息 - 编辑保存
export const postLoanTransferDoc = (params) => axios.post(`/project/api/loan-transfers/boss/loan-transfer-doc`, params)
// 确认并发起流程
export const postLoanTransfersConfirm = (params) => axios.post(`/project/api/loan-transfers/boss/confirm-initiate`, params)
//
export const getLoanTransferRecord = (paymentOrderId) => axios.get(`/project/api/loan-transfers/boss/${paymentOrderId}/record`)
// 发起放款交接单前 - 校验
export const getLoanTransferCheck = (paymentOrderId) => axios.get(`/project/api/loan-transfers/boss/check/${paymentOrderId}`)
// 放款交接-终审决议信息 - 查询
export const getReviewResolution = (paymentOrderId) => axios.get(`/project/api/loan-transfers/boss/review-resolution/${paymentOrderId}`)
// 收款人保存
export const postSupplierLoan = (params) => axios.post(`/project/api/loan-transfers/boss/supplier`, params)

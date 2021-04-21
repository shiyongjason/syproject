import { IPageRespUpStreamPayment, ReqUpPaymentLoanHandoverConfirm, ReqUpStreamPaymentQuery, RespLoanHandoverInfo, RespSupplier, RespSupplierInfo, ReqSupplierSubmit } from '@/interface/hbp-project'
import axios, { AxiosPromise } from 'axios'

export const getUpStreamPaymentApi: (params: ReqUpStreamPaymentQuery) => AxiosPromise<IPageRespUpStreamPayment> = (params) => {
    return axios.get('/project/api/supplier-payments/up-stream-payment/page', { params })
}
/** 放款交接信息 */
export const getLoanHandoverInfoApi: (paymentOrderId: string) => AxiosPromise<RespLoanHandoverInfo> = (paymentOrderId) => {
    return axios.get(`/project/api/supplier-payments/${paymentOrderId}/loan-handover-info`)
}
/** 放款交接确认信息 */
export const onConfirmApi: (params: ReqUpPaymentLoanHandoverConfirm) => AxiosPromise<void> = (params) => {
    return axios.post('/project/api/supplier-payments/confirm', params)
}
/** 支付单-上游支付明细 */
export const getPayConfirmApi: (paymentOrderId: string) => AxiosPromise<RespSupplier> = (paymentOrderId) => {
    return axios.get(`/project/api/supplier-payments/${paymentOrderId}`)
}
/** 支付单-上游支付查询 */
export const getPayInfoApi: (paymentOrderId: string) => AxiosPromise<RespSupplierInfo> = (paymentOrderId) => {
    return axios.get(`/project/api/supplier-payments/${paymentOrderId}/pay-confirm`)
}
/** 支付单-确认支付提交 */
export const onSubmitPayments: (params: ReqSupplierSubmit) => AxiosPromise<void> = (params) => {
    return axios.post('/project/api/supplier-payments/submit', params)
}
// /** 支付单-确认支付提交 */
// export const onSubmitPayments: (params: ReqSupplierSubmit) => AxiosPromise<void> = (params) => {
//     return axios.post('/project/api/supplier-payments/confirm', params)
// }

export const getSupplierDownload = (paymentOrderId) => axios.get(`/project/api/supplier-payments/${paymentOrderId}/download`)

export const getUpStreamPaymentTotalAmountApi: (params: ReqUpStreamPaymentQuery) => AxiosPromise<number> = (params) => {
    return axios.get('/project/api/supplier-payments/total-amount', { params })
}

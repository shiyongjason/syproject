import { IPageRespUpStreamPayment, ReqUpPaymentLoanHandoverConfirm, ReqUpStreamPaymentQuery, RespLoanHandoverInfo, RespSupplier, RespSupplierInfo } from '@/interface/hbp-project'
import axios, { AxiosPromise } from 'axios'

/*
get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
delete(url: string, config?: AxiosRequestConfig): AxiosPromise;
head(url: string, config?: AxiosRequestConfig): AxiosPromise;
post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
*/

export const getUpStreamPaymentApi: (params: ReqUpStreamPaymentQuery) => AxiosPromise<IPageRespUpStreamPayment> = (params) => {
    return axios.get('/project/api/supplier-payments/up-stream-payment/page', { params })
}
// 放款交接信息
export const getLoanHandoverInfoApi: (paymentOrderId: string) => AxiosPromise<RespLoanHandoverInfo> = (paymentOrderId) => {
    return axios.get(`/project/api/supplier-payments/${paymentOrderId}/loan-handover-info`)
}
// 放款交接确认信息
export const onConfirmApi: (params: ReqUpPaymentLoanHandoverConfirm) => AxiosPromise<void> = (params) => {
    return axios.post('/project/api/supplier-payments/confirm', params)
}
//
export const getPayConfirmApi: (paymentOrderId: string) => AxiosPromise<RespSupplier> = (paymentOrderId) => {
    return axios.get(`/project/api/supplier-payments/${paymentOrderId}`)
}


import { IPagePrepaymentResponse, PrepaymentDetailResponse, PrepaymentSupplierSubmitResponse, RespContractSignHistory } from '@/interface/hbp-project'
import axios, { AxiosPromise } from 'axios'

export const getPrePayList: (params) => AxiosPromise<IPagePrepaymentResponse> = (params) => {
    return axios.get('/project/api/prepayments/boss', { params })
}
// 预付款详情
export const getPrePayDetail: (params) => AxiosPromise<any> = (params:number) => {
    return axios.get(`/project/api/prepayments/boss/${params}`)
}

export const submitPrePay: (params) => AxiosPromise<void> = (params:PrepaymentSupplierSubmitResponse) => {
    return axios.post(`/project/api/supplier-payments/prepayment-submit`, params)
}

export const getPreTotal: (params) => AxiosPromise<IPagePrepaymentResponse> = (params) => {
    return axios.get(`/project/api/prepayments/boss/total-amount`, { params })
}

export const passPre: (params) => AxiosPromise<void> = (id) => {
    return axios.patch(`/project/api/prepayments/boss/${id}/examine-pass`)
}

export const passFailPre: (id, params) => AxiosPromise<void> = (id, params) => {
    return axios.patch(`/project/api/prepayments/boss/${id}/examine-fail`, params)
}

export const updateFinancePass : (id)=>AxiosPromise<void> = (id) => {
    return axios.patch(`/project/api/prepayments/boss/${id}/finance-examine-pass`)
}

export const updateFinanceFail : (id, params)=>AxiosPromise<void> = (id, params) => {
    return axios.patch(`/project/api/prepayments/boss/${id}/finance-examine-fail`, params)
}

export const getApprovalHistory: (params) => AxiosPromise<RespContractSignHistory[]> = (params) => {
    return axios.get(`/project/api/contract-approval/${params}/prepayment-order/approval-history`)
}

export const saveWriteOff: (id, params) => AxiosPromise = (id, params) => {
    return axios.patch(`/project/api/prepayments/boss/${id}/write-off`, params)
}

export const updatePrePay: (params) => AxiosPromise = (params) => {
    return axios.post(`/project/api/supplier-payments/prepayment-member`, params)
}

export const updateOnlineBank :(params)=>AxiosPromise = (params) => {
    return axios.post(`/project/api/supplier-payments/prepayment/online-bank-payment-confirm`, params)
}
// 司库 支付
export const updatePayOnline :(params)=>AxiosPromise = (params) => {
    return axios.patch(`/project/api/prepayments/boss/pay-online/${params}`)
}
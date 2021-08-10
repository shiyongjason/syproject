
import { IPagePrepaymentResponse, PrepaymentDetailResponse, PrepaymentSupplierSubmitResponse } from '@/interface/hbp-project'
import axios, { AxiosPromise } from 'axios'

export const getPrePayList: (params) => AxiosPromise<IPagePrepaymentResponse> = (params) => {
    return axios.get('/project/api/prepayments/boss', { params })
}
// 预付款详情
export const getPrePayDetail: (params) => AxiosPromise<PrepaymentDetailResponse> = (params:number) => {
    return axios.get(`/project/api/prepayments/boss/${params}`)
}

export const submitPrePay: (params) => AxiosPromise<void> = (params:PrepaymentSupplierSubmitResponse) => {
    return axios.post(`/project/api/supplier-payments/prepayment-submit`, params)
}

export const getPreTotal: (params) => AxiosPromise<IPagePrepaymentResponse> = (params) => {
    return axios.get(`/project/api/prepayments/boss/total-amount`, params)
}

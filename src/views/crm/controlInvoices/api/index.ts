import { EqpInvoiceDetailResponse, EqpInvoiceSubmitRequest, IPageEqpInvoicePageResponse, IPageServiceInvoicePageResponse, ServiceInvoiceDetailResponse, ServiceInvoiceOpenRequest, InvoiceRejectRequest, ServiceInvoiceSubmitRequest, ServiceInvoiceFundResponse, EqpTotalInvoiceAmountResponse, IPageEqpInvoicePaymentOrderPageResponse } from '@/interface/hbp-project'
import axios, { AxiosPromise } from 'axios'

export const updateServiceInvoice: (params: ServiceInvoiceSubmitRequest) => AxiosPromise<void> = (params) => {
    return axios.post(`/project/boss/service-invoice`, params)
}

export const updateSubmit: (params: string) => AxiosPromise<void> = (params) => {
    return axios.patch(`/project/boss/service-invoice/submit/${params}`)
}

export const updateReject: (params: InvoiceRejectRequest) => AxiosPromise<void> = (params) => {
    return axios.patch(`/project/boss/service-invoice/reject`, params)
}

export const updateOpen: (params: ServiceInvoiceOpenRequest) => AxiosPromise<void> = (params) => {
    return axios.patch(`/project/boss/service-invoice/open`, params)
}

export const getInvoiceList: (params: any) => AxiosPromise<IPageServiceInvoicePageResponse> = (params) => {
    return axios.get(`/project/boss/service-invoice`, { params })
}

export const getInvoiceTotal: (params: any) => AxiosPromise<any> = (params) => {
    return axios.get(`/project/boss/service-invoice/total-amount`, { params })
}
//  服务费账单列表
export const getServiceFunds: (params: any) => AxiosPromise<ServiceInvoiceFundResponse> = (params) => {
    return axios.get(`/project/boss/service-invoice/funds`, { params })
}

/** 详情 */
export const getInvoiceDetail: (params: string) => AxiosPromise<ServiceInvoiceDetailResponse> = (params) => {
    return axios.get(`/project/boss/service-invoice/${params}`)
}

export const updateEqpInvoice: (params: Partial<EqpInvoiceSubmitRequest>) => AxiosPromise<void> = (params) => {
    return axios.post(`/project/boss/eqp-invoice`, params)
}
// 设备详情
export const getEqpDetail: (params: string) => AxiosPromise<Partial<EqpInvoiceDetailResponse>> = (params) => {
    return axios.get(`/project/boss/eqp-invoice/${params}`)
}
// 设备列表
export const getEqpList: (params: any) => AxiosPromise<IPageEqpInvoicePageResponse> = (params) => {
    return axios.get(`/project/boss/eqp-invoice`, { params })
}

// 提交
export const submitEqp: (params: any) => AxiosPromise<void> = (params) => {
    return axios.patch(`/project/boss/eqp-invoice/submit/${params}`)
}

// 驳回
export const rejectEqp: (params: InvoiceRejectRequest) => AxiosPromise<void> = (params) => {
    return axios.patch(`/project/boss/eqp-invoice/reject`, params)
}

export const getEqpTotal: (params: any) => AxiosPromise<EqpTotalInvoiceAmountResponse> = (params) => {
    return axios.get(`/project/boss/eqp-invoice/total-amount`, { params })
}

// 项目编号  登录人分部查询 项目
export const getProjectPage: (params: any) => AxiosPromise<any> = (params) => {
    return axios.get(`/memeber/openapi/project/invoice/project-page`, { params })
}

// 设备 支付单开窗列表
export const geEqpPaymentOrderPage: (params: any) => AxiosPromise<IPageEqpInvoicePaymentOrderPageResponse> = (params) => {
    return axios.get(`/project/boss/eqp-invoice/payment-order-page`, { params })
}
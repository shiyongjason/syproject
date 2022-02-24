import { EqpInvoiceDetailResponse, EqpInvoiceSubmitRequest, IPageEqpInvoicePageResponse, IPageServiceInvoicePageResponse, ServiceInvoiceDetailResponse, ServiceInvoiceOpenRequest, InvoiceRejectRequest, ServiceInvoiceSubmitRequest } from '@/interface/hbp-project'
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
/** 详情 */
export const getInvoiceDetail: (params: string) => AxiosPromise<ServiceInvoiceDetailResponse> = (params) => {
    return axios.get(`/project/boss/service-invoice/${params}`)
}

export const updateEqpInvoice: (params: EqpInvoiceSubmitRequest) => AxiosPromise<void> = (params) => {
    return axios.post(`/project/boss/eqp-invoice`)
}
// 设备详情
export const getEqpDetail: (params: string) => AxiosPromise<EqpInvoiceDetailResponse> = (params) => {
    return axios.get(`/project/boss/eqp-invoice/${params}`)
}
// 设备列表
export const getEqpList: (params: any) => AxiosPromise<IPageEqpInvoicePageResponse> = (params) => {
    return axios.get(`/project/boss/eqp-invoice`, { params })
}

// 提交
export const submitEqp: (params: any) => AxiosPromise<void> = (params) => {
    return axios.get(`/project/boss/eqp-invoice/submit/${params}`)
}

// 驳回
export const rejectEqp: (params: InvoiceRejectRequest) => AxiosPromise<void> = (params) => {
    return axios.patch(`/project/boss/eqp-invoice/reject`)
}
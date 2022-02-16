import { IPageServiceInvoicePageResponse, ServiceInvoiceDetailResponse, ServiceInvoiceOpenRequest, ServiceInvoiceRejectRequest, ServiceInvoiceSubmitRequest } from '@/interface/hbp-project'
import axios, { AxiosPromise } from 'axios'

export const updateServiceInvoice: (params: ServiceInvoiceSubmitRequest) => AxiosPromise<void> = (params) => {
    return axios.post(`/project/boss/service-invoice`, params)
}

export const updateSubmit: (params: string) => AxiosPromise<void> = (params) => {
    return axios.patch(`/project/boss/service-invoice/submit/${params}`)
}

export const updateReject: (params: ServiceInvoiceRejectRequest) => AxiosPromise<void> = (params) => {
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

import { IPagePrepaymentResponse, PrepaymentDetailResponse } from '@/interface/hbp-project'
import axios, { AxiosPromise } from 'axios'

export const getPrePayList: (params) => AxiosPromise<IPagePrepaymentResponse> = (params) => {
    return axios.get('/project/api/prepayments/boss', { params })
}
// 预付款详情
export const getPrePayDetail: (params) => AxiosPromise<PrepaymentDetailResponse> = (params:number) => {
    return axios.get(`/project/api/prepayments/boss/${params}`)
}

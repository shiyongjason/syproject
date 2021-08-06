
import { IPagePrepaymentResponse } from '@/interface/hbp-project'
import axios, { AxiosPromise } from 'axios'

export const getPrePayList: (params) => AxiosPromise<IPagePrepaymentResponse> = (params) => {
    return axios.get('/project/api/prepayments/boss', { params })
}
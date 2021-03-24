import { IPageRespUpStreamPayment, ReqUpStreamPaymentQuery } from '@/interface/hbp-project'
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

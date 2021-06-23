import axios, { AxiosPromise } from 'axios'
import { B2bUrl } from '@/api/config'

export type DictionaryList = Array<{ key: string, value: string }>

export const getChiness: () => AxiosPromise<any> = () => {
    return axios.get(B2bUrl + 'merchant/openapi/region/provinces/nesting', {})
}

// 获取线索列表
export const getThreadList: (params: any) => AxiosPromise<any> = (params) => {
    return axios.get('memeber/api/clue/boss/page', { params })
}

// 获取线索详情
export const getThreadDetail: (params: any) => AxiosPromise<any> = (params) => {
    return axios.get(`memeber/api/clue/boss/${params}`)
}

// 分配线索给客户经理
export const assignmentCustomer: (params: any) => AxiosPromise<any> = (params) => {
    return axios.post('memeber/api/clue/boss/assignment-customer', { params })
}

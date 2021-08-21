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

// 检验当前手机号是否存在
export const checkThreadIsRight: (params: any) => AxiosPromise<any> = (params) => {
    return axios.get(`memeber/api/clue/member-validate/${params}`)
}

// 新建线索
export const createThread: (params: any) => AxiosPromise<any> = (params) => {
    return axios.post('memeber/api/clue/boss', params)
}

// 新增跟进记录
export const addFlowUp: (params: any) => AxiosPromise<any> = (params) => {
    return axios.post('memeber/api/flow-up/boss', params)
}

// 获取线索跟进记录
export const getFlowUp: (params: any) => AxiosPromise<any> = (params) => {
    return axios.get('memeber/api/flow-up/boss', { params })
}

// 获取线索列表统计
export const getThreadListCount: (params: any) => AxiosPromise<any> = (params) => {
    return axios.get('memeber/api/clue/boss/page/counts', { params })
}
// 获取线索记录统计
export const getFlowUpCount: (params: any) => AxiosPromise<any> = (params) => {
    return axios.get('memeber/api/flow-up/count/boss', { params })
}

// 获取线索详情
export const getThreadDetail: (params: any) => AxiosPromise<any> = (params) => {
    return axios.get(`memeber/api/clue/boss/${params}`)
}

// 获取线索详情
export const updateThreadDetail: (params: any) => AxiosPromise<any> = (params) => {
    return axios.put('memeber/api/clue/boss', params)
}

// 分配线索给客户经理
export const assignmentCustomer: (params: any) => AxiosPromise<any> = (params) => {
    return axios.post('memeber/api/clue/boss/assignment-customer', params)
}

// 公司列表
export const companyList: (params: any) => AxiosPromise<any> = (params) => {
    return axios.get('memeber/api/crm/company/list', params)
}

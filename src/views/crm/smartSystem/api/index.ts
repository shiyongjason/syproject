import axios, { AxiosPromise } from 'axios'

// 列表
export const getIntelligentList: (params: any) => AxiosPromise<any> = (params) => {
    return axios.get('/memeber/api/boss/intelligent', { params })
}

// 上移
export const getIntelligentUp: (params: any) => AxiosPromise<any> = (params) => {
    return axios.patch(`/memeber/api/boss/intelligent/${params.id}/move-up`, {})
}

// 下移
export const getIntelligentDown: (params: any) => AxiosPromise<any> = (params) => {
    return axios.patch(`/memeber/api/boss/intelligent/${params.id}/move-down`, {})
}

// 删除
export const deleteIntelligent: (id: any) => AxiosPromise<any> = (id) => {
    return axios.delete(`/memeber/api/boss/intelligent/${id}`, {})
}

// 新增智能化系统
export const addIntelligent: (params: any) => AxiosPromise<any> = (params) => {
    return axios.post(`/memeber/api/boss/intelligent`, params)
}

// 智能化系统详情
export const getIntelligent: (id: any) => AxiosPromise<any> = (id) => {
    return axios.get(`/memeber/api/boss/intelligent/${id}`, {})
}
// 修改智能化系统
export const saveIntelligent: (id: any) => AxiosPromise<any> = (params) => {
    return axios.put(`/memeber/api/boss/intelligent/${params.id}`, params)
}

// 智能化选择工程方案列表
export const getSchemeList: (params: any) => AxiosPromise<any> = (params) => {
    return axios.get(`/memeber/api/boss/intelligent/scheme`, { params })
}

// 检查名称重复，无返回 重复直接报错
export const getRepetition: (params: any) => AxiosPromise<any> = (params) => {
    return axios.get(`/memeber/api/boss/intelligent/check-name`, { params })
}

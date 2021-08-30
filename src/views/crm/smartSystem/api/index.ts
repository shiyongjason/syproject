import axios, { AxiosPromise } from 'axios'

export const getIntelligentList: (params: any) => AxiosPromise<any> = (params) => {
    return axios.get('/member/api/boss/intelligent', {})
}

export const getIntelligentUp: (params: any) => AxiosPromise<any> = (params) => {
    return axios.get('/member/api/boss/intelligent/{id}/move-up', {})
}

export const getIntelligentDown: (params: any) => AxiosPromise<any> = (params) => {
    return axios.get('/member/api/boss/intelligent/{id}/move-down', {})
}

export const deleteIntelligent: (id: any) => AxiosPromise<any> = (id) => {
    return axios.delete(`/member/api/boss/intelligent/${id}`, {})
}

export const saveIntelligent: (params: any) => AxiosPromise<any> = (params) => {
    return axios.get(`/member/api/boss/intelligent`, params)
}

export const getIntelligent: (id: any) => AxiosPromise<any> = (id) => {
    return axios.get(`/member/api/boss/intelligent/${id}`, {})
}

export const getSchemeList: (params: any) => AxiosPromise<any> = (params) => {
    return axios.get(`/member/api/boss/intelligent/scheme`, { params })
}

import { ccpBaseUrl, B2bUrl, interfaceUrl } from '@/api/config'
import axios from 'axios'

// 省市区
export const getChiness = (params) => {
    return axios.get(ccpBaseUrl + 'common/region/provinces/nesting', { params })
}

export const getCompanyBosslist = (params) => {
    return axios.post('memeber/api/crm/company/boss/page', params)
}

// CRM 认证详情
export const getBusinessAuthen = (params) => {
    return axios.get(B2bUrl + `merchant/api/crm/company/authentication-info/${params}`)
}

// CRM 认证状态
export const getBusinessDetail = (params) => {
    return axios.get(B2bUrl + 'merchant/api/crm/company/boss/detail', { params })
}
// 获取详情统计
export const getCrmauthenStatic = (params) => {
    return axios.post(B2bUrl + 'merchant/api/crm/company/boss/statistics', params)
}

// 分部列表
export const findBrandsList = (params) => {
    return axios.get(B2bUrl + 'common/api/organizations/branches', { params })
}

// 更新认证企业
export const updateCrmauthen = (params) => {
    return axios.put(B2bUrl + 'merchant/api/crm/company/boss/update', params)
}

export const getPlatList = (params) => axios.get(interfaceUrl + 'develop/developbasicinfo/queryCompany', { params })

export const putWhiterecord = (params) => axios.post(B2bUrl + 'merchant/api/crm/company/white-list-record', params)

export const findWhiterecord = (params) => axios.get(B2bUrl + 'merchant/api/crm/company/white-list-record/list', { params })

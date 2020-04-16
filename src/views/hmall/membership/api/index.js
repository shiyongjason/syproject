import { ccpBaseUrl, B2bUrl } from '@/api/config'
import axios from 'axios'
// 省市区
export const getChiness = (params) => {
    return axios.get(ccpBaseUrl + 'common/region/provinces/nesting', { params })
}
// 更新商家详情
export const putMerchantDetail = (params) => {
    return axios.put(B2bUrl + 'merchant/api/company/boss/merchant/detail', params)
}
// 分部列表
export const findBrandsList = (params) => {
    return axios.get(B2bUrl + 'common/api/organizations/branches', { params })
}

// 获取会员详情
export const getBossMemberDetail = (params) => {
    return axios.get(B2bUrl + 'merchant/api/company/boss/member/detail', { params })
}
// 更新会员详情
export const putMemberDetail = (params) => {
    return axios.put(B2bUrl + 'merchant/api/company/boss/member/detail', params)
}
// 更新会员详情
export const getMerchantList = (params) => {
    return axios.get(B2bUrl + 'merchant/api/company/boss/list', { params })
}
// 账号列表
export const getAccountList = (params) => {
    return axios.get(B2bUrl + 'uaa/openapi/account/list', { params })
}
// 账号详情
export const getAccountDetail = (params) => {
    return axios.get(B2bUrl + `uaa/openapi/account/${params}`)
}
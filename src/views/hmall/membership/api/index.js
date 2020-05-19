import { B2bUrl } from '@/api/config'
import axios from 'axios'
// 省市区
export const getChiness = (params) => {
    return axios.get(B2bUrl + 'common/region/provinces/nesting', { params })
}
// 获取商家列表
export const getBossMerchant = (params) => {
    return axios.get(B2bUrl + 'merchant/api/company/boss/merchant', { params })
}
// 获取商家详情
export const getBossMerchantDetail = (params) => {
    return axios.get(B2bUrl + 'merchant/api/company/boss/merchant/detail', { params })
}
// 获取商家详情统计
export const getBossMerchantStatic = (params) => {
    return axios.get(B2bUrl + 'merchant/api/company/boss/merchant/statistics', { params })
}
// 更新商家详情
export const putMerchantDetail = (params) => {
    return axios.put(B2bUrl + 'merchant/api/company/boss/merchant/detail', params)
}
// 分部列表
export const findBrandsList = (params) => {
    return axios.get(B2bUrl + 'common/api/organizations/branches', { params })
}

// 启用禁用商家
export const changeState = (params) => {
    return axios.put(B2bUrl + 'merchant/api/company/boss/merchant/enable-status', params)
}
// 获取会员列表
export const getBossMember = (params) => {
    return axios.post(B2bUrl + 'merchant/api/company/boss/member', params)
}
// 获取商家详情统计
export const getBossMemberStatic = (params) => {
    return axios.post(B2bUrl + 'merchant/api/company/boss/member/statistics', params)
}
// 启用禁用会员
export const changeMemberState = (params) => {
    return axios.put(B2bUrl + 'merchant/api/company/boss/member/enable-status', params)
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

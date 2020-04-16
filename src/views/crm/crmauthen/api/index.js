import { ccpBaseUrl, B2bUrl } from '@/api/config'
import axios from 'axios'
// 省市区
export const getChiness = (params) => {
    return axios.get(ccpBaseUrl + 'common/region/provinces/nesting', { params })
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

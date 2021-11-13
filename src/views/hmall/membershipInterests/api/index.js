import { B2bUrl } from '@/api/config'
import axios from 'axios'
// 省市区
export const getChiness = (params) => {
    return axios.get(B2bUrl + 'merchant/openapi/region/provinces/nesting', { params })
}
export const fullReturnDetails = (params) => {
    return axios.get(B2bUrl + 'ops/boss/rebate/flow/page', { params })
}
export const fullReturnBalance = (params) => {
    return axios.get(B2bUrl + 'ops/boss/rebate/wallet/page', { params })
}
export const totalBalance = (params) => {
    return axios.get(B2bUrl + 'ops/boss/rebate/wallet/total-balance', { params })
}

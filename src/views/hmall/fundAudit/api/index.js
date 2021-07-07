import axios from 'axios'
import { B2bUrl } from '@/api/config'

// ================== fundAudit 资金审核 ============================
// 资金申请审核列表
export const findFundList = (params) => {
    return axios.get(`${B2bUrl}fund/boss/fund/apply/verify-page`, { params })
}
// 资金申请详情
export const findFundInfo = (params) => {
    return axios.get(`${B2bUrl}fund/boss/fund/apply/${params.id}`, { params })
}
// 资金审核
export const checkFund = (params) => {
    return axios.post(`${B2bUrl}fund/boss/fund/apply/verify`, params)
}
// 代采订单审核列表
export const findAuditFundList = (params) => {
    return axios.get(`${B2bUrl}fund/boss/agent/order/audit-page`, { params })
}
// 代采订单审核
export const auditFund = (params) => {
    return axios.patch(`${B2bUrl}fund/boss/agent/order/audit`, { params })
}
// 代采订单详情
export const findAuditFundInfo = (params) => {
    return axios.get(`${B2bUrl}fund/boss/agent/order/${params.id}`, { params })
}
// 代采订单预付款确认列表
export const findAdvanceList = (params) => {
    return axios.get(`${B2bUrl}fund/boss/agent/order/confirm-prepay-page`, { params })
}

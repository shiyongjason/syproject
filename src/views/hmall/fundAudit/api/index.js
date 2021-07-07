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
// 代采订单预付款确认
export const sureFund = (params) => {
    return axios.patch(`${B2bUrl}fund/boss/agent/order/confirm-prepay`, { params })
}
// 代采订单预付款关闭
export const closeFund = (params) => {
    return axios.patch(`${B2bUrl}fund/boss/agent/order/close`, { params })
}
// 代采订单预付款订单同步
export const syncFund = (params) => {
    return axios.patch(`${B2bUrl}fund/boss/agent/order/${params.id}/sync-to-mis`, { params })
}
// 代采订单预付款资金同步
export const syncMisFund = (params) => {
    return axios.patch(`${B2bUrl}fund/boss/agent/order/${params.id}/sync-fund-to-mis`, { params })
}
// 代采订单状态列表
export const findStatusFund = (params) => {
    return axios.get(`${B2bUrl}fund/boss/agent/order/confirmed-prepay-page`, { params })
}

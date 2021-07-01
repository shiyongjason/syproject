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

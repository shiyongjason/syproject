import axios from 'axios'
import { B2bUrl } from '@/api/config'

// ================== finance 财务管理 ============================
// 服务费收取明细
export const findServiceCharge = (params) => {
    return axios.get(`${B2bUrl}payment/api/boss/service-fee/withdraws/received`, { params })
}
// 服务费提现明细
export const findCashWithdrawal = (params) => {
    return axios.get(`${B2bUrl}payment/api/boss/service-fee/withdraws`, { params })
}
// 服务费提现明细
export const cashWithdrawal = (params) => {
    return axios.post(`${B2bUrl}payment/api/boss/service-fee/withdraws`, params)
}
// 账户信息
export const findBankAccountInfo = (params) => {
    return axios.get(`${B2bUrl}payment/api/boss/service-fee/user-info`, { params })
}
// 提现银行卡信息
export const findBankCardInfo = (params) => {
    return axios.get(`${B2bUrl}payment/api/boss/service-fee/bank-card`, { params })
}
// 提现银行卡信息
export const getSmsCode = () => {
    return axios.post(`${B2bUrl}payment/api/boss/service-fee/withdraws/sms`, {})
}
// 订单列表
export const findOrders = (params) => {
    return axios.get(`${B2bUrl}order/boss/child-orders/finance`, { params })
}
// 营销列表
export const findMarketing = (params) => {
    return axios.get(`${B2bUrl}order/boss/child-orders/market`, { params })
}
// 商品明细列表
export const findProductsInfo = (params) => {
    return axios.get(`${B2bUrl}order/boss/child-orders/finance-product`, { params })
}
// 查询所有类目
export const findAllCategory = (params) => axios.get(B2bUrl + 'product/api/categories/tree', { params })
// 资金代采 商家明细
export const findMerchant = (params) => {
    return axios.get(`${B2bUrl}fund/boss/fund`, { params })
}
// 资金代采 商家明细统计
export const findMerchantStatist = (params) => {
    return axios.get(`${B2bUrl}fund/boss/fund/statistics`, { params })
}
// 资金代采 交易记录线上回款
export const findOnlineRepay = (params) => {
    return axios.get(`${B2bUrl}fund/boss/repay/online-page`, { params })
}
// 资金代采 交易记录线下回款
export const findOfflineRepay = (params) => {
    return axios.get(`${B2bUrl}fund/boss/repay/offline-page`, { params })
}
// 资金代采 交易记录预付款
export const findPrepayRepay = (params) => {
    return axios.get(`${B2bUrl}fund/boss/repay/prepay-page`, { params })
}
// 资金代采 交易记录统计
export const findRepayStatist = (params) => {
    return axios.get(`${B2bUrl}fund/boss/repay/statistics`, { params })
}

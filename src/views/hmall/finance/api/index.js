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
    return axios.post(`${B2bUrl}payment/api/boss/service-fee/withdraws/sms`, { })
}
// 订单列表
export const findOrders = (params) => {
    return axios.get(`${B2bUrl}order/api/boss/orders/finance-orders`, { params })
}
// 营销列表
export const findMarketing = (params) => {
    return axios.get(`${B2bUrl}order/api/boss/orders/finance-market`, { params })
}
// 商品明细列表
export const findProductsInfo = (params) => {
    return axios.get(`${B2bUrl}order/api/boss/orders/finance-products`, { params })
}
// 查询所有类目
export const findAllCategory = (params) => axios.get(B2bUrl + 'product/api/categories/tree', { params })
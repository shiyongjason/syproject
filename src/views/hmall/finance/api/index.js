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
// ================== finance 运费 ============================
// 运费订单列表
export const findFreightOrders = (params) => {
    return axios.get(`${B2bUrl}order/boss/freight-orders`, { params })
}
// 运费订单详情列表
export const findFreightInfo = (params) => {
    return axios.get(`${B2bUrl}order/boss/freight-orders/${params.id}`, {})
}
// 运费订单待支付编辑运费价格
export const putFreightPrice = (params) => {
    return axios.put(`${B2bUrl}order/boss/freight-order-sku/update-price`, params)
}
// 运费资金管理明细
export const findFreightList = (params) => {
    return axios.get(`${B2bUrl}order/boss/freight-orders/fund`, { params })
}
// 运费资金管理账户明细
export const findFreightBankAccountInfo = (params) => {
    return axios.get(`${B2bUrl}payment/api/boss/freight/user-info`, { params })
}
// 运费资金管理提现明细
export const findFreightWithdrawal = (params) => {
    return axios.get(`${B2bUrl}payment/api/boss/freight/withdraws`, { params })
}
// 运费资金管理提现
export const freightcashWithdrawal = (params) => {
    return axios.post(`${B2bUrl}payment/api/boss/freight/withdraws`, params)
}
// 运费资金管理银行卡信息
export const findFreightBankCardInfo = (params) => {
    return axios.get(`${B2bUrl}payment/api/boss/freight/bank-card`, { params })
}
// 运费资金管理提现 短信验证码
export const getFreightSmsCode = () => {
    return axios.post(`${B2bUrl}payment/api/boss/freight/withdraws/sms`, {})
}
// 线上运费明细列表
export const findOnlinefreightList = (params) => {
    return axios.get(`${B2bUrl}order/boss/freight-orders/detail`, { params })
}

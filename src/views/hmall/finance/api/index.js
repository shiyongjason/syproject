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
// 资金代采 商家明细合计
export const findMerchantAll = (params) => {
    return axios.get(`${B2bUrl}fund/boss/fund/finance/overview`, { params })
}
// 资金代采 交易记录线上回款
// export const findOnlineRepay = (params) => {
//     return axios.get(`${B2bUrl}fund/boss/repay/online-page`, { params })
// }
// 资金代采 交易记录单分享订单回款
export const findOnlineRepay = (params) => {
    return axios.get(`${B2bUrl}fund/boss/repay/trade-record-sale`, { params })
}
// 资金代采 交易记录线下回款
// export const findOfflineRepay = (params) => {
//     return axios.get(`${B2bUrl}fund/boss/repay/offline-page`, { params })
// }
// 资金代采 交易记录线下提前还款、网银支付提前还款
export const findOfflineRepay = (params) => {
    return axios.get(`${B2bUrl}fund/boss/repay/trade-record-advance`, { params })
}
// 资金代采 交易记录预付款
// export const findPrepayRepay = (params) => {
//     return axios.get(`${B2bUrl}fund/boss/repay/prepay-page`, { params })
// }
// 资金代采 交易记录线下预付款、网银支付预付款
export const findPrepayRepay = (params) => {
    return axios.get(`${B2bUrl}fund/boss/agent/order/trade-record-prepay`, { params })
}
// 资金代采 交易记录线上回款 线下回款 预付款合计
// export const findRepayAll = (params) => {
//     return axios.get(`${B2bUrl}fund/boss/repay/trade-record/statistics`, { params })
// }
// 资金代采 单分享订单回款金额合计
export const findOnlineRepayAll = (params) => {
    return axios.get(`${B2bUrl}fund/boss/repay/trade-record-sale/total-amount`, { params })
}
// 资金代采 提前还款金额、网银支付提前还款合计
export const findOfflineRepayAll = (params) => {
    return axios.get(`${B2bUrl}fund/boss/repay/trade-record-advance/total-amount`, { params })
}
// 资金代采 预付款金额合计、网银支付预付款合计
export const findAdvanceRepayAll = (params) => {
    return axios.get(`${B2bUrl}fund/boss/agent/order/trade-record-prepay/total-amount`, { params })
}
// 资金代采 交易记录统计
export const findRepayStatist = (params) => {
    return axios.get(`${B2bUrl}fund/boss/repay/statistics`, { params })
}
// 资金申请详情
export const findApplyList = (params) => {
    return axios.get(`${B2bUrl}fund/boss/fund/apply`, { params })
}
// 资金申请详情 合计
export const findApplyAll = (params) => {
    return axios.get(`${B2bUrl}fund/boss/fund/apply/statistics`, { params })
}
// 资金代付,占用详情
export const findPrepayList = (params) => {
    return axios.get(`${B2bUrl}fund/boss/agent/order/occupation`, { params })
}
// 资金代付,占用详情 合计
export const findPrepayAll = (params) => {
    return axios.get(`${B2bUrl}fund/boss/agent/order/occupation/statistics`, { params })
}
// 资金回款详情
export const findOccupationList = (params) => {
    return axios.get(`${B2bUrl}fund/boss/repay`, { params })
}
// 资金回款详情 合计
export const findOccupationAll = (params) => {
    return axios.get(`${B2bUrl}fund/boss/repay/finance/overview`, { params })
}
// 回款 资金同步
export const syncFundMis = (id, params) => {
    return axios.patch(`${B2bUrl}fund/boss/repay/${id}/sync-fund-to-mis`, params)
}
// 代采资金 提现明细
export const findAgentCharge = (params) => {
    return axios.get(`${B2bUrl}payment/boss/purchasing-agent-funds/withdraws`, { params })
}
// 代采资金提现
export const findAgentCashWithdrawal = (params) => {
    return axios.get(`${B2bUrl}payment/boss/purchasing-agent-funds/withdraws`, { params })
}
// 服务费提现明细
export const withdrawal = (params) => {
    return axios.post(`${B2bUrl}payment/boss/purchasing-agent-funds/withdraws`, params)
}
// 代采资金 账户信息
export const findAgentBankAccountInfo = (params) => {
    return axios.get(`${B2bUrl}payment/boss/purchasing-agent-funds/user-info`, { params })
}
// 代采资金 提现银行卡信息
export const findAgentBankCardInfo = (params) => {
    return axios.get(`${B2bUrl}payment/boss/purchasing-agent-funds/bank-card`, { params })
}
// 代采资金 提现 验证码
export const getAgentSmsCode = () => {
    return axios.post(`${B2bUrl}payment/boss/purchasing-agent-funds/withdraws/sms`, {})
}
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
    return axios.get(`${B2bUrl}payment/boss/freight/user-info`, { params })
}
// 运费资金管理提现明细
export const findFreightWithdrawal = (params) => {
    return axios.get(`${B2bUrl}payment/boss/freight/withdraws`, { params })
}
// 运费资金管理提现
export const freightcashWithdrawal = (params) => {
    return axios.post(`${B2bUrl}payment/boss/freight/withdraws`, params)
}
// 运费资金管理银行卡信息
export const findFreightBankCardInfo = (params) => {
    return axios.get(`${B2bUrl}payment/boss/freight/bank-card`, { params })
}
// 运费资金管理提现 短信验证码
export const getFreightSmsCode = () => {
    return axios.post(`${B2bUrl}payment/boss/freight/withdraws/sms`, {})
}
// 线上运费明细列表
export const findOnlinefreightList = (params) => {
    return axios.get(`${B2bUrl}order/boss/freight-orders/detail`, { params })
}
// 账户信息
export const findBankInfo = (params) => {
    return axios.get(`${B2bUrl}payment/boss/purchasing-agent-funds/user-info`, { params })
}

// 资金同步
export const syncToNc = (freightOrderId) => {
    return axios.patch(`${B2bUrl}order/boss/freight-orders/sync-to-nc/${freightOrderId}`)
}
// 运费修改
export const putFreightAmount = (params) => {
    return axios.put(`${B2bUrl}order/boss/freight-orders/update-amount`, params)
}
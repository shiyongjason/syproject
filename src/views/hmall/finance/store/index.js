
import * as types from './mutation-types'
import { findServiceCharge, findCashWithdrawal, findBankAccountInfo, findBankCardInfo, findOrders, findMarketing, findProductsInfo, findFreightOrders, findFreightInfo, findFreightList, findFreightBankAccountInfo, findFreightWithdrawal, findFreightBankCardInfo, findOnlinefreightList, findBankInfo, findMerchant, findMerchantStatist, findMerchantAll, findOnlineRepay, findOfflineRepay, findPrepayRepay, findRepayStatist, findApplyList, findPrepayList, findOccupationList, findApplyAll, findPrepayAll, findOccupationAll, findAgentCharge, findAgentCashWithdrawal, findAgentBankAccountInfo, findAgentBankCardInfo, findRepayAll, findAdvanceRepayAll, findOfflineRepayAll, findOnlineRepayAll } from '../api'

const state = {
    // 服务费收取明细
    serviceChargeInfo: {},
    // 服务费提现明细
    cashWithdrawalInfo: [],
    // 银行账户信息
    bankAccountInfo: {},
    // 提现银行卡信息
    bankCardInfo: {
        bankPhoneNumber: ''
    },
    // 订单信息
    orderList: [],
    // 营销列表
    marketingList: [],
    // 商品明细列表信息
    productsInfo: {},
    // 资金代采 商家明细
    merchantList: [],
    // 资金代采 商家明细统计
    merchantStatistInfo: {},
    // 资金代采 商家明细合计
    merchantAllInfo: {},
    // 交易记录线上回款
    onlineRepayList: [],
    // 交易记录线下回款
    offlineRepayList: [],
    // 交易记录预付款
    prepayRepayList: [],
    // 交易记录线上回款 线下回款 预付款 合计
    // repayAll: {},
    onlineRepayAll: {},
    offlineRepayAll: {},
    advanceRepayAll: {},
    // 交易记录统计
    repayStatistInfo: {},
    // 资金申请详情
    applyList: {},
    // 资金代付,占用详情
    prepayList: {},
    // 资金回款详情
    occupationList: {},
    // 资金申请详情 合计
    applyAllInfo: {},
    // 资金代付,占用详情 合计
    prepayAllInfo: {},
    // 资金回款详情 合计
    occupationAllInfo: {},
    // 代采资金 提现明细
    agentCharge: {},
    // 代采资金提现
    agentCashWithdrawal: [],
    // 代采资金 账户信息
    agentBankAccountInfo: {},
    // 代采资金 提现银行卡信息
    agentBankCardInfo: {
        agentBankPhoneNumber: ''
    },
    // 运费订单列表
    freightOrdersList: {},
    // 运费订单查看详情
    freightOrdersInfo: {},
    // 运费资金管理明细
    freightList: {},
    // 运费资金管理账户明细
    freightBankAccountInfo: {},
    // 运费资金管理提现明细
    freightWithdrawalInfo: {},
    // 运费资金管理提现银行卡信息
    freightBankCardInfo: {},
    // 线上运费明细
    onlinefreightList: {},
    // 资金代采账户明细
    bankInfo: {}
}

const getters = {
    serviceChargeInfo: state => state.serviceChargeInfo,
    cashWithdrawalInfo: state => state.cashWithdrawalInfo,
    bankAccountInfo: state => state.bankAccountInfo,
    bankCardInfo: state => state.bankCardInfo,
    orderList: state => state.orderList,
    marketingList: state => state.marketingList,
    productsInfo: state => state.productsInfo,
    merchantList: state => state.merchantList,
    merchantStatistInfo: state => state.merchantStatistInfo,
    merchantAllInfo: state => state.merchantAllInfo,
    onlineRepayList: state => state.onlineRepayList,
    offlineRepayList: state => state.offlineRepayList,
    prepayRepayList: state => state.prepayRepayList,
    repayStatistInfo: state => state.repayStatistInfo,
    applyList: state => state.applyList,
    prepayList: state => state.prepayList,
    occupationList: state => state.occupationList,
    applyAllInfo: state => state.applyAllInfo,
    prepayAllInfo: state => state.prepayAllInfo,
    occupationAllInfo: state => state.occupationAllInfo,
    agentCharge: state => state.agentCharge,
    agentCashWithdrawal: state => state.agentCashWithdrawal,
    agentBankAccountInfo: state => state.agentBankAccountInfo,
    agentBankCardInfo: state => state.agentBankCardInfo,
    freightOrdersList: state => state.freightOrdersList,
    freightOrdersInfo: state => state.freightOrdersInfo,
    freightList: state => state.freightList,
    freightBankAccountInfo: state => state.freightBankAccountInfo,
    freightWithdrawalInfo: state => state.freightWithdrawalInfo,
    freightBankCardInfo: state => state.freightBankCardInfo,
    onlinefreightList: state => state.onlinefreightList,
    bankInfo: state => state.bankInfo,
    // repayAll: state => state.repayAll,
    onlineRepayAll: state => state.onlineRepayAll,
    offlineRepayAll: state => state.offlineRepayAll,
    advanceRepayAll: state => state.advanceRepayAll
}

const mutations = {
    [types.SERVICE_CHARGE_INFO] (state, payload) {
        state.serviceChargeInfo = payload
    },
    [types.CASH_WITHDRAWAL_INFO] (state, payload) {
        state.cashWithdrawalInfo = payload
    },
    [types.BANK_ACCOUNT_INFO] (state, payload) {
        state.bankAccountInfo = payload
    },
    [types.BANK_CARD_INFO] (state, payload) {
        state.bankCardInfo = payload
    },
    [types.ORDER_LIST] (state, payload) {
        state.orderList = payload
    },
    [types.MARKETING_LIST] (state, payload) {
        state.marketingList = payload
    },
    [types.PRODUCTS_INFO] (state, payload) {
        state.productsInfo = payload
    },
    [types.MERCHANT_LIST] (state, payload) {
        state.merchantList = payload
    },
    [types.MERCHANT_STATIST_INFO] (state, payload) {
        state.merchantStatistInfo = payload
    },
    [types.MERCHANT_ALL_INFO] (state, payload) {
        state.merchantAllInfo = payload
    },
    [types.ONLINE_REPAY_LIST] (state, payload) {
        state.onlineRepayList = payload
    },
    [types.OFFLINE_REPAY_LIST] (state, payload) {
        state.offlineRepayList = payload
    },
    [types.PREPAY_REPAY_LIST] (state, payload) {
        state.prepayRepayList = payload
    },
    [types.REPAY_STATIST_INFO] (state, payload) {
        state.repayStatistInfo = payload
    },
    [types.APPLY_LIST] (state, payload) {
        state.applyList = payload
    },
    [types.PREPAY_LIST] (state, payload) {
        state.prepayList = payload
    },
    [types.OCCUPATION_LIST] (state, payload) {
        state.occupationList = payload
    },
    [types.APPLY_ALL_INFO] (state, payload) {
        state.applyAllInfo = payload
    },
    [types.PREPAY_ALL_INFO] (state, payload) {
        state.prepayAllInfo = payload
    },
    [types.OCCUPATION_ALL_INFO] (state, payload) {
        state.occupationAllInfo = payload
    },
    [types.AGENT_CHARGE] (state, payload) {
        state.agentCharge = payload
    },
    [types.AGENT_CASH_WITHDRAWAL_INFO] (state, payload) {
        state.agentCashWithdrawal = payload
    },
    [types.AGENT_BANK_ACCOUNT_INFO] (state, payload) {
        state.agentBankAccountInfo = payload
    },
    [types.AGENT_BANK_CARD_INFO] (state, payload) {
        state.agentBankCardInfo = payload
    },
    [types.FREIGHT_ORDERS_LIST] (state, payload) {
        state.freightOrdersList = payload
    },
    [types.FREIGHT_ORDERS_INFO] (state, payload) {
        state.freightOrdersInfo = payload
    },
    [types.FREIGHT_LIST] (state, payload) {
        state.freightList = payload
    },
    [types.FREIGHT_BANK_ACCOUNT_INFO] (state, payload) {
        state.freightBankAccountInfo = payload
    },
    [types.FREIGHT_WITHDRAWAL_INFO] (state, payload) {
        state.freightWithdrawalInfo = payload
    },
    [types.FREIGHT_BANK_CARD_INFO] (state, payload) {
        state.freightBankCardInfo = payload
    },
    [types.ONLINE_FREIGHT_LIST] (state, payload) {
        state.onlinefreightList = payload
    },
    [types.BANK_INFO] (state, payload) {
        state.bankInfo = payload
    },
    // [types.REPAY_ALL] (state, payload) {
    //     state.repayAll = payload
    // },
    [types.ONLINEREPAY_ALL] (state, payload) {
        state.onlineRepayAll = payload
    },
    [types.OFFLINEREPAY_ALL] (state, payload) {
        state.offlineRepayAll = payload
    },
    [types.ADVANCEREPAY_ALL] (state, payload) {
        state.advanceRepayAll = payload
    }
}

const actions = {
    async findServiceCharge ({ commit }, params) {
        const { data } = await findServiceCharge(params)
        commit(types.SERVICE_CHARGE_INFO, data)
    },
    async findCashWithdrawal ({ commit }, params) {
        const { data } = await findCashWithdrawal(params)
        commit(types.CASH_WITHDRAWAL_INFO, data)
    },
    async findBankAccountInfo ({ commit }, params) {
        const { data } = await findBankAccountInfo(params)
        commit(types.BANK_ACCOUNT_INFO, data)
    },
    async findBankCardInfo ({ commit }, params) {
        const { data } = await findBankCardInfo(params)
        commit(types.BANK_CARD_INFO, data)
    },
    async findOrders ({ commit }, params) {
        const { data } = await findOrders(params)
        commit(types.ORDER_LIST, data)
    },
    async findMarketing ({ commit }, params) {
        const { data } = await findMarketing(params)
        commit(types.MARKETING_LIST, data)
    },
    async findProductsInfo ({ commit }, params) {
        const { data } = await findProductsInfo(params)
        commit(types.PRODUCTS_INFO, data)
    },
    async findMerchant ({ commit }, params) {
        const { data } = await findMerchant(params)
        commit(types.MERCHANT_LIST, data)
    },
    async findMerchantStatist ({ commit }, params) {
        const { data } = await findMerchantStatist(params)
        commit(types.MERCHANT_STATIST_INFO, data)
    },
    async findMerchantAll ({ commit }, params) {
        const { data } = await findMerchantAll(params)
        commit(types.MERCHANT_ALL_INFO, data)
    },
    async findOnlineRepay ({ commit }, params) {
        const { data } = await findOnlineRepay(params)
        commit(types.ONLINE_REPAY_LIST, data)
    },
    async findOfflineRepay ({ commit }, params) {
        const { data } = await findOfflineRepay(params)
        commit(types.OFFLINE_REPAY_LIST, data)
    },
    async findPrepayRepay ({ commit }, params) {
        const { data } = await findPrepayRepay(params)
        commit(types.PREPAY_REPAY_LIST, data)
    },
    async findRepayStatist ({ commit }, params) {
        const { data } = await findRepayStatist(params)
        commit(types.REPAY_STATIST_INFO, data)
    },
    async findApplyList ({ commit }, params) {
        const { data } = await findApplyList(params)
        commit(types.APPLY_LIST, data)
    },
    async findPrepayList ({ commit }, params) {
        const { data } = await findPrepayList(params)
        commit(types.PREPAY_LIST, data)
    },
    async findOccupationList ({ commit }, params) {
        const { data } = await findOccupationList(params)
        commit(types.OCCUPATION_LIST, data)
    },
    async findApplyAll ({ commit }, params) {
        const { data } = await findApplyAll(params)
        commit(types.APPLY_ALL_INFO, data)
    },
    async findPrepayAll ({ commit }, params) {
        const { data } = await findPrepayAll(params)
        commit(types.PREPAY_ALL_INFO, data)
    },
    async findOccupationAll ({ commit }, params) {
        const { data } = await findOccupationAll(params)
        commit(types.OCCUPATION_ALL_INFO, data)
    },
    async findAgentCharge ({ commit }, params) {
        const { data } = await findAgentCharge(params)
        commit(types.AGENT_CHARGE, data)
    },
    async findAgentCashWithdrawal ({ commit }, params) {
        const { data } = await findAgentCashWithdrawal(params)
        commit(types.AGENT_CASH_WITHDRAWAL_INFO, data)
    },
    async findAgentBankAccountInfo ({ commit }, params) {
        const { data } = await findAgentBankAccountInfo(params)
        commit(types.AGENT_BANK_ACCOUNT_INFO, data)
    },
    async findAgentBankCardInfo ({ commit }, params) {
        const { data } = await findAgentBankCardInfo(params)
        commit(types.AGENT_BANK_CARD_INFO, data)
    },
    async findFreightOrders ({ commit }, params) {
        const { data } = await findFreightOrders(params)
        commit(types.FREIGHT_ORDERS_LIST, data)
    },
    async findFreightInfo ({ commit }, params) {
        const { data } = await findFreightInfo(params)
        commit(types.FREIGHT_ORDERS_INFO, data)
    },
    async findFreightList ({ commit }, params) {
        const { data } = await findFreightList(params)
        commit(types.FREIGHT_LIST, data)
    },
    async findFreightBankAccountInfo ({ commit }, params) {
        const { data } = await findFreightBankAccountInfo(params)
        commit(types.FREIGHT_BANK_ACCOUNT_INFO, data)
    },
    async findFreightWithdrawal ({ commit }, params) {
        const { data } = await findFreightWithdrawal(params)
        commit(types.FREIGHT_WITHDRAWAL_INFO, data)
    },
    async findFreightBankCardInfo ({ commit }, params) {
        const { data } = await findFreightBankCardInfo(params)
        commit(types.FREIGHT_BANK_CARD_INFO, data)
    },
    async findOnlinefreightList ({ commit }, params) {
        const { data } = await findOnlinefreightList(params)
        commit(types.ONLINE_FREIGHT_LIST, data)
    },
    async findBankInfo ({ commit }, params) {
        const { data } = await findBankInfo(params)
        commit(types.BANK_INFO, data)
    },
    // async findRepayAll ({ commit }, params) {
    //     const { data } = await findRepayAll(params)
    //     commit(types.REPAY_ALL, data)
    // },
    async findOnlineRepayAll ({ commit }, params) {
        const { data } = await findOnlineRepayAll(params)
        commit(types.ONLINEREPAY_ALL, data)
    },
    async findOfflineRepayAll ({ commit }, params) {
        const { data } = await findOfflineRepayAll(params)
        commit(types.OFFLINEREPAY_ALL, data)
    },
    async findAdvanceRepayAll ({ commit }, params) {
        const { data } = await findAdvanceRepayAll(params)
        commit(types.ADVANCEREPAY_ALL, data)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

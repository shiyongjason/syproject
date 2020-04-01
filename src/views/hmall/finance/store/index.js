
import * as types from './mutation-types'
import { findServiceCharge, findCashWithdrawal, findBankAccountInfo, findBankCardInfo, findOrders, findMarketing } from '../api'

const state = {
    // 服务费收取明细
    serviceChargeList: [],
    // 服务费提现明细
    cashWithdrawalList: [],
    // 银行账户信息
    bankAccountInfo: {},
    // 提现银行卡信息
    bankCardInfo: {},
    // 订单信息
    orderList: [],
    // 营销列表
    marketingList: []
}

const getters = {
    serviceChargeList: state => state.serviceChargeList,
    cashWithdrawalList: state => state.cashWithdrawalList,
    bankAccountInfo: state => state.bankAccountInfo,
    bankCardInfo: state => state.bankCardInfo,
    orderList: state => state.orderList,
    marketingList: state => state.marketingList
}

const mutations = {
    [types.SERVICE_CHARGE_LIST] (state, payload) {
        state.serviceChargeList = payload
    },
    [types.CASH_WITHDRAWAL_LIST] (state, payload) {
        state.cashWithdrawalList = payload
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
    }
}

const actions = {
    async findServiceCharge ({ commit }, params) {
        const { data } = await findServiceCharge()
        commit(types.SERVICE_CHARGE_LIST, data.records)
    },
    async findCashWithdrawal ({ commit }, params) {
        const { data } = await findCashWithdrawal(params)
        commit(types.CASH_WITHDRAWAL_LIST, data)
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
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
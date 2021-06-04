
import * as types from './mutation-types'
import { findServiceCharge, findCashWithdrawal, findBankAccountInfo, findBankCardInfo, findOrders, findMarketing, findProductsInfo, findFreightOrders } from '../api'

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
    // 运费订单列表
    freightOrdersList: {}
}

const getters = {
    serviceChargeInfo: state => state.serviceChargeInfo,
    cashWithdrawalInfo: state => state.cashWithdrawalInfo,
    bankAccountInfo: state => state.bankAccountInfo,
    bankCardInfo: state => state.bankCardInfo,
    orderList: state => state.orderList,
    marketingList: state => state.marketingList,
    productsInfo: state => state.productsInfo,
    freightOrdersList: state => state.freightOrdersList
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
    [types.FREIGHT_ORDERS_LIST] (state, payload) {
        state.freightOrdersList = payload
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
    async findFreightOrders ({ commit }, params) {
        const { data } = await findFreightOrders(params)
        commit(types.FREIGHT_ORDERS_LIST, data)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

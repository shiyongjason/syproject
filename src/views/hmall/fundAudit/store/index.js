
import * as types from './mutation-types'
import { findFundList, findFundInfo, findAuditFundList, findAuditFundInfo, findAdvanceList } from '../api'

const state = {
    fundList: [], // 资金申请审核列表
    fundInfo: {}, // 资金申请详情
    auditFundList: [], // 代采订单审核列表
    auditFundInfo: {}, // 代采订单详情
    advanceList: [] // 代采订单预付款确认列表
}

const getters = {
    fundList: state => state.fundList,
    fundInfo: state => state.fundInfo,
    auditFundList: state => state.auditFundList,
    auditFundInfo: state => state.auditFundInfo,
    advanceList: state => state.advanceList
}

const mutations = {
    [types.FUND_LIST] (state, payload) {
        state.fundList = payload
    },
    [types.FUND_INFO] (state, payload) {
        state.fundInfo = payload
    },
    [types.AUDIT_FUND_LIST] (state, payload) {
        state.auditFundList = payload
    },
    [types.AUDIT_FUND_INFO] (state, payload) {
        state.auditFundInfo = payload
    },
    [types.ADVANCE_LIST] (state, payload) {
        state.advanceList = payload
    }
}

const actions = {
    async findFundList ({ commit }, params) {
        const { data } = await findFundList(params)
        commit(types.FUND_LIST, data)
    },
    async findFundInfo ({ commit }, params) {
        const { data } = await findFundInfo(params)
        commit(types.FUND_INFO, data)
    },
    async findAuditFundList ({ commit }, params) {
        const { data } = await findAuditFundList(params)
        commit(types.AUDIT_FUND_LIST, data)
    },
    async findAuditFundInfo ({ commit }, params) {
        const { data } = await findAuditFundInfo(params)
        commit(types.AUDIT_FUND_INFO, data)
    },
    async findAdvanceList ({ commit }, params) {
        const { data } = await findAdvanceList(params)
        commit(types.ADVANCE_LIST, data)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

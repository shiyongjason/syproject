
import * as types from './mutation-types'
import { findFundList, findFundInfo } from '../api'

const state = {
    // 资金申请审核列表
    fundList: [],
    fundInfo: {} // 资金申请详情
}

const getters = {
    fundList: state => state.fundList,
    fundInfo: state => state.fundInfo
}

const mutations = {
    [types.FUND_LIST] (state, payload) {
        state.fundList = payload
    },
    [types.FUND_INFO] (state, payload) {
        state.fundInfo = payload
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
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

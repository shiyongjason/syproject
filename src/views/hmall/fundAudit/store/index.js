
import * as types from './mutation-types'
import { findFundList } from '../api'

const state = {
    // 资金申请审核列表
    fundList: []
}

const getters = {
    fundList: state => state.fundList
}

const mutations = {
    [types.FUND_LIST] (state, payload) {
        state.fundList = payload
    }
}

const actions = {
    async findFundList ({ commit }, params) {
        const { data } = await findFundList(params)
        commit(types.FUND_LIST, data)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

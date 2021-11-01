
import * as types from './mutation-types'
import { fullReturnDetails, fullReturnBalance, totalBalance } from '../api'

const state = {
    fullReturnDetailsList: {},
    fullReturnBalanceList: {},
    totalBalances: ''
}

const getters = {
}

const mutations = {

    [types.FULL_RETURN_DETAILS] (state, payload) {
        state.fullReturnDetailsList = payload
    },
    [types.FULL_RETURN_BALANCE] (state, payload) {
        state.fullReturnBalanceList = payload
    },
    [types.TOTAL_BALANCE] (state, payload) {
        state.totalBalances = payload
    }

}

const actions = {
    async fullReturnDetails ({ commit }, params) {
        const { data } = await fullReturnDetails(params)
        commit(types.FULL_RETURN_DETAILS, data)
    },
    async fullReturnBalance ({ commit }, params) {
        const { data } = await fullReturnBalance(params)
        commit(types.FULL_RETURN_BALANCE, data)
    },
    async totalBalance ({ commit }, params) {
        const { data } = await totalBalance(params)
        commit(types.TOTAL_BALANCE, data)
    }

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

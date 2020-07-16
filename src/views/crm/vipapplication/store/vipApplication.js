
import * as types from './vipTypes'
import * as Api from '../api'
const state = {
    vipApply: {},
    contracts: {}
}

const getters = {
    vipApply: state => state.vipApply,
    contracts: state => state.contracts
}

const mutations = {
    [types.VIP_APPLY] (state, payload) {
        state.vipApply = payload
    },
    [types.CONTRACTS_ARR] (state, payload) {
        state.contracts = payload
    }
}

const actions = {
    async findApplyvip ({ commit }, params) {
        const { data } = await Api.getApplyvip(params)
        commit(types.VIP_APPLY, data)
    },
    async findContract ({ commit }, params) {
        const { data } = await Api.seachContract(params)
        commit(types.CONTRACTS_ARR, data)
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

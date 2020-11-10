import * as types from './const'
import * as Api from '../api/index'

const state = {
    contractTempdata: {},
    contractTempdetail: {}
}

const getters = {
    contractTempdata: state => state.contractTempdata,
    contractTempdetail: state => state.contractTempdetail
}

const mutations = {
    [types.CONTRACT_TEMP_DATA] (state, payload) {
        state.contractTempdata = payload
    },
    [types.CONTRACT_TEMP_DETAIL] (state, payload) {
        state.contractTempdetail = payload
    }
}
// getRecommenderRewardTotal
const actions = {
    async getContractTmep ({ commit }, params) {
        const { data } = await Api.getContratTemp(params)
        commit(types.CONTRACT_TEMP_DATA, data)
    },
    async getContratDetail ({ commit }, params) {
        const { data } = await Api.getContratDetail(params)
        commit(types.CONTRACT_TMEP_DETAIL, data)
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

import * as types from './const'
import * as Api from '../api/index'

const state = {
    contractTempdata: {},
    contractTempdetail: {},
    tempType: [],
    tempParams: []
}

const getters = {
    contractTempdata: state => state.contractTempdata,
    contractTempdetail: state => state.contractTempdetail,
    tempType: state => state.tempType,
    tempParams: state => state.tempParams
}

const mutations = {
    [types.CONTRACT_TEMP_DATA] (state, payload) {
        state.contractTempdata = payload
    },
    [types.CONTRACT_TEMP_DETAIL] (state, payload) {
        state.contractTempdetail = payload
    },
    [types.CONTRACT_TEMP_TYPE] (state, payload) {
        state.tempType = payload
    },
    [types.CONTRACT_TEMP_PARAM] (state, payload) {
        state.tempParams = payload
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
        commit(types.CONTRACT_TEMP_DETAIL, data)
    },
    async getContratType ({ commit }, params) {
        const { data } = await Api.getContratType(params)
        commit(types.CONTRACT_TEMP_TYPE, data)
    },
    async getAllparams ({ commit }, params) {
        const { data } = await Api.getAllparams(params)
        commit(types.CONTRACT_TEMP_PARAM, data)
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

import * as types from './const'
import * as Api from '../api/index'

const state = {
    contractTempdata: {},
    contractTempdetail: {},
    tempType: [],
    tempParams: [],
    caPage: {},
    verData: {},
    verTempDetail: {}
}

const getters = {
    contractTempdata: state => state.contractTempdata,
    contractTempdetail: state => state.contractTempdetail,
    tempType: state => state.tempType,
    tempParams: state => state.tempParams,
    caPage: state => state.caPage,
    verData: state => state.verData,
    verTempDetail: state => state.verTempDetail
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
    },
    [types.CONTRACT_TEMP_CA] (state, payload) {
        state.caPage = payload
    },
    [types.CONTRACT_TEMP_VER] (state, payload) {
        state.verData = payload
    },
    [types.CONTRACT_TEMP_VER_DETAIL] (state, payload) {
        state.verTempDetail = payload
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
    },
    async findCApage ({ commit }, params) {
        const { data } = await Api.orgCApage(params)
        commit(types.CONTRACT_TEMP_CA, data)
    },
    async findVerdata ({ commit }, params) {
        const { data } = await Api.findver(params)
        commit(types.CONTRACT_TEMP_VER, data)
    },
    async findVerdetail ({ commit }, params) {
        const { data } = await Api.findVerDetail(params)
        commit(types.CONTRACT_TEMP_VER_DETAIL, data)
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}


import * as types from './crmTypes'
import * as Api from '../api'
const state = {
    businessData: {},
    crmauthDetail: {},
    crmauthLoan: {},
    platlist: [],
    whiteRecords: []
}

const getters = {
    businessData: state => state.businessData,
    crmauthDetail: state => state.crmauthDetail,
    crmauthLoan: state => state.crmauthLoan,
    platlist: state => {
        state.platlist && state.platlist.map(val => {
            val.value = val.companyShortName
            val.selectCode = val.companyCode
        })
        return state.platlist
    },
    whiteRecords: state => state.whiteRecords

}

const mutations = {
    [types.BUSINESS_DATA] (state, payload) {
        state.businessData = payload
    },
    [types.BUSINESS_DETAIL] (state, payload) {
        state.crmauthDetail = payload
    },
    [types.CRMSTATIC_LOAN] (state, payload) {
        state.crmauthLoan = payload
    },
    [types.PLAT_LIST] (state, payload) {
        state.platlist = payload
    },
    [types.WHITE_RECORDS] (state, payload) {
        state.whiteRecords = payload
    }
}

const actions = {
    async findBusinesspage ({ commit }, params) {
        const { data } = await Api.getCompanyBosslist(params)
        commit(types.BUSINESS_DATA, data)
    },
    async findBusinessDetail ({ commit }, params) {
        const { data } = await Api.getBusinessDetail(params)
        commit(types.BUSINESS_DETAIL, data)
    },
    async findCrmauthenStatic ({ commit }, params) {
        const { data } = await Api.getCrmauthenStatic(params)
        commit(types.CRMSTATIC_LOAN, data)
    },
    async findPlatlist ({ commit }, params) {
        const { data: { data } } = await Api.getPlatList(params)
        commit(types.PLAT_LIST, data.pageContent)
    },
    async findWhiterecords ({ commit }, params) {
        const { data } = await Api.findWhiterecord(params)
        commit(types.WHITE_RECORDS, data)
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

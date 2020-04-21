
import * as types from './crmTypes'
import * as Api from '../api'
const state = {
    businessData: {},
    crmauthDetail: {},
    crmauthLoan: {},
    platlist: []

}

const getters = {
    businessData: state => state.businessData,
    crmauthDetail: state => state.crmauthDetail,
    crmauthLoan: state => state.crmauthLoan,
    platlist: state => {
        state.platlist && state.platlist.map(val => {
            val.value = val.companyName
            val.selectCode = val.companyCode
        })
        return state.platlist
    }

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
        console.log(data)
        commit(types.PLAT_LIST, data.pageContent)
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

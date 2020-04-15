import * as types from './const'
import * as Api from '../api'
const state = {
    dictInfoType: {},
    planTotalList: {}
}

const getters = {
    dictInfoType: state => state.dictInfoType,
    planTotalList: state => state.planTotalList
}

const mutations = {
    [types.DICTINFO_TYPE] (state, payload) {
        state.dictInfoType = payload
    }
}

const actions = {
    async findCompanyType ({ commit }, params) {
        const { data } = await Api.getCompanyType(params)
        commit(types.DICTINFO_TYPE, data)
    },
    async findPlanTotalList ({ commit }, params) {
        const { data } = await Api.getPlanTotalList(params)
        commit(types.DICTINFO_TYPE, data)
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

import * as types from './const'
import * as Api from '../api'
const state = {
    planTotalList: []
}

const getters = {
    planTotalList: state => state.planTotalList
}

const mutations = {
    [types.PLAN_TOTAL_LIST] (state, payload) {
        state.planTotalList = payload
    }
}

const actions = {
    async findPlanTotalList ({ commit }, params) {
        console.log(1)
        const { data } = await Api.getPlanTotalList(params)
        commit(types.PLAN_TOTAL_LIST, data)
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

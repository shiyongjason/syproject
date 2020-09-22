import * as types from '@/views/crm/awardManage/store/const'
import { getRecommenderRewardList, getRecommenderRewardTotal } from '@/views/crm/recommender/api'

const state = {
    rcommenderRewardList: [],
    rcommenderRewardTotal: {}
}

const getters = {
    rcommenderRewardList: state => state.rcommenderRewardList,
    rcommenderRewardTotal: state => state.rcommenderRewardTotal
}

const mutations = {
    [types.RCOMMENDE_RREWARD_LIST] (state, payload) {
        state.rcommenderRewardList = payload
    },
    [types.RCOMMENDE_RREWARD_TOTAL] (state, payload) {
        state.rcommenderRewardTotal = payload
    }
}
// getRecommenderRewardTotal
const actions = {
    async getRecommenderRewardList ({ commit }, params) {
        const { data } = await getRecommenderRewardList(params)
        commit(types.RCOMMENDE_RREWARD_LIST, data)
    },
    async getRecommenderRewardTotal ({ commit }, params) {
        const { data } = await getRecommenderRewardTotal(params)
        commit(types.RCOMMENDE_RREWARD_TOTAL, data)
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

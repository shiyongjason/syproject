import * as types from '@/views/crm/recommender/store/const'
import { getRecommenderList, getRecommenderRewardList } from '@/views/crm/recommender/api'

const state = {
    recommenderList: [],
    statisticsList: [],
    rcommenderRewardList: []
}

const getters = {
    recommenderList: state => state.recommenderList,
    statisticsList: state => state.statisticsList,
    rcommenderRewardList: state => state.rcommenderRewardList
}

const mutations = {
    [types.RECOMMENDER_LIST] (state, payload) {
        state.recommenderList = payload
    },
    [types.RCOMMENDE_RREWARD_LIST] (state, payload) {
        state.rcommenderRewardList = payload
    }
}

const actions = {
    async getRecommenderList ({ commit }, params) {
        const { data } = await getRecommenderList(params)
        commit(types.RECOMMENDER_LIST, data)
    },
    async getRecommenderRewardList ({ commit }, params) {
        const { data } = await getRecommenderRewardList(params)
        console.log(data)
        commit(types.RCOMMENDE_RREWARD_LIST, data)
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

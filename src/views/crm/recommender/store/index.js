import * as types from '@/views/crm/recommender/store/const'
import { getRecommenderList, getRecommenderRewardList, getRecommenderTotal } from '@/views/crm/recommender/api'

const state = {
    recommenderList: [],
    recommenderTotal: {},
    statisticsList: []
}

const getters = {
    recommenderList: state => state.recommenderList,
    recommenderTotal: state => state.recommenderTotal,
    statisticsList: state => state.statisticsList
}

const mutations = {
    [types.RECOMMENDER_LIST] (state, payload) {
        state.recommenderList = payload
    },
    [types.RECOMMENDER_TOTAL] (state, payload) {
        state.recommenderTotal = payload
    }
}

const actions = {
    async getRecommenderList ({ commit }, params) {
        const { data } = await getRecommenderList(params)
        commit(types.RECOMMENDER_LIST, data)
    },
    async getRecommenderTotal ({ commit }, params) {
        const { data } = await getRecommenderTotal(params)
        commit(types.RECOMMENDER_TOTAL, data)
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

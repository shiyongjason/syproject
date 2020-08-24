import * as types from './mutation-types'
import * as apis from '../api/index'

const state = {
    searchWordData: {},
    searchWordInfo: {},
    validSearchData: {},
    clickRateData: {},
    noResultData: {}
}

const mutations = {
    [types.SEARCH_WORD_DATA] (state, payload) {
        state.searchWordData = payload
    },
    [types.SEARCH_WORD_INFO] (state, payload) {
        state.searchWordInfo = payload
    },
    [types.VALID_SEARCH_DATA] (state, payload) {
        state.validSearchData = payload
    },
    [types.CLICK_RATE_DATA] (state, payload) {
        state.clickRateData = payload
    },
    [types.NO_RESULT_DATA] (state, payload) {
        state.noResultData = payload
    }
}

const actions = {
    async findSearchWordList ({ commit }, params) {
        const { data } = await apis.findSearchWordList(params)
        commit(types.SEARCH_WORD_DATA, data)
    },
    async findSearchWordInfo ({ commit }, params) {
        const { data } = await apis.findSearchWordInfo(params)
        commit(types.SEARCH_WORD_INFO, data)
    },
    async findValidSearchList ({ commit }, params) {
        const { data } = await apis.findValidSearchList(params)
        commit(types.VALID_SEARCH_DATA, data)
    },
    async findClickRateList ({ commit }, params) {
        const { data } = await apis.findClickRateList(params)
        commit(types.CLICK_RATE_DATA, data)
    },
    async findNoResultList ({ commit }, params) {
        const { data } = await apis.findNoResultList(params)
        commit(types.NO_RESULT_DATA, data)
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}

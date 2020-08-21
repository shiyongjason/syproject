import * as types from './mutation-types'
import * as apis from '../api/index'

const state = {
    searchWordData: [],
    searchWordInfo: []
}

const mutations = {
    [types.SEARCH_WORD_DATA] (state, payload) {
        state.searchWordData = payload
    },
    [types.SEARCH_WORD_INFO] (state, payload) {
        state.searchWordInfo = payload
    }
}

const actions = {
    async findSearchWordList ({ commit }, params) {
        const { data } = await apis.findSearchWordList(params)
        commit(types.SEARCH_WORD_DATA, data)
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}

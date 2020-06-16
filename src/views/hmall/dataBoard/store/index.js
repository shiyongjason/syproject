import * as types from './mutation-types'
import { findSpikePriceData, findSpikePriceInfo } from '../api/index'

const state = {
    spikePriceData: {},
    spikePriceInfo: {}
}

const mutations = {
    [types.SPIKE_PRICE_DATA] (state, payload) {
        state.spikePriceData = payload
    },
    [types.SPIKE_PRICE_INFO] (state, payload) {
        state.spikePriceInfo = payload
    }
}

const actions = {
    async findSpikePriceData ({ commit }, params) {
        const { data } = await findSpikePriceData(params)
        commit(types.SPIKE_PRICE_DATA, data)
    },
    async findSpikePriceInfo ({ commit }, params) {
        const { data } = await findSpikePriceInfo(params)
        commit(types.SPIKE_PRICE_INFO, data)
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}

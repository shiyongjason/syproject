
import * as types from './mutation-types'

import { findSpikePriceData, findSpikePriceInfo, getTransactionInfo } from '../api/index'

const state = {
    spikePriceData: {},
    spikePriceInfo: {},
    // 交易额明细
    getTransactionInfoList: [],
    transactionPaginationData: {
        pageNumber: 1,
        pageSize: 10,
        total: 0
    }
}

const mutations = {
    [types.SPIKE_PRICE_DATA] (state, payload) {
        state.spikePriceData = payload
    },
    [types.SPIKE_PRICE_INFO] (state, payload) {
        state.spikePriceInfo = payload
    },
    [types.GET_TRANSACTION_INFO] (state, payload) {
        console.log(payload)
        state.getTransactionInfoList = payload.records
        state.transactionPaginationData = {
            pageNumber: payload.current,
            pageSize: payload.size,
            total: payload.total
        }
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
    },
    async findServiceCharge ({ commit }, params) {
        console.log(params)
        const { data } = await getTransactionInfo(params)
        commit(types.GET_TRANSACTION_INFO, data)
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}


import * as types from './mutation-types'
import { getTransactionInfo } from '../api'

const state = {
    // 交易额明细
    getTransactionInfoList: [],
    transactionPaginationData: {
        pageNumber: 1,
        pageSize: 10,
        total: 0
    }
}

const getters = {
    // serviceChargeInfo: state => state.serviceChargeInfo
}

const mutations = {
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
    async findServiceCharge ({ commit }, params) {
        console.log(params)
        const { data } = await getTransactionInfo(params)
        commit(types.GET_TRANSACTION_INFO, data)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
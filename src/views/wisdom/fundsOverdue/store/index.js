import * as types from './const'
import * as Api from '../api'

const states = {
    backMoneyList: [],
    backMoneyTotal: {},
    backMoneyPagination: {}
}
const getters = {
    backMoneyList: state => state.backMoneyList,
    backMoneyTotal: state => state.backMoneyTotal,
    backMoneyPagination: state => state.backMoneyPagination
}
const mutations = {
    [types.BACK_MONEY_TRACK_LIST] (state, payload) {
        state.backMoneyList = payload
    },
    [types.BACK_MONEY_TRACK_TOTAL] (state, payload) {
        state.backMoneyTotal = payload
    },
    [types.BACK_MONEY_TRACK_PAGINATION] (state, payload) {
        state.backMoneyPagination = payload
    }
}
const actions = {
    async findBackMoneyTrackList ({ commit }, params) {
        const { data } = await Api.getBackMoneyTrackList(params)
        commit(types.BACK_MONEY_TRACK_LIST, data.records)
        commit(types.BACK_MONEY_TRACK_PAGINATION, {
            pageNumber: data.current,
            pageSize: data.size,
            total: data.total
        })
    },
    async findBackMoneyTrackTotal ({ commit }, params) {
        const { data } = await Api.getBackMoneyTrackTotal(params)
        commit(types.BACK_MONEY_TRACK_TOTAL, data)
    }
}

export default {
    namespaced: true,
    states,
    getters,
    mutations,
    actions
}

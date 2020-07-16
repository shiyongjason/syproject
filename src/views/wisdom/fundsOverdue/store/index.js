import * as types from './const'
import * as Api from '../api'
import { MathJS } from '../../../../utils/MathUtils'

const state = {
    backMoneyList: [],
    backMoneyTotal: {},
    backMoneyPagination: {
        total: 0,
        pageSize: 10,
        pageNumber: 1
    }
}
const getters = {
    backMoneyList: state => {
        return state.backMoneyList.map(value => {
            value.onTimeRate = value.onTimeRate !== null ? (MathJS.evaluate(`${value.onTimeRate} * 100`).toNumber()) + '%' : '-'
            value.rebateRate = value.rebateRate !== null ? (MathJS.evaluate(`${value.rebateRate} * 100`).toNumber()) + '%' : '-'
            return value
        })
    },
    backMoneyTotal: state => {
        for (const key in state.backMoneyTotal) {
            if (key === 'onTimeRate' || key === 'rebateRate') {
                state.backMoneyTotal[key] = MathJS.evaluate(`${state.backMoneyTotal[key]} * 100`).toNumber() + '%'
            }
        }
        return state.backMoneyTotal
    },
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
    state,
    getters,
    mutations,
    actions
}

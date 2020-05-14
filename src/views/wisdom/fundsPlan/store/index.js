import * as types from './const'
import * as Api from '../api'
import moment from 'moment'
const state = {
    planTotalList: [],
    targetTime: ''
}

const getters = {
    planTotalList: state => state.planTotalList,
    targetTime: function (state) {
        const temp = state.targetTime.businessDate.slice(6) > 19
        if (temp) {
            return moment(state.targetTime.businessDate).add(1, 'M').format('YYYYMM')
        }
        return moment(state.targetTime.businessDate).format('YYYYMM')
    }
}

const mutations = {
    [types.PLAN_TOTAL_LIST] (state, payload) {
        state.planTotalList = payload.map(value => {
            value.salePercentCurrent += '%'
            value.usedPercentCurrent += '%'
            value.overduePercent += '%'
            return value
        })
    },
    [types.TARGET_TIME] (state, payload) {
        state.targetTime = payload
    }
}

const actions = {
    async findPlanTotalList ({ commit }, params) {
        const { data } = await Api.getPlanTotalList(params)
        commit(types.PLAN_TOTAL_LIST, data)
    },
    async findTargetTime ({ commit }, params) {
        const { data } = await Api.getServeTime()
        commit(types.TARGET_TIME, data)
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

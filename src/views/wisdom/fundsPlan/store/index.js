import * as types from './const'
import * as Api from '../api'
import moment from 'moment'
const state = {
    planTotalList: [],
    targetTime: '',
    planApprovalList: [],
    planApprovalTotal: {},
    planApprovalPagination: {},
    platformPlanList: [],
    platformPlanTotal: {},
    platformPlanPagination: {}
}

const getters = {
    planTotalList: state => state.planTotalList,
    targetTime: function (state) {
        const temp = state.targetTime.businessDate.slice(6) > 19
        if (temp) {
            return moment(state.targetTime.businessDate).add(1, 'M').format('YYYYMM')
        }
        return moment(state.targetTime.businessDate).format('YYYYMM')
    },
    planApprovalList: state => state.planApprovalList,
    planApprovalPagination: state => state.planApprovalPagination,
    planApprovalTotal: state => state.planApprovalTotal,
    platformPlanList: state => state.platformPlanList,
    platformPlanTotal: state => state.platformPlanTotal,
    platformPlanPagination: state => state.platformPlanPagination
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
    },
    [types.PLAN_APPROVAL_LIST] (state, payload) {
        state.planApprovalList = payload
    },
    [types.PLAN_APPROVAL_PAGINATION] (state, payload) {
        state.planApprovalPagination = payload
    },
    [types.PLAN_APPROVAL_TOTAL] (state, payload) {
        state.planApprovalTotal = payload
    },
    [types.PLATFORM_PLAN_LIST] (state, payload) {
        state.platformPlanList = payload
    },
    [types.PLATFORM_PLAN_PAGINATION] (state, payload) {
        state.platformPlanPagination = payload
    },
    [types.PLATFORM_PLAN_TOTAL] (state, payload) {
        state.platformPlanTotal = payload
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
    },
    async findPlanApprovalList ({ commit }, params) {
        const { data } = await Api.getPlanApprovalList(params)
        commit(types.PLAN_APPROVAL_LIST, data.records)
        commit(types.PLAN_APPROVAL_PAGINATION, {
            pageNumber: data.current,
            pageSize: data.size,
            total: data.total
        })
    },
    async findPlanApprovalTotal ({ commit }, params) {
        const { data } = await Api.getPlanApprovalTotal(params)
        commit(types.PLAN_APPROVAL_TOTAL, data)
    },
    async findPlatformPlanList ({ commit }, params) {
        const { data } = await Api.findPlanFormList(params)
        commit(types.PLATFORM_PLAN_LIST, data.records)
        commit(types.PLATFORM_PLAN_PAGINATION, {
            pageNumber: data.current,
            pageSize: data.size,
            total: data.total
        })
    },
    async findPlatformPlanTotal ({ commit }, params) {
        const { data } = await Api.findPlanFormTotal(params)
        commit(types.PLATFORM_PLAN_TOTAL, data)
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

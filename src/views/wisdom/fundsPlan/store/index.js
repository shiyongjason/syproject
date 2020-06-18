import * as types from './const'
import * as Api from '../api'
import moment from 'moment'
import filterUtil from '../../../../utils/filters'
import { MathJS } from '../../../../utils/MathUtils'

const state = {
    planTotalList: [],
    targetTime: {
        businessDate: ''
    },
    planApprovalList: [],
    planApprovalTotal: {},
    planApprovalPagination: {},
    platformPlanList: [],
    platformPlanTotal: {},
    platformPlanPagination: {},
    planCreditList: [],
    planCreditTotal: {},
    planCreditPagination: {}
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
    platformPlanList: state => {
        state.platformPlanList.forEach(value => {
            value.subsectionFinanceHealthPercentage =
                value.subsectionFinanceHealthPercentage === null
                    ? '-' : (value.subsectionFinanceHealthPercentage) + '%'
            value.salePercentCurrent = (value.salePercentCurrent) + '%'
            value.usedPercentCurrent = (value.usedPercentCurrent) + '%'
            value.overduePercent = (value.overduePercent) + '%'
        })
        return state.platformPlanList
    },
    platformPlanTotal: state => {
        for (const key in state.platformPlanTotal) {
            if (state.platformPlanTotal[key]) {
                state.platformPlanTotal[key] = filterUtil.fundMoney(state.platformPlanTotal[key])
            }
            if (key === 'salePercentCurrent') state.platformPlanTotal[key] = (state.platformPlanTotal[key]) + '%'
            if (key === 'usedPercentCurrent') state.platformPlanTotal[key] = (state.platformPlanTotal[key]) + '%'
            if (key === 'overduePercent') state.platformPlanTotal[key] = (state.platformPlanTotal[key]) + '%'
        }
        return state.platformPlanTotal
    },
    platformPlanPagination: state => state.platformPlanPagination,
    planCreditList: state => {
        state.planCreditList.forEach(value => {
            value.annualTotalEffectiveRate = value.annualTotalEffectiveRate !== null ? (MathJS.evaluate(`${value.annualTotalEffectiveRate} * 100`).toNumber()) + '%' : '-'
            value.annualTotalProfitAchieveRate = value.annualTotalProfitAchieveRate !== null ? (MathJS.evaluate(`${value.annualTotalProfitAchieveRate} * 100`).toNumber()) + '%' : ''
            value.annualTotalSaleAchieveRate = value.annualTotalSaleAchieveRate !== null ? (MathJS.evaluate(`${value.annualTotalSaleAchieveRate} * 100`).toNumber()) + '%' : ''
        })
        return state.planCreditList
    },
    planCreditTotal: state => {
        for (const key in state.planCreditTotal) {
            switch (key) {
                case 'annualTotalEffectiveRate':
                case 'annualTotalProfitAchieveRate':
                case 'annualTotalSaleAchieveRate':
                    state.planCreditTotal[key] = state.planCreditTotal[key] !== null ? MathJS.evaluate(`${state.planCreditTotal[key]} * 100`).toNumber() + '%' : ''
                    break
                default:
                    state.planCreditTotal[key] = filterUtil.fundMoney(state.planCreditTotal[key])
            }
        }
        return state.planCreditTotal
    },
    planCreditPagination: state => state.planCreditPagination
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
    },
    [types.PLAN_CREDIT_LIST] (state, payload) {
        state.planCreditList = payload
    },
    [types.PLAN_CREDIT_PAGINATION] (state, payload) {
        state.planCreditPagination = payload
    },
    [types.PLAN_CREDIT_TOTAL] (state, payload) {
        state.planCreditTotal = payload
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
    },
    async findPlanCreditList ({ commit }, params) {
        const { data } = await Api.findPlanCreditList(params)
        commit(types.PLAN_CREDIT_LIST, data.records)
        commit(types.PLAN_CREDIT_PAGINATION, {
            pageNumber: data.current,
            pageSize: data.size,
            total: data.total
        })
    },
    async findPlanCreditTotal ({ commit }, params) {
        const { data } = await Api.findPlanCreditTotal(params)
        commit(types.PLAN_CREDIT_TOTAL, data)
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}


// 资金台账 store
import * as types from './const'
import { findPlatformslist, getAccountList, getRepaymentList, findDepList, getSummaryList } from '@/views/wisdom/fundsData/api'
const state = {
    platformData: [],
    // 阶梯逾期默认值
    overdueList: [
        { dateNum: '3', dateType: '', overDueInterest: '16', planId: '', sort: '', startTime: '' },
        { dateNum: '999', dateType: '', overDueInterest: '20', planId: '', sort: '', startTime: '' }
    ],
    pagination: {
        pageNumber: 1,
        pageSize: 10,
        total: 0
    },
    tableData: [], // 台账列表
    branchList: [] // 分部列表
}

const getters = {
    // 查询平台公司
    platformData: state => {
        for (let i of state.platformData) {
            i.value = i.companyShortName
            i.selectCode = i.companyCode
        }
        return state.platformData
    },
    tableData: state => {
        state.tableData.map((i) => {
            if (i.account) Object.keys(i.account).forEach(key => { i['account_' + key] = i.account[key] })
            if (i.loan) Object.keys(i.loan).forEach(key => { i['loan_' + key] = i.loan[key] })
            if (i.paymentStatic) Object.keys(i.paymentStatic).forEach(key => { i['paymentStatic_' + key] = i.paymentStatic[key] })
            if (i.planList) {
                i.planList.map((item, index) => {
                    Object.keys(item).forEach((key) => { i[`planList_${index}_${key}`] = item[key] })
                })
            }
        })
        return state.tableData
    }
}

const mutations = {
    // table格式化
    cleartableData (state) {
        state.tableData = []
        state.pagination = {
            pageNumber: 1,
            pageSize: 10,
            total: 0
        }
    },
    [types.PLAT_FORMDATA] (state, payload) {
        state.platformData = payload
    },
    [types.STANDINGB_BOOK] (state, payload) {
        state.pagination = {
            pageNumber: payload.current || 1,
            pageSize: payload.size || 10,
            total: payload.total || 0
        }
        state.tableData = payload.records || []
    },
    [types.REPAYMENT_SCHEDULE] (state, payload) {
        // state.pagination = {
        //     pageNumber: payload.current || 1,
        //     pageSize: payload.size || 10,
        //     total: payload.total || 0
        // }
        // state.tableData = payload.records || []
    },
    [types.GET_BRANCH] (state, payload) {
        payload.unshift({ organizationCode: '', organizationName: '请选择分部' })
        state.branchList = payload
    },
    [types.GET_SUMMARY] (state, payload) {
        if (!payload) return
        state.pagination = {
            pageNumber: payload.current || 1,
            pageSize: payload.size || 10,
            total: payload.total || 0
        }
        state.tableData = payload.records || []
    }
}

const actions = {
    async findPlatformslist ({ commit }, params) {
        const { data } = await findPlatformslist()
        commit(types.PLAT_FORMDATA, data.data.pageContent)
    },
    async getAccountList ({ commit }, params) {
        const { data } = await getAccountList(params)
        commit(types.STANDINGB_BOOK, data)
    },
    async getRepaymentList ({ commit }, params) {
        const { data } = await getRepaymentList(params)
        commit(types.REPAYMENT_SCHEDULE, data)
    },
    async findBranchList ({ commit }) {
        // 查询分部（不用做权限，现在是总部在使用）
        const { data } = await findDepList({ organizationType: 1 })
        commit(types.GET_BRANCH, data.data)
    },
    async findSummaryList ({ commit }, params) {
        const { data } = await getSummaryList(params)
        commit(types.GET_SUMMARY, data)
    }

}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
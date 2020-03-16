
// 金云系统 store
import * as types from './const'
import { getRecognitions, getProcessesList, getBankList, getRateList, getSignList, getSignPersonList, getProductsArr } from '../api/index'
const state = {
    pagination: {
        pageNumber: 1,
        pageSize: 10,
        total: 0
    },
    tableData: [],
    productsArr: []
}

const getters = {
    // 人脸识别列表
    tableLabelFaceRecognition: state => {
        state.tableData.map(i => {
            i.idCardVerificationN = i.idCardVerification ? '通过' : '失败'
            i.faceVerificationN = i.faceVerification ? '通过' : '失败'
        })
        return state.tableData
    },
    // 流程在线列表
    tableLabelProcessManage: state => state.tableData,
    // 账户导入列表
    tableLabelAccountImport: state => state.tableData,
    // 额度导入列表
    tableLabelAmountImport: state => {
        state.tableData.map(i => {
            if (i.statusId == '000') i.statusId = '生效'
            if (i.statusId == '001') i.statusId = '待生效'
            if (i.statusId == '002') i.statusId = '失效'
            if (i.dailyInterestRate != null) {
                i.dailyInterestRate = i.dailyInterestRate.toFixed(4) + '%'
            }
            if (i.accountReceivableQuota != null) {
                i.accountReceivableQuota = i.accountReceivableQuota.toFixed(2)
            }
            if (i.dailyQuota != null) {
                i.dailyQuota = i.dailyQuota.toFixed(2)
            }
            if (i.realDailyQuota != null) {
                i.realDailyQuota = i.realDailyQuota.toFixed(2)
            }
            if (i.monthlyQuota != null) {
                i.monthlyQuota = i.monthlyQuota.toFixed(2)
            }
            if (i.yearlyQuota != null) {
                i.yearlyQuota = i.yearlyQuota.toFixed(2)
            }
        })
        return state.tableData
    },
    // CA认证企业
    tableLabelCACompany: state => {
        state.tableData.map(i => {
            if (i.companyType == 1) i.companyType = '借款方'
            if (i.companyType == 2) i.companyType = '资金方'
            if (i.companyType == 3) i.companyType = '合作方'
            if (i.companyType == 4) i.companyType = '组织方'
            if (i.companyType == 5) i.companyType = '担保方'
            if (i.companyDocumentType == 1) i.companyDocumentType = '统一社会信用代码证'
            if (i.status == 1) i.status = '认证成功'
            if (i.status == 2) i.status = '认证失败'
        })
        return state.tableData
    },
    // CA认证个人
    tableLabelCAPerson: state => state.tableData
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
    [types.GET_TABLE_LIST] (state, payload) {
        state.pagination = {
            pageNumber: payload.current || 1,
            pageSize: payload.size || 10,
            total: payload.total || 0
        }
        state.tableData = payload.records || []
    },
    [types.GET_PRODUCE_ARR] (state, payload) {
        state.productsArr = payload || []
    }
}
const actions = {
    async getProductsArr ({ commit }, params) {
        const { data } = await getProductsArr()
        commit(types.GET_PRODUCE_ARR, data)
    },
    async getRecognitions ({ commit }, params) {
        this.commit('jinyunplatform/cleartableData')
        const { data } = await getRecognitions(params)
        commit(types.GET_TABLE_LIST, data)
    },
    async getProcessesList ({ commit }, params) {
        this.commit('jinyunplatform/cleartableData')
        const { data } = await getProcessesList(params)
        commit(types.GET_TABLE_LIST, data)
    },
    async getBankList ({ commit }, params) {
        this.commit('jinyunplatform/cleartableData')
        const { data } = await getBankList(params)
        commit(types.GET_TABLE_LIST, data)
    },
    async getRateList ({ commit }, params) {
        this.commit('jinyunplatform/cleartableData')
        const { data } = await getRateList(params)
        commit(types.GET_TABLE_LIST, data)
    },
    async getSignList ({ commit }, params) {
        const { data } = await getSignList(params)
        commit(types.GET_TABLE_LIST, data)
    },
    async getSignPersonList ({ commit }, params) {
        const { data } = await getSignPersonList(params)
        commit(types.GET_TABLE_LIST, data)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
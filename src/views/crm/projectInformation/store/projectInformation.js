
import * as types from './crmTypes'
import * as Api from '../api'
const state = {
    projectLoan: {},
    projectData: {},
    projectDetail: {},
    tabPreliminaryReview: '',
    informationDetail: '', // 资料详情
    listDetail: '' // 列表修改详情

}

const getters = {
    projectData: state => state.projectData,
    projectDetail: state => state.projectDetail,
    tabPreliminaryReview: state => state.tabPreliminaryReview,
    informationDetail: state => state.informationDetail,
    listDetail: state => state.listDetail,
    projectLoan: state => state.projectLoan

}

const mutations = {
    [types.PROJECT_DATA] (state, payload) {
        state.projectData = payload
    },
    [types.PROJECT_DETAIL] (state, payload) {
        state.projectDetail = payload
    },
    [types.TABPRELIMINARYREVIEW] (state, payload) {
        state.tabPreliminaryReview = payload
    },
    [types.INFORMATION_DETAIL] (state, payload) {
        state.informationDetail = payload
    },
    [types.INFORMATION_EDIT_DETAIL] (state, payload) {
        state.listDetail = payload
    },
    [types.PROJECT_LOAN] (state, payload) {
        state.projectLoan = payload
    }
}

const actions = {
    async findProjetpage ({ commit }, params) {
        const { data } = await Api.getProject(params)
        commit(types.PROJECT_DATA, data)
    },
    async findProjectInformationDetail ({ commit }, params) {
        const { data } = await Api.getProjectInformationDetail(params)
        commit(types.TABPRELIMINARYREVIEW, data)
    },
    async findInformationDetail ({ commit }, params) {
        const { data } = await Api.getInformationDetail(params)
        commit(types.INFORMATION_DETAIL, data)
    },
    async findInformationEditDetail ({ commit }, params) {
        const { data } = await Api.getInformationEditDetail(params)
        commit(types.INFORMATION_EDIT_DETAIL, data)
    },
    async findProjectDetail ({ commit }, params) {
        const { data } = await Api.getProjectDetail(params)
        commit(types.PROJECT_DETAIL, data)
    },
    async findListDetail ({ commit }, params) {
        const { data } = await Api.getListDetail(params)
        commit(types.LIST_DETAIL, data)
    },
    async findProjectLoan ({ commit }, params) {
        const { data } = await Api.getProjectloan(params)
        commit(types.PROJECT_LOAN, data)
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

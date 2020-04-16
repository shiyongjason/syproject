
import * as types from './crmTypes'
import * as Api from '../api'
const state = {
    projectData: {},
    projectDetail: {},
    projectLoan: {}
}

const getters = {
    projectData: state => state.projectData,
    projectDetail: state => state.projectDetail,
    projectLoan: state => state.projectLoan
}

const mutations = {
    [types.PROJECT_DATA] (state, payload) {
        state.projectData = payload
    },
    [types.PROJECT_DETAIL] (state, payload) {
        state.projectDetail = payload
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
    async findProjectDetail ({ commit }, params) {
        const { data } = await Api.getProjectDetail(params)
        commit(types.PROJECT_DETAIL, data)
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

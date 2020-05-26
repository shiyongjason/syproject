
import * as types from './crmTypes'
import * as Api from '../api'
const state = {
    projectData: {},
    projectDetail: {},
    projectLoan: {},
    crmdepList: [],
    projectRecord: [],
    punchList: []

}

const getters = {
    projectData: state => state.projectData,
    projectDetail: state => state.projectDetail,
    projectLoan: state => state.projectLoan,
    crmdepList: state => state.crmdepList,
    projectRecord: state => state.projectRecord,
    punchList: state => state.punchList

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
    },
    [types.CRM_DEPLIST] (state, payload) {
        state.crmdepList = payload
    },
    [types.PROJECT_RECORD] (state, payload) {
        state.projectRecord = payload
    },
    [types.PROJECT_PUNCH] (state, payload) {
        state.punchList = payload
    }
}

const actions = {
    async findProjetpage ({ commit }, params) {
        console.log(111111)
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
    },
    async findCrmdeplist ({ commit }, params) {
        const { data } = await Api.findCrmdep(params)
        commit(types.CRM_DEPLIST, data)
    },
    async findProjectrecord ({ commit }, params) {
        const { data } = await Api.getProjectrecord(params)
        commit(types.PROJECT_RECORD, data)
    },
    async findPunchlist ({ commit }, params) {
        console.log(params)
        const { data } = await Api.getPunchlist(params)
        commit(types.PROJECT_PUNCH, data)
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

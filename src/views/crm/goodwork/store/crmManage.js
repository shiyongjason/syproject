
import * as types from './crmTypes'
import * as Api from './../api'
const state = {
    projectData: {},
    projectDetail: {}

}

const getters = {
    projectData: state => state.projectData,
    projectDetail: state => state.projectDetail
}

const mutations = {
    [types.PROJECT_DATA] (state, payload) {
        state.projectData = payload
    },
    [types.PROJECT_DETAIL] (state, payload) {
        state.projectDetail = payload
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
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

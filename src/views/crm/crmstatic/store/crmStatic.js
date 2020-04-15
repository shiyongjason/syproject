import * as types from './crmTypes'
import * as Api from '../api'
const state = {
    projectData: {},
    projectStatic: {}
}

const getters = {
    projectData: state => state.projectData,
    projectStatic: state => state.projectStatic
}

const mutations = {
    [types.PROJECT_DATA] (state, payload) {
        state.projectData = payload
    },
    [types.PROJECT_STATIC] (state, payload) {
        state.projectStatic = payload
    }
}

const actions = {
    async findProjetpage ({ commit }, params) {
        const { data } = await Api.getProjectAccount(params)
        commit(types.PROJECT_DATA, data)
    },
    async findProjetstatic ({ commit }, params) {
        const { data } = await Api.getProjectStatic(params)
        commit(types.PROJECT_STATIC, data)
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

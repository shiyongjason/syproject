
import * as types from './crmTypes'
import * as Api from './../api'
const state = {
    projectData: {}

}

const getters = {
    projectData: state => state.projectData

}

const mutations = {
    [types.PROJECT_DATA] (state, payload) {
        state.projectData = payload
    }
}

const actions = {
    async findProjetpage ({ commit }, params) {
        const { data } = await Api.getProject(params)
        commit(types.PROJECT_DATA, data.data)
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}


const state = {
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
        commit(types.PROJECT_DATA, data)
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

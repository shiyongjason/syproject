
import * as types from './mutation-types'
import { findAllCategory, findSpecifications } from '../api'

const state = {
    categoriesTree: {},
    specificationsInfo: {
        specifications: []
    }
}

const getters = {

}

const mutations = {
    [types.CATEGORIES_TREE] (state, payload) {
        state.categoriesTree = payload
    },
    [types.SPECIFICATIONS_INFO] (state, payload) {
        state.specificationsInfo = payload
    }
}

const actions = {
    async findAllCategory ({ commit }, params) {
        const { data } = await findAllCategory(params)
        commit(types.CATEGORIES_TREE, data)
    },
    async findSpecifications ({ commit }, params) {
        const { data } = await findSpecifications(params)
        commit(types.SPECIFICATIONS_INFO, data)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
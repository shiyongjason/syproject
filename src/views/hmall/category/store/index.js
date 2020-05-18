
import * as types from './mutation-types'
import { findAllCategory } from '../api'

const state = {
    categoriesTree: {}
}

const getters = {

}

const mutations = {
    [types.CATEGORIES_TREE] (state, payload) {
        state.categoriesTree = payload
    }
}

const actions = {
    async findAllCategory ({ commit }, params) {
        const { data } = await findAllCategory(params)
        commit(types.CATEGORIES_TREE, data)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
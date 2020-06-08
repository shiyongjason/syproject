
import * as types from './mutation-types'
import { findAllCategory, findSpecifications } from '../api'

function recursiveCategory (array = [], frequency = 3) {
    if (frequency > 0) {
        return array.map(item => {
            return {
                value: item.id,
                label: item.name,
                children: recursiveCategory(item.subCategoryList, frequency - 1)
            }
        })
    }
}

const state = {
    categoriesTree: [],
    specificationsInfo: {
        specifications: []
    }
}

const getters = {
    categoryOptions: state => {
        return recursiveCategory(state.categoriesTree, 3)
    }
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
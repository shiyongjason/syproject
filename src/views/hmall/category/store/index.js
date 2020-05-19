
import * as types from './mutation-types'
import { findAllCategory, findSpecifications } from '../api'

const state = {
    categoriesTree: [],
    specificationsInfo: {
        specifications: []
    }
}

const getters = {
    categoryOptions: state => {
        return state.categoriesTree.map(item1 => {
            return {
                value: item1.id + '',
                label: item1.name,
                children: item1.subCategoryList.map(item2 => {
                    return {
                        value: item2.id + '',
                        label: item2.name,
                        children: item2.subCategoryList.map(item3 => {
                            return {
                                value: item3.id + '',
                                label: item3.name
                            }
                        })
                    }
                })
            }
        })
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
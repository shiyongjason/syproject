
import * as types from './mutation-types'
import { findAuditProducts } from '../api'

const state = {
    productsAuditListInfo: {},
    specificationsInfo: {
        specifications: []
    }
}

const getters = {
}

const mutations = {
    [types.PRODUCTS_AUDIT_TREE] (state, payload) {
        state.productsAuditListInfo = payload
    }
}

const actions = {
    // 商品审核分页列表
    async findAuditProducts ({ commit }, params) {
        const { data } = await findAuditProducts(params)
        commit(types.PRODUCTS_AUDIT_TREE, data)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
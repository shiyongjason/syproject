
import * as types from './mutation-types'
import { findAuditProducts, findBazaarLists, findProductsTemplate } from '../api'

const state = {
    productsAuditListInfo: {},
    specificationsInfo: {
        specifications: []
    },
    productsBazaarListInfo: {},
    productsTemplateInfo: {}
}

const getters = {
}

const mutations = {
    [types.PRODUCTS_AUDIT_TREE] (state, payload) {
        state.productsAuditListInfo = payload
    },
    [types.PRODUCTS_BAZAAR_INFO] (state, payload) {
        state.productsBazaarListInfo = payload
    },
    [types.PRODUCTS_TEMPLATE_INFO] (state, payload) {
        state.productsTemplateInfo = payload
    }
}

const actions = {
    // 商品审核分页列表
    async findAuditProducts ({ commit }, params) {
        const { data } = await findAuditProducts(params)
        commit(types.PRODUCTS_AUDIT_TREE, data)
    },
    // 商品审核分页列表
    async findBazaarLists ({ commit }, params) {
        const { data } = await findBazaarLists(params)
        commit(types.PRODUCTS_BAZAAR_INFO, data)
    },
    // 商品审核分页列表
    async findProductsTemplate ({ commit }, params) {
        const { data } = await findProductsTemplate(params)
        commit(types.PRODUCTS_TEMPLATE_INFO, data)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
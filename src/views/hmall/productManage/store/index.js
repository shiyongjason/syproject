import instance from '@/api/axios_new.js'

import * as types from './mutation-types.js'

const state = {
    brandData: [],
    productSpuData: {},
    productSkuData: {}
}

const getters = {

}

const mutations = {
    [types.BRAND_DATA] (state, payload) {
        state.brandData = payload
    },
    [types.PRODUCT_SPU_DATA] (state, payload) {
        state.productSpuData = payload
    },
    [types.PRODUCT_SKU_DATA] (state, payload) {
        state.productSkuData = payload
    }
}

const actions = {
    async findBrandOptions ({ commit }, params) {
        const { data } = await instance.get('/product/api/brands/list', { params })
        commit(types.BRAND_DATA, data)
    },
    async findProductSpuList ({ commit }, params) {
        const { data } = await instance.get('/product/boss/main-spu', { params })
        commit(types.PRODUCT_SPU_DATA, data)
    },
    async findProductSkuList ({ commit }, params) {
        const { data } = await instance.get('/product/boss/main-sku', { params })
        commit(types.PRODUCT_SKU_DATA, data)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

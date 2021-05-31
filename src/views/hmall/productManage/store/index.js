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
    },
    async batchEffective ({ commit }, params) {
        await instance.patch('/product/boss/main-spu/batch-enable', params)
    },
    async batchEfficacy ({ commit }, params) {
        await instance.patch('/product/boss/main-spu/batch-disable', params)
    },
    async batchDelete ({ commit }, params) {
        await instance.delete('/product/boss/main-spu', params)
    },
    async effectiveSKU ({ commit }, params) {
        await instance.patch(`/product/boss/main-sku/${params.id}/enable`, params)
    },
    async efficacySKU ({ commit }, params) {
        await instance.patch(`/product/boss/main-sku/${params.id}/disable`, params)
    },
    async deleteSKU ({ commit }, params) {
        await instance.delete(`/product/boss/main-sku/${params.id}`, params)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

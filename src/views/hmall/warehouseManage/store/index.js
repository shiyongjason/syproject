import instance from '@/api/axios_new.js'

import * as types from './mutation-types.js'

const state = {
    freightRuleData: [],
    freightRuleInfo: {},
    warehouserProductData: {},
    warehouserProductInfo: {},
    merchantData: {},
    freightProductData: {},
    selectWarehouseProduct: [],
    existSpuBrands: [],
    existSpuCategories: []
}

const getters = {

}

const mutations = {
    [types.FREIGHT_RULE_DATA] (state, payload) {
        state.freightRuleData = payload
    },
    [types.FREIGHT_RULE_INFO] (state, payload) {
        state.freightRuleInfo = payload
    },
    [types.WAREHOUSR_PRODUCT_DATA] (state, payload) {
        state.warehouserProductData = payload
    },
    [types.WAREHOUSR_PRODUCT_INFO] (state, payload) {
        state.warehouserProductInfo = payload
    },
    [types.MERCHANT_DATA] (state, payload) {
        state.merchantData = payload
    },
    [types.FREIGHT_PRODUCT_DATA] (state, payload) {
        state.freightProductData = payload
    },
    [types.SET_SELECT_WAREHOUSE_PRODUCT] (state, payload) {
        state.selectWarehouseProduct = payload
    },
    [types.EXIST_SPU_BRAND] (state, payload) {
        state.existSpuBrands = payload
    },
    [types.EXIST_SPU_CATEGORY] (state, payload) {
        state.existSpuCategories = payload
    }
}

const actions = {
    async findFreightRuleList ({ commit }, params) {
        const { data } = await instance.get('/order/boss/freight-rules', { params })
        commit(types.FREIGHT_RULE_DATA, data)
    },
    async findFreightRuleListByGoodsType ({ commit }, params) {
        const { data } = await instance.get('/order/boss/freight-rules/list-by-goods-type', { params })
        commit(types.FREIGHT_RULE_INFO, data)
    },
    async findWarahouseProductList ({ commit }, params) {
        const { data } = await instance.get('/order/boss/freight-sku', { params })
        commit(types.WAREHOUSR_PRODUCT_DATA, data)
    },
    async findWarahouseProductInfo ({ commit }, params) {
        const { data } = await instance.get(`/order/boss/freight-sku/${params.id}`, { params })
        commit(types.WAREHOUSR_PRODUCT_INFO, data)
    },
    async findMerchantList ({ commit }, params) {
        const { data } = await instance.get('/merchant/api/company/boss/list', { params })
        commit(types.MERCHANT_DATA, data)
    },
    async findFreightProductList ({ commit }, params) {
        const { data } = await instance.get('/product/api/sku/freightSku/page', { params })
        commit(types.FREIGHT_PRODUCT_DATA, data)
    },
    async createWarahouseProduct ({ commit }, params) {
        await instance.post('/order/boss/freight-sku/batch/save', params)
    },
    async updateWarahouseProduct ({ commit }, params) {
        await instance.put('/order/boss/freight-sku', params)
    },
    async deleteWarahouseProduct ({ commit }, params) {
        await instance.delete(`/order/boss/freight-sku/${params.id}`, params)
    },
    // 存在spu的品牌
    async findExistSpuBrands ({ commit }, params) {
        const { data } = await instance.get('/product/open-api/exist-spu/brand', { params })
        commit(types.EXIST_SPU_BRAND, data)
    },
    // 存在spu的类目
    async findExistSpuCategories ({ commit }, params) {
        const { data } = await instance.get('/product/open-api/exist-spu/category', { params })
        commit(types.EXIST_SPU_CATEGORY, data)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

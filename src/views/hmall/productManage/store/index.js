import instance from '@/api/axios_new.js'

import * as types from './mutation-types.js'

const state = {
    brandData: [],
    categoryData: [],
    modelData: [],
    specData: [],
    productSpuData: {},
    productSkuData: {},
    productUnique: '',
    productSpuInfo: {},
    productSkuInfo: {},
    optionId: '',
    optionValueData: []
}

const getters = {
    brandOption: state => {
        return state.brandData.map(item => {
            item.value = item.name
            return item
        })
    },
    modelOption: state => {
        return state.modelData.map(item => {
            item.value = item.model
            return item
        })
    },
    categoryOption: state => state.categoryData,
    specData: state => {
        return state.specData.specifications || []
    }
}

const mutations = {
    [types.BRAND_DATA] (state, payload) {
        state.brandData = payload
    },
    [types.CATEGORY_DATA] (state, payload) {
        state.categoryData = payload
    },
    [types.MODEL_DATA] (state, payload) {
        state.modelData = payload
    },
    [types.SPEC_DATA] (state, payload) {
        state.specData = payload
    },
    [types.PRODUCT_SPU_DATA] (state, payload) {
        state.productSpuData = payload
    },
    [types.PRODUCT_SKU_DATA] (state, payload) {
        state.productSkuData = payload
    },
    [types.PRODUCT_UNIQUE] (state, payload) {
        state.productUnique = payload
    },
    [types.PRODUCT_SPU_INFO] (state, payload) {
        state.productSpuInfo = payload
    },
    [types.PRODUCT_SKU_INFO] (state, payload) {
        state.productSkuInfo = payload
    },
    [types.OPTION_ID] (state, payload) {
        state.optionId = payload
    },
    [types.OPTION_VALUE_DATA] (state, payload) {
        state.optionValueData = payload
    }
}

const actions = {
    // 查询所有品牌
    async findBrandOptions ({ commit }, params) {
        const { data } = await instance.get('/product/api/brands/list', { params })
        commit(types.BRAND_DATA, data)
    },
    // 查询所有类目结构树
    async findCategoryOptions ({ commit }, params) {
        const { data } = await instance.get('/product/api/categories/tree', { params })
        commit(types.CATEGORY_DATA, data)
    },
    // 根据型号、品牌、类目匹配spu
    async findModelOptions ({ commit }, params) {
        const { data } = await instance.get('/product/boss/main-spu/model-match', { params })
        commit(types.MODEL_DATA, data)
    },
    // 查询类目规格参数
    async findSpecByCategory ({ commit }, params) {
        const { data } = await instance.get(`/product/api/categories/specifications/${params.categoryId}`, { params })
        commit(types.SPEC_DATA, data)
    },
    async findProductSpuList ({ commit }, params) {
        const { data } = await instance.get('/product/boss/main-spu', { params })
        commit(types.PRODUCT_SPU_DATA, data)
    },
    async findProductSkuList ({ commit }, params) {
        const { data } = await instance.get('/product/boss/main-sku', { params })
        commit(types.PRODUCT_SKU_DATA, data)
    },
    async checkProductUnique ({ commit }, params) {
        const { data } = await instance.get(`/product/boss/main-spu/unique-check`, { params })
        commit(types.PRODUCT_UNIQUE, data)
    },
    async findProductSpuInfo ({ commit }, params) {
        const { data } = await instance.get(`/product/boss/main-spu/${params.id}`)
        commit(types.PRODUCT_SPU_INFO, data)
    },
    async findProductSkuInfo ({ commit }, params) {
        const { data } = await instance.get(`/product/boss/main-sku/${params.id}`, { params })
        commit(types.PRODUCT_SKU_INFO, data)
    },
    async addOption ({ commit }, params) {
        const { data } = await instance.post('/product/boss/main-spu-option-types', params)
        commit(types.OPTION_ID, data)
    },
    async editOption ({ commit }, params) {
        const { data } = await instance.put(`/product/boss/main-spu-option-types/${params.id}`, params)
        commit(types.OPTION_ID, data)
    },
    async addOptionValue ({ commit }, params) {
        const { data } = await instance.post(`/product/boss/main-spu-option-types/${params.id}/option-values`, params.name, { headers: { 'Content-Type': 'application/json' } })
        commit(types.OPTION_VALUE_DATA, data)
    },
    async createProduct ({ commit }, params) {
        await instance.post('/product/boss/main-spu', params)
    },
    async editProduct ({ commit }, params) {
        await instance.put(`/product/boss/main-spu/${params.id}`, params)
    },
    async effective ({ commit }, params) {
        await instance.patch(`/product/boss/main-spu/${params.id}/enable`, params)
    },
    async efficacy ({ commit }, params) {
        await instance.patch(`/product/boss/main-spu/${params.id}/disable`, params)
    },
    async batchEffective ({ commit }, params) {
        await instance.patch('/product/boss/main-spu/batch-enable', params)
    },
    async batchEfficacy ({ commit }, params) {
        await instance.patch('/product/boss/main-spu/batch-disable', params)
    },
    async delete ({ commit }, params) {
        await instance.delete(`/product/boss/main-spu/${params.id}`, { data: params })
    },
    async batchDelete ({ commit }, params) {
        await instance.delete('/product/boss/main-spu', { data: params })
    },
    async effectiveSKU ({ commit }, params) {
        await instance.patch(`/product/boss/main-sku/${params.id}/enable`, params)
    },
    async efficacySKU ({ commit }, params) {
        await instance.patch(`/product/boss/main-sku/${params.id}/disable`, params)
    },
    async deleteSKU ({ commit }, params) {
        await instance.delete(`/product/boss/main-sku/${params.id}`, params)
    },
    // 批量审核
    async batchAduitSku ({ commit }, params) {
        await instance.patch('/product/boss/main-sku/batch-audit', params)
    },
    async batchAduitSpu ({ commit }, params) {
        await instance.patch('/product/boss/main-spu/batch-audit', params)
    },
    // 批量审核
    async aduitSku ({ commit }, params) {
        await instance.patch('/product/boss/main-sku/audit', params)
    },
    async aduitSpu ({ commit }, params) {
        await instance.patch('/product/boss/main-spu/audit', params)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

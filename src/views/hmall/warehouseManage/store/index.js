import instance from '@/api/axios_new.js'

import * as types from './mutation-types.js'

const state = {
    freightRuleData: []
}

const getters = {

}

const mutations = {
    [types.FREIGHT_RULE_DATA] (state, payload) {
        state.freightRuleData = payload
    }
    // [types.SECKILL_DATA] (state, payload) {
    //     state.seckillData = payload
    // },
    // [types.SET_SECKILL_SALE_AREA_LIST] (state, payload) {
    //     state.seckillSaleAreaList = payload
    // },
    // [types.SET_SELECT_SECKILL_PRODUCT] (state, payload) {
    //     state.selectSeckillProduct = payload
    // },
    // [types.SECKILL_SKU_DATA] (state, payload) {
    //     state.seckillSkuData = payload
    // },
    // [types.SELECT_SKU_DATA] (state, payload) {
    //     state.selectSkuData = payload
    // },
    // [types.LIST_TRACK] (state, payload) {
    //     state.listTrack = payload
    // }
}

const actions = {
    async findFreightRuleList ({ commit }, params) {
        const { data } = await instance.get('/order/boss/freight/rule', { params })
        commit(types.FREIGHT_RULE_DATA, data)
    }
    // async findSeckillList ({ commit }, params) {
    //     const { data } = await instance.get('/ops/api/spike', { params })
    //     commit(types.SECKILL_DATA, data)
    // },
    // async updateSeckillList ({ commit }, params) {
    //     await instance.post('/ops/api/spike/status', params)
    // },
    // async findSeckillSkuList ({ commit }, params) {
    //     const { data } = await instance.post('/product/api/market/spike/sku/page?pageNumber=' + params.pageNumber + '&pageSize=' + params.pageSize, params)
    //     commit(types.SECKILL_SKU_DATA, data)
    // },
    // async findSelectSkuList ({ commit }, params) {
    //     const { data } = await instance.post('/product/api/market/sku/select', params)
    //     commit(types.SELECT_SKU_DATA, data)
    // },
    // async hoverTrack ({ commit }, params) {
    //     const { data } = await axios.get('ets/api/b2b/activity/hover', { params })
    //     commit(types.LIST_TRACK, data)
    // },
    // async addStock ({ commit }, params) {
    //     await instance.patch('/ops/api/spike/add-stock', params)
    // }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

import * as types from './mutation-types'

import { findSpikePriceData, findSpikePriceInfo, findSpecialPriceInfo, findCouponUseData, getTransactionInfo, getOrdinaryBiGoodDetail, getSpikeBiGoodDetail } from '../api/index'
const state = {
    spikePriceData: {},
    spikePriceInfo: {},
    couponUseData: {},
    // 交易额明细
    transactionInfoData: [],
    transactionPaginationData: {
        pageNumber: 1,
        pageSize: 10,
        total: 0
    },
    // 商品详情
    biGoodsData: [],
    biGoodsPaginationData: {
        pageNumber: 1,
        pageSize: 10,
        total: 0
    }
}

const mutations = {
    [types.SPIKE_PRICE_DATA] (state, payload) {
        state.spikePriceData = payload
    },
    [types.SPIKE_PRICE_INFO] (state, payload) {
        state.spikePriceInfo = payload
    },
    [types.COUPON_USE_DATA] (state, payload) {
        state.couponUseData = payload
    },
    [types.GET_TRANSACTION_INFO] (state, payload) {
        state.transactionInfoData = payload.records
        state.transactionPaginationData = {
            pageNumber: payload.current,
            pageSize: payload.size,
            total: payload.total
        }
    },
    [types.GET_ORDINARY_BI_GOOD_DETAIL] (state, payload) {
        state.biGoodsData = payload.records
        state.biGoodsPaginationData = {
            pageNumber: payload.current,
            pageSize: payload.size,
            total: payload.total
        }
    },
    [types.GET_SPIKE_BI_GOOD_DETAIL] (state, payload) {
        state.biGoodsData = payload.records
        state.biGoodsPaginationData = {
            pageNumber: payload.current,
            pageSize: payload.size,
            total: payload.total
        }
    },
    [types.INIT_BI_GOOD_DETAIL] (state, payload) {
        state.biGoodsData = []
        state.biGoodsPaginationData = {
            pageNumber: 1,
            pageSize: 10,
            total: 0
        }
    }
}

const actions = {
    async findSpikePriceData ({ commit }, params) {
        const { data } = await findSpikePriceData(params)
        commit(types.SPIKE_PRICE_DATA, data)
    },
    async findSpikePriceInfo ({ commit }, params) {
        const { data } = await findSpikePriceInfo(params)
        commit(types.SPIKE_PRICE_INFO, data)
    },
    async findCouponUseData ({ commit }, params) {
        const { data } = await findCouponUseData(params)
        commit(types.COUPON_USE_DATA, data)
    },

    async findTransactionInfo ({ commit }, params) {
        const { data } = await getTransactionInfo(params)
        commit(types.GET_TRANSACTION_INFO, data)
    },
    async findOrdinaryBiGoodDetail ({ commit }, params) {
        const { data } = await getOrdinaryBiGoodDetail(params)
        commit(types.GET_ORDINARY_BI_GOOD_DETAIL, data)
    },
    async findSpikeBiGoodDetail ({ commit }, params) {
        const { data } = await getSpikeBiGoodDetail(params)
        commit(types.GET_SPIKE_BI_GOOD_DETAIL, data)
    },
    initBiGoodDetail ({ commit }) {
        commit(types.INIT_BI_GOOD_DETAIL)
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}

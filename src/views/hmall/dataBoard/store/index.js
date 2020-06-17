import * as types from './mutation-types'

import { findCommonMemberData, findSeckillMemberData, findSpikePriceData, findSpikePriceInfo, findSpecialPriceData, findSpecialPriceInfo, findCouponUseData, getTransactionInfo, getOrdinaryBiGoodDetail, getSpikeBiGoodDetail, getMemberDetailInfo } from '../api/index'

const state = {
    commonMemberData: {},
    seckillMemberInfo: {},
    spikePriceData: {},
    spikePriceInfo: {},
    specialPriceData: {},
    specialPriceInfo: {},
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
    },
    // 会员注册明细
    memberDetailData: [],
    memberDetailPaginationData: {
        pageNumber: 1,
        pageSize: 10,
        total: 0
    }
}

const mutations = {
    [types.COMMON_MEMBER_DATA] (state, payload) {
        state.commonMemberData = payload
    },
    [types.SECKILL_MEMBER_DATA] (state, payload) {
        state.seckillMemberInfo = payload
    },
    [types.SPIKE_PRICE_DATA] (state, payload) {
        state.spikePriceData = payload
    },
    [types.SPIKE_PRICE_INFO] (state, payload) {
        state.spikePriceInfo = payload
    },
    [types.SPECIAL_PRICE_DATA] (state, payload) {
        state.specialPriceData = payload
    },
    [types.SPECIAL_PRICE_INFO] (state, payload) {
        state.specialPriceInfo = payload
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
    [types.GET_MEMBER_DETAIL_DATA] (state, payload) {
        console.log(payload)
        state.memberDetailData = payload.records
        state.memberDetailPaginationData = {
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
    async findCommonMemberData ({ commit }, params) {
        const { data } = await findCommonMemberData(params)
        commit(types.COMMON_MEMBER_DATA, data)
    },
    async findSeckillMemberData ({ commit }, params) {
        const { data } = await findSeckillMemberData(params)
        commit(types.SECKILL_MEMBER_DATA, data)
    },
    async findSpikePriceData ({ commit }, params) {
        const { data } = await findSpikePriceData(params)
        commit(types.SPIKE_PRICE_DATA, data)
    },
    async findSpikePriceInfo ({ commit }, params) {
        const { data } = await findSpikePriceInfo(params)
        commit(types.SPIKE_PRICE_INFO, data)
    },
    async findSpecialPriceData ({ commit }, params) {
        const { data } = await findSpecialPriceData(params)
        commit(types.SPECIAL_PRICE_DATA, data)
    },
    async findSpecialPriceInfo ({ commit }, params) {
        const { data } = await findSpecialPriceInfo(params)
        commit(types.SPECIAL_PRICE_INFO, data)
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
    async findMemberDetailInfo ({ commit }, params) {
        const { data } = await getMemberDetailInfo(params)
        commit(types.GET_MEMBER_DETAIL_DATA, data)
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

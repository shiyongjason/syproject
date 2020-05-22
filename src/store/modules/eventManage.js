import * as types from '../mutation-types'
import instance from '@/api/axios_new'
import axios from 'axios'
const state = {
    eventProducts: JSON.parse(sessionStorage.getItem('eventProducts')) || [],
    skuData: {},
    spikeData: {},
    eventTrackData: {},
    eventInfos: {},
    listTrack: {}
}

const getters = {
    eventProducts: state => state.eventProducts,
    eventInfos: state => state.eventInfos
}

const mutations = {
    [types.ADD_EVENT_PRODUCTS] (state, payload) {
        const productArr = state.eventProducts
        payload && payload.map(item => {
            productArr.push(item)
        })
        // 去重
        // const newproductArr = productArr.filter(item => item.id)
        // console.log(newproductArr)
        state.eventProducts = productArr
        sessionStorage.setItem('eventProducts', JSON.stringify(state.eventProducts))
        // state.eventProducts = payload
    },
    [types.REMOVE_EVENT_PRODUCTS] (state, payload) {
        const productArr = JSON.parse(sessionStorage.getItem('eventProducts')) || []
        state.eventProducts = productArr && productArr.filter(item => item.skuCode != payload.skuCode)
        sessionStorage.setItem('eventProducts', JSON.stringify(state.eventProducts))
    },
    [types.EMPTY_EVENT_PRODUCTS] (state, payload) {
        state.eventProducts = []
        sessionStorage.removeItem('eventProducts')
    },
    [types.SKU_DATA] (state, payload) {
        state.skuData = payload
    },
    [types.SPIKE_DATA] (state, payload) {
        state.spikeData = payload
    },
    [types.SET_EVENT_INFO] (state, payload) {
        state.eventInfos = payload
    },
    [types.EVENT_DATA] (state, payload) {
        state.eventTrackData = payload
    },
    [types.LIST_TRACK] (state, payload) {
        state.listTrack = payload
    }
}

const actions = {
    async findListSku ({ commit }, params) {
        const { data } = await instance.get('/product/api/market/spike/sku/page', { params })
        commit(types.SKU_DATA, data)
    },
    /** 活动详情 */
    async eventInfo ({ commit }, { id, isFirst }) {
        const { data } = await instance.get(`/ops/api/spike/base-info/${id}`, {})
        if (isFirst) {
            commit(types.EMPTY_EVENT_PRODUCTS)
            commit(types.ADD_EVENT_PRODUCTS, data.spikeSku)
        }
        data.spikeSku = state.eventProducts
        commit(types.SET_EVENT_INFO, data)
    },
    async findSpike ({ commit }, params) {
        const { data } = await instance.get('/ops/api/spike', { params })
        commit(types.SPIKE_DATA, data)
    },
    async findEventTrack ({ commit }, params) {
        const { data } = await axios.get('ets/api/b2b/activity/grid', { params })
        commit(types.EVENT_DATA, data)
    },
    async hoverTrack ({ commit }, params) {
        const { data } = await axios.get('ets/api/b2b/activity/hover', { params })
        commit(types.LIST_TRACK, data)
    },
    /** 复制活动 */
    async copy ({ commit }, { id, isFirst }) {
        const { data } = await instance.get(`/ops/api/spike/copy/${id}`, {})
        if (isFirst) {
            commit(types.EMPTY_EVENT_PRODUCTS)
            commit(types.ADD_EVENT_PRODUCTS, data.spikeSku)
        }
        data.spikeSku = state.eventProducts
        commit(types.SET_EVENT_INFO, data)
    }

}
export default {
    state,
    getters,
    actions,
    mutations
}

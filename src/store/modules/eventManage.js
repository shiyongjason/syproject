import * as types from '../mutation-types'
import instance from '@/api/axios_new'
const state = {
    eventProducts: JSON.parse(sessionStorage.getItem('eventProducts')) || [],
    skuData: [],
    spikeData: [],
    eventInfo: {}
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
        console.log(payload)
        const productArr = JSON.parse(sessionStorage.getItem('eventProducts')) || []
        state.eventProducts = productArr && productArr.filter(item => item.id != payload.id)
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
        console.log('state.eventInfos', state.eventInfos)
    }
}

const actions = {
    async findListSku ({ commit }, params) {
        const { data } = await instance.get('/product/api/sku', { params })
        commit(types.SKU_DATA, data)
    },
    /** 活动详情 */
    async eventInfo ({ commit }, id) {
        const { data } = await instance.get(`/ops/api/spike/base-info/${id}`, {})
        commit(types.ADD_EVENT_PRODUCTS, data.spikeSku)
        commit(types.SET_EVENT_INFO, data)
    },
    async findSpike ({ commit }, params) {
        const { data } = await instance.get('/ops/api/spike', { params })
        commit(types.SPIKE_DATA, data)
    }

}
export default {
    state,
    getters,
    actions,
    mutations
}

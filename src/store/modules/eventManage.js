import * as types from '../mutation-types'
import instance from '@/api/axios_new'
const state = {
    eventProducts: JSON.parse(sessionStorage.getItem('eventProducts')) || [],
    skuData: [],
    spikeData: [],
    eventInfos: {}
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
        let len = data.spikeSku.length - state.eventProducts.length
        if (len < 0) {
            const arr = state.eventProducts.splice(len)
            data.spikeSku = data.spikeSku.concat(arr)
        }
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

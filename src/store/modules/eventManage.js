import * as types from '../mutation-types'
import instance from '@/api/axios_new'
const state = {
    eventProducts: JSON.parse(sessionStorage.getItem('eventProducts')) || [],
    skuData: [],
    spikeData: []
}

const getters = {
    eventProducts: state => state.eventProducts
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
    [types.SKU_DATA] (state, payload) {
        state.skuData = payload
    },
    [types.SPIKE_DATA] (state, payload) {
        state.spikeData = payload
    }
}

const actions = {
    async findListSku ({ commit }, params) {
        const { data } = await instance.get('/product/api/sku', { params })
        commit(types.SKU_DATA, data)
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

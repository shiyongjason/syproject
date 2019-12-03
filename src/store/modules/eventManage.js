import * as types from '../mutation-types'
import instance from '@/api/axios_new'
const state = {
    eventProducts: [],
    skuData: []
}

const getters = {
    eventProducts: state => state.eventProducts
}

const mutations = {
    [types.ADD_EVENT_PRODUCTS] (state, payload) {
        console.log(payload)
        payload && payload.map(item=>{
            state.eventProducts.push(item)
        })
        // state.eventProducts = payload
    },
    [types.SKU_DATA] (state, payload) {
        state.skuData = payload
    }
}

const actions = {
    async findListSku ({ commit }, params) {
        const { data } = await instance.get('/product/api/sku', { params })
        commit(types.SKU_DATA, data)
    }

}
export default {
    state,
    getters,
    actions,
    mutations
}

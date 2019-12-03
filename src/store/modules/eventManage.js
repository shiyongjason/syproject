import * as types from '../mutation-types'
import instance from '@/api/axios_new'
const state = {
    eventProducts: JSON.parse(sessionStorage.getItem('eventProducts')) || [],
    skuData: []
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
        state.eventProducts = productArr
        sessionStorage.setItem('eventProducts', JSON.stringify(state.eventProducts))
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

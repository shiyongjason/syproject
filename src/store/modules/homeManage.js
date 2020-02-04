import * as types from '../mutation-types'
import instance from '@/api/axios_new'
import axios from 'axios'
const state = {
    homeData：{ }
}

const getters = {
    eventProducts: state => state.eventProducts,

}

const mutations = {
    [types.LIST_TRACK] (state, payload) {
        state.listTrack = payload
    }
}

const actions = {
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

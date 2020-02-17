import * as types from '../fundsData-type'
import axios from 'axios'
import { findPlatformslist } from '@/views/fundsData/api'
const state = {
    platformData: {}
}

const getters = {
    platformData: state => state.platformData
}

const mutations = {
    [types.PLAT_FORMDATA] (state, payload) {
        const productArr = state.eventProducts
        state.platformData = payload
    }
}

const actions = {
    async findPlatformslist ({ commit }, params) {
        const { data } = await findPlatformslist()
        commit(types.PLAT_FORMDATA, data)
    },
}
export default {
    state,
    getters,
    actions,
    mutations
}
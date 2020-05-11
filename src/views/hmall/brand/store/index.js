
import * as types from './mutation-types'
import { findBrandAreaList, findBrandArea } from '../api'

const state = {
    brandAuthorizationInfo: {},
    brandAreaInfo: {}
}

const getters = {

}

const mutations = {
    [types.BRAND_AUTHORIZATION_INFO] (state, payload) {
        state.brandAuthorizationInfo = payload
    },
    [types.BRAND_AREA_INFO] (state, payload) {
        state.brandAreaInfo = payload
    }
}

const actions = {
    async findBrandAreaList ({ commit }, params) {
        const { data } = await findBrandAreaList(params)
        commit(types.BRAND_AUTHORIZATION_INFO, data)
    },
    async findBrandArea ({ commit }, params) {
        const { data } = await findBrandArea(params)
        commit(types.BRAND_AREA_INFO, data)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
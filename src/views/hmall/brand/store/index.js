
import * as types from './mutation-types'
import { findBrandAreaList } from '../api'

const state = {
    brandAuthorizationInfo: {}
}

const getters = {

}

const mutations = {
    [types.BRAND_AUTHORIZATION_INFO] (state, payload) {
        state.brandAuthorizationInfo = payload
    }
}

const actions = {
    async findBrandAreaList ({ commit }, params) {
        const { data } = await findBrandAreaList(params)
        commit(types.BRAND_AUTHORIZATION_INFO, data)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
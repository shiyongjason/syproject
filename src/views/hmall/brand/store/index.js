
import * as types from './mutation-types'
import { findBrandList, findBrandAreaList, findBrandArea, findBrandDetail } from '../api'

const state = {
    brandListInfo: {},
    brandAuthorizationInfo: {},
    brandAreaInfo: {},
    brandDetail: {}
}

const getters = {

}

const mutations = {
    [types.BRAND_LIST_INFO] (state, payload) {
        state.brandListInfo = payload
    },
    [types.BRAND_AUTHORIZATION_INFO] (state, payload) {
        state.brandAuthorizationInfo = payload
    },
    [types.BRAND_AREA_INFO] (state, payload) {
        state.brandAreaInfo = payload
    },
    [types.BRAND_DETAIL] (state, payload) {
        state.brandDetail = payload
    }
}

const actions = {
    async findBrandList ({ commit }, params) {
        const { data } = await findBrandList(params)
        commit(types.BRAND_LIST_INFO, data)
    },
    async findBrandAreaList ({ commit }, params) {
        const { data } = await findBrandAreaList(params)
        commit(types.BRAND_AUTHORIZATION_INFO, data)
    },
    async findBrandArea ({ commit }, params) {
        const { data } = await findBrandArea(params)
        commit(types.BRAND_AREA_INFO, data)
    },
    async findBrandDetail ({ commit }, params) {
        const { data } = await findBrandDetail(params)
        commit(types.BRAND_DETAIL, data)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

import * as types from './mutation-types'
import { findBrandList, findBrandAreaList, findBrandAreaDetail, findBrandDetail, getChiness } from '../api'

const state = {
    brandListInfo: {},
    brandAuthorizationInfo: {},
    brandAreaInfo: {},
    brandDetail: {},
    chineseArea: []
}

const getters = {
    // 省市区遍历成级联树结构
    areaOptions: state => {
        return state.chineseArea.map(item1 => {
            return {
                value: item1.provinceId,
                label: item1.name,
                children: item1.cities.map(item2 => {
                    return {
                        value: item2.cityId,
                        label: item2.name,
                        children: item2.countries.map(item3 => {
                            return {
                                value: item3.countryId,
                                label: item3.name
                            }
                        })
                    }
                })
            }
        })
    }
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
    },
    [types.CHINESE_AREA] (state, payload) {
        state.chineseArea = payload
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
    async findBrandAreaDetail ({ commit }, params) {
        const { data } = await findBrandAreaDetail(params)
        commit(types.BRAND_AREA_INFO, data)
    },
    async findBrandDetail ({ commit }, params) {
        const { data } = await findBrandDetail(params)
        commit(types.BRAND_DETAIL, data)
    },
    async getChiness ({ commit }, params) {
        const { data } = await getChiness(params)
        commit(types.CHINESE_AREA, data || [])
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
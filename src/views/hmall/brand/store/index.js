
import * as types from './mutation-types'
import { findBrandList, findBrandAreaList, findBrandAreaDetail, findBrandDetail, getChiness, findAllBrands } from '../api'

function recursiveChineseArea (array = [], frequency = 3) {
    if (frequency > 0) {
        return array.map(item => {
            return {
                value: item.countryId || item.cityId || item.provinceId,
                label: item.name,
                children: recursiveChineseArea(item.cities || item.countries, frequency - 1)
            }
        })
    }
}

const state = {
    brandListInfo: {},
    brandAuthorizationInfo: {},
    brandAreaInfo: {},
    brandDetail: {},
    brandAllArray: [],
    chineseArea: []
}

const getters = {
    // 省市区遍历成级联树结构
    countryOptions: state => {
        return recursiveChineseArea(state.chineseArea, 3) || []
    },
    cityOptions: state => {
        return recursiveChineseArea(state.chineseArea, 2) || []
    },
    // 品牌下拉选择器
    brandOptions: state => {
        return state.brandAllArray.map(item => {
            return {
                value: item.id,
                label: item.name
            }
        }) || []
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
    [types.BRAND_ALL_ARRAY] (state, payload) {
        state.brandAllArray = payload
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
    async findAllBrands ({ commit }) {
        const { data } = await findAllBrands()
        commit(types.BRAND_ALL_ARRAY, data || [])
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
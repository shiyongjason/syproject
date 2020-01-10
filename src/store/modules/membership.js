import * as types from '../mutation-types'
import { getChiness, getBossMerchant, getBossMerchantDetail, getBossMerchantStatic, findBrandsList } from '@/views/hmall/membership/api'
const state = {
    nestDdata: {},
    merchantData: [],
    merchantDetail: {},
    merchantStatic: {},
    branchList: []
}

const getters = {
    nestDdata: state => state.nestDdata,
    merchantData: state => state.merchantData,
    merchantDetail: state => state.merchantDetail,
    merchantStatic: state => state.merchantStatic,
    branchList: state => state.branchList
}

const mutations = {
    [types.NEST_DATA] (state, payload) {
        state.nestDdata = payload
    },
    [types.MERCHT_DATA] (state, payload) {
        state.merchantData = payload
    },
    [types.MERCHT_DETAIL] (state, payload) {
        state.merchantDetail = payload
    },
    [types.MERCHT_STATIC] (state, payload) {
        state.merchantStatic = payload
    },
    [types.BRANCH_LIST] (state, payload) {
        state.branchList = payload
    }
}

const actions = {
    async findNest ({ commit }, params) {
        const { data } = await getChiness(params)
        commit(types.NEST_DATA, data)
    },
    async findMerchantList ({ commit }, params) {
        const { data } = await getBossMerchant(params)
        commit(types.MERCHT_DATA, data)
    },
    async findMerchantDetail ({ commit }, params) {
        const { data } = await getBossMerchantDetail(params)
        commit(types.MERCHT_DETAIL, data)
    },
    async findMerchantStatic ({ commit }, params) {
        const { data } = await getBossMerchantStatic(params)
        commit(types.MERCHT_STATIC, data)
    },
    async findBranch ({ commit }, params) {
        const { data } = await findBrandsList(params)
        commit(types.BRANCH_LIST, data)
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}

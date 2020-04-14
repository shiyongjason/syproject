import * as types from './const'
import { getCompanyType } from '../api'
const state = {
    dictInfoType: {}
}

const getters = {
    dictInfoType: state => state.dictInfoType
}

const mutations = {
    [types.DICTINFO_TYPE] (state, payload) {
        state.dictInfoType = payload
    }
}

const actions = {
    async findCompanyType ({ commit }, params) {
        const { data } = await getCompanyType(params)
        commit(types.DICTINFO_TYPE, data)
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

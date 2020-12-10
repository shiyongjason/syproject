import * as types from './const'
import { getPersonalCAList, getCompanyCAList } from '../api/index'

const state = {
    tableData: [],
    paginationInfo: {}
}

const mutations = {
    [types.GET_PERSONAL_CA_LIST] (state, payload) {
        state.tableData = payload
    },
    [types.GET_PERSON_PAGINATIONINFO] (state, payload) {
        state.paginationInfo = payload
    }
}

const actions = {
    async getPersonalCAList ({ commit }, params) {
        const { data } = await getPersonalCAList(params)
        commit(types.GET_PERSONAL_CA_LIST, data.records)
        commit(types.GET_PERSON_PAGINATIONINFO, {
            pageNumber: data.current,
            pageSize: data.size,
            total: data.total
        })
    },
    async getCompanyCAList ({ commit }, params) {
        const { data } = await getCompanyCAList(params)
        commit(types.GET_PERSONAL_CA_LIST, data.records)
        commit(types.GET_PERSON_PAGINATIONINFO, {
            pageNumber: data.current,
            pageSize: data.size,
            total: data.total
        })
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}

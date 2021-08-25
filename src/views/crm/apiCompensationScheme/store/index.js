import * as TYPES from './types'
import * as API from '../api/index'
const state = {
    apiCompensationSchemeData: []
}

const getters = {
    apiCompensationSchemeList: state => state.apiCompensationSchemeData.records,
    apiCompensationSchemePagination: state => {
        return {
            total: state.apiCompensationSchemeData.total,
            pageSize: state.apiCompensationSchemeData.size,
            amount: state.apiCompensationSchemeData.amount,
            pageNumber: state.apiCompensationSchemeData.current
        }
    }
}

const mutations = {
    [TYPES.API_COMPENSATION_SCHEME_LIST] (state, payload) {
        state.apiCompensationSchemeData = payload
    }
}

const actions = {
    async apiCompensationSchemeList ({ commit }, params) {
        const { data } = await API.getApiCompensationSchemeList(params)
        commit(TYPES.API_COMPENSATION_SCHEME_LIST, data)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

import * as types from '../mutation-types'
import { getRealreport, getHostoryreport } from '@/views/comfortcloud/api'
const state = {
    realReport: {},
    hostoryReport: {}
}

const getters = {
    realReport: state => state.realReport,
    hostoryReport: state => state.hostoryReport
}

const mutations = {
    [types.REAL_REPORT] (state, payload) {
        state.realReport = payload
    },
    [types.HOSTORY_REPORT] (state, payload) {
        state.hostoryReport = payload
    }
}

const actions = {
    async findRealreport ({ commit }, params) {
        const { data } = await getRealreport()
        commit(types.REAL_REPORT, data.data)
    },
    async findHostoryreport ({ commit }, params) {
        const { data } = await getHostoryreport()
        commit(types.HOSTORY_REPORT, data.data)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}

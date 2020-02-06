import * as types from '../mutation-types'
import { getRealreport } from '@/views/comfortcloud/api'
const state = {
    realReport: {}
}

const getters = {
    realReport: state => state.realReport
}

const mutations = {
    [types.REAL_REPORT] (state, payload) {
        state.realReport = payload
    }
}

const actions = {
    async findRealreport ({ commit }, params) {
        const { data } = await getRealreport()
        commit(types.REAL_REPORT, data.data)
    }

}
export default {
    state,
    getters,
    actions,
    mutations
}

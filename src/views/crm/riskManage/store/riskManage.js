
import * as types from './riskTypes'
import * as Api from '../api'
const state = {
    docTempdata: {},
    docTempdetail: {}
}

const getters = {
    docTempdata: state => state.docTempdata,
    docTempdetail: state => state.docTempdetail

}

const mutations = {
    [types.DOC_TEMDATA] (state, payload) {
        state.docTempdata = payload
    },
    [types.DOC_TEMPDETAIL] (state, payload) {
        state.docTempdetail = payload
    }
}

const actions = {
    async findDocTemplist ({ commit }, params) {
        const { data } = await Api.getDoctemplist(params)
        commit(types.DOC_TEMDATA, data)
    },
    async findDocTempdetail ({ commit }, params) {
        const { data } = await Api.getDoctempDetail(params)
        commit(types.DOC_TEMPDETAIL, data)
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

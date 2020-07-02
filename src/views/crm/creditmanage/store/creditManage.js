
import * as types from './creditTypes'
import * as Api from '../api'
const state = {
    creditdata: {},
    creditPage: {},
    creditDetail: {},
    creditDocument: {},
    creditRecords: []

}

const getters = {
    creditdata: state => state.creditdata,
    creditPage: state => state.creditPage,
    creditDetail: state => state.creditDetail,
    creditDocument: state => state.creditDocument,
    creditRecords: state => state.creditRecords

}

const mutations = {
    [types.CREDIT_DATA] (state, payload) {
        state.creditdata = payload
    },
    [types.CREDIT_PAGE] (state, payload) {
        state.creditPage = payload
    },
    [types.CREDIT_DETAIL] (state, payload) {
        state.creditDetail = payload
    },
    [types.CREDIT_DOCUMENT] (state, payload) {
        state.creditDocument = payload
    },
    [types.CREDIT_RECORDS] (state, payload) {
        state.creditRecords = payload
    }
}

const actions = {
    async findCreditManager ({ commit }, params) {
        const { data } = await Api.getCreditManager(params)
        commit(types.CREDIT_DATA, data)
    },
    async findCreditPage ({ commit }, params) {
        const { data } = await Api.getCreditPage(params)
        commit(types.CREDIT_PAGE, data)
    },
    async findCreditDetail ({ commit }, params) {
        const { data } = await Api.getCreditDetail(params)
        commit(types.CREDIT_DETAIL, data)
    },
    async findCreditDocument ({ commit }, params) {
        const { data } = await Api.getCreditDocument(params)
        commit(types.CREDIT_DOCUMENT, data)
    },
    async findCreditRecords ({ commit }, params) {
        const { data } = await Api.getCreditRecords(params)
        commit(types.CREDIT_RECORDS, data)
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

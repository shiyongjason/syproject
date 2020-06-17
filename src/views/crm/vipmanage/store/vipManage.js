
import * as types from './vipTypes'
import * as Api from '../api'
const state = {
    vipManagedata: {},
    vipLevel: [],
    vipDetail: {},
    vipPagedetail: {},
    vipPageLoan: {}
}

const getters = {
    vipManagedata: state => state.vipManagedata,
    vipLevel: state => {
        let newLevl = [{ id: 0, vipRule: '无' }]
        return [...newLevl, ...state.vipLevel]
    },
    vipDetail: state => state.vipDetail,
    vipPagedetail: state => state.vipPagedetail,
    vipPageLoan: state => state.vipPageLoan
}

const mutations = {
    [types.VIP_MAN_DATA] (state, payload) {
        state.vipManagedata = payload
    },
    [types.VIP_LEVEL] (state, payload) {
        state.vipLevel = payload
    },
    [types.VIP_COM_DETAIL] (state, payload) {
        state.vipDetail = payload
    },
    [types.VIP_PAGE_DETAIL] (state, payload) {
        state.vipPagedetail = payload
    },
    [types.VIP_PAGE_LOAN] (state, payload) {
        state.vipPageLoan = payload
    }
}

const actions = {
    async findVipmanage ({ commit }, params) {
        const { data } = await Api.getVipmanage(params)
        commit(types.VIP_MAN_DATA, data)
    },
    async findViprules ({ commit }, params) {
        const { data } = await Api.getViprules(params)
        commit(types.VIP_LEVEL, data)
    },
    async findVippage ({ commit }, params) {
        const { data } = await Api.getVippage(params)
        commit(types.VIP_COM_DETAIL, data)
    },
    async findPagedetail ({ commit }, params) {
        const { data } = await Api.getVippagedetail(params)
        commit(types.VIP_PAGE_DETAIL, data)
    },
    async findVippageLoan ({ commit }, params) {
        const { data } = await Api.getVippageLoan(params)
        commit(types.VIP_PAGE_LOAN, data)
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

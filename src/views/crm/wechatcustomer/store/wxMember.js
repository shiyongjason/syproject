
import * as types from './wxType'
import * as Api from '../api'
const state = {
    wxMemberpage: {},
    wxMemberloan: {},
    wxDepartstatic: {},
    wxUserstatic: {},
    wxMemberUser: {},
    wxCustomerstaic: {}
}

const getters = {
    wxMemberpage: state => state.wxMemberpage,
    wxMemberloan: state => state.wxMemberloan,
    wxDepartstatic: state => state.wxDepartstatic,
    wxUserstatic: state => state.wxUserstatic,
    wxMemberUser: state => state.wxMemberUser,
    wxCustomerstaic: state => state.wxCustomerstaic

}

const mutations = {
    [types.WX_MEMBER_PAGE] (state, payload) {
        state.wxMemberpage = payload
    },
    [types.WX_MEMBER_LOAN] (state, payload) {
        state.wxMemberloan = payload
    },
    [types.WX_DEPART_STATIC] (state, payload) {
        state.wxDepartstatic = payload
    },
    [types.WX_USER_STATIC] (state, payload) {
        state.wxUserstatic = payload
    },
    [types.WX_MEMEBER_USER] (state, payload) {
        state.wxMemberUser = payload
    },
    [types.WX_CUSTOMER_STATIC] (state, payload) {
        state.wxCustomerstaic = payload
    }
}

const actions = {
    async findwxMemberpage ({ commit }, params) {
        const { data } = await Api.getWxmemberPage(params)
        commit(types.WX_MEMBER_PAGE, data)
    },
    async findwxMemberloan ({ commit }, params) {
        const { data } = await Api.getWxmemberLoan(params)
        commit(types.WX_MEMBER_LOAN, data)
    },
    async findDepartstatic ({ commit }, params) {
        const { data } = await Api.getDepartstatic(params)
        commit(types.WX_DEPART_STATIC, data)
    },
    async findUserstatic ({ commit }, params) {
        const { data } = await Api.getUserstatic(params)
        commit(types.WX_USER_STATIC, data)
    },
    async findWxmemberUser ({ commit }, params) {
        const { data } = await Api.getMemberUser(params)
        commit(types.WX_MEMEBER_USER, data)
    },
    async findCustomerstatic ({ commit }, params) {
        const { data } = await Api.getCustomerStatic(params)
        commit(types.WX_CUSTOMER_STATIC, data)
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}


import * as types from './vipTypes'
import * as Api from '../api'
const state = {
    vipManagedata: {},
    vipLevel: []
}

const getters = {
    vipManagedata: state => state.vipManagedata,
    vipLevel: state => {
        let newLevl = [{ id: '', vipRule: '无' }]
        return [...newLevl, ...state.vipLevel]
    }

}

const mutations = {
    [types.VIP_MAN_DATA] (state, payload) {
        state.vipManagedata = payload
    },
    [types.VIP_LEVEL] (state, payload) {
        state.vipLevel = payload
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
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

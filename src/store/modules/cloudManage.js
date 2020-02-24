import * as types from '../mutation-types'
import { getMembersituation, getMemberDetail, getFamilyDetail } from '@/views/comfortcloud/api'
const state = {
    iotmemberData: {},
    iotmemberDetail: {},
    familyData: {}
}

const getters = {
    iotmemberData: state => state.iotmemberData,
    iotmemberDetail: state => state.iotmemberDetail,
    familyData: state => state.familyData
}

const mutations = {
    [types.MEMBERS_DATA] (state, payload) {
        state.iotmemberData = payload
    },
    [types.MEMBERS_DETAIL] (state, payload) {
        state.iotmemberDetail = payload
    },
    [types.FAMILY_DATA] (state, payload) {
        state.familyData = payload
    }
}

const actions = {
    async findMembersituation ({ commit }, params) {
        const { data } = await getMembersituation(params)
        commit(types.MEMBERS_DATA, data.data)
    },
    async findIotMemberDetail ({ commit }, params) {
        const { data } = await getMemberDetail(params)
        commit(types.MEMBERS_DETAIL, data.data)
    },
    async findFamilyDetail ({ commit }, params) {
        const { data } = await getFamilyDetail(params)
        commit(types.FAMILY_DATA, data.data)
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}

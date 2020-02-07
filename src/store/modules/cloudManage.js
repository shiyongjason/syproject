import * as types from '../mutation-types'
import axios from 'axios'
import { getMembersituation, getMemberDetail, getFamilyDetail } from '@/views/comfortcloud/api'
const state = {
    memberData: {},
    memberDetail: {},
    familyData: {}
}

const getters = {
    memberData: state => state.memberData,
    memberDetail: state => state.memberDetail,
    familyData: state => state.familyData
}

const mutations = {
    [types.MEMBERS_DATA] (state, payload) {
        state.memberData = payload
    },
    [types.MEMBERS_DETAIL] (state, payload) {
        state.memberDetail = payload
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
    async findMemberDetail ({ commit }, params) {
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

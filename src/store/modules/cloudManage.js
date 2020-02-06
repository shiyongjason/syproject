import * as types from '../mutation-types'
import axios from 'axios'
import { getMembersituation, getMemberDetail } from '@/views/comfortcloud/api'
const state = {
    memberData: {},
    memberDetail: {}
}

const getters = {
    memberData: state => state.memberData,
    memberDetail: state => state.memberDetail
}

const mutations = {
    [types.MEMBER_DATA] (state, payload) {
        state.memberData = payload
    },
    [types.MEMBER_DETAIL] (state, payload) {
        state.memberDetail = payload
    }
}

const actions = {
    async findMembersituation ({ commit }, params) {
        const { data } = await getMembersituation(params)
        commit(types.MEMBER_DATA, data.data)
    },
    async findMemberDetail ({ commit }, params) {
        const { data } = await getMemberDetail(params)
        console.log(data)
        commit(types.MEMBER_DETAIL, data.data)
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}

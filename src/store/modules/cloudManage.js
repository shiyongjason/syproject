import * as types from '../mutation-types'
import axios from 'axios'
import { getMembersituation } from '@/views/comfortcloud/api'
const state = {
    memberData: {}
}

const getters = {
    memberData: state => state.memberData
}

const mutations = {
    [types.MEMBER_DATA] (state, payload) {
        state.memberData = payload
    }
}

const actions = {
    async findMembersituation ({ commit }, params) {
        const { data } = await getMembersituation(params)
        console.log(data)
        commit(types.MEMBER_DATA, data.data)
    }

}
export default {
    state,
    getters,
    actions,
    mutations
}

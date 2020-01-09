import * as types from '../mutation-types'
import { getChiness } from '@/views/hmall/membership/api'
const state = {
    nestDdata: {}
}

const getters = {
    nestDdata: state => state.nestDdata
}

const mutations = {
    [types.NEST_DATA] (state, payload) {
        state.nestDdata = payload
    }
}

const actions = {
    async findNest ({ commit }, params) {
        const { data } = await getChiness(params)
        commit(types.NEST_DATA, data)
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}

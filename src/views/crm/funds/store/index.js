import * as Type from '@/views/crm/funds/store/fundsType'
import * as Api from '@/views/crm/funds/api'

const state = {
    fundsList: []
}
const getters = {
    fundsList: state => state.fundsList
}
const mutations = {
    [Type.FUNDS_LIST] (state, payload) {
        state.fundsList = payload
    }
}

const actions = {
    async findPurchaseList ({ commit }, params) {
        const { data } = await Api.getFundsList(params)
        commit(Type.FUNDS_LIST, data)
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

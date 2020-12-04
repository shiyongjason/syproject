import * as Type from './purchaseOrderType'
import * as Api from '../api'

const state = {
    purchaseOrderList: []
}
const getters = {
    purchaseOrderList: state => state.purchaseOrderList
}
const mutations = {
    [Type.PURCHASE_ORDER] (state, payload) {
        state.purchaseOrderList = payload
    }
}

const actions = {
    async findPurchaseList ({ commit }, params) {
        const { data } = await Api.getPurchaseList(params)
        commit(Type.PURCHASE_ORDER, data)
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

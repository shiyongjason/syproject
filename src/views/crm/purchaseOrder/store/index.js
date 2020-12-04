import * as Type from './purchaseOrderType'
import * as Api from '../api'

const state = {
    purchaseOrderList: [],
    purchaseOrderConfirm: {
        purchaseOrder: {},
        poInfo: {},
        contracts: {},
        poChanges: [],
        paymentOrders: {}
    }
}
const getters = {
    purchaseOrderList: state => state.purchaseOrderList,
    purchaseOrderConfirm: state => state.purchaseOrderConfirm
}
const mutations = {
    [Type.PURCHASE_ORDER] (state, payload) {
        state.purchaseOrderList = payload
    },
    [Type.PURCHASE_ORDER_CONFIRM] (state, payload) {
        state.purchaseOrderConfirm = payload
    }
}

const actions = {
    async findPurchaseList ({ commit }, params) {
        const { data } = await Api.getPurchaseList(params)
        commit(Type.PURCHASE_ORDER, data)
    },
    async findPurchaseOrderConfirmDetail ({ commit }, id) {
        const { data } = await Api.getStatusOkPurchaseOrder(id)
        commit(Type.PURCHASE_ORDER_CONFIRM, data)
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

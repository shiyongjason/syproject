import * as Type from './purchaseOrderType'
import * as Api from '../api'

const state = {
    purchaseOrderList: [],
    purchaseOrderDetail: {
        purchaseOrder: {},
        poInfo: {},
        contracts: [],
        poChanges: [],
        paymentOrders: {}
    }
}
const getters = {
    purchaseOrderList: state => state.purchaseOrderList,
    purchaseOrderDetail: state => state.purchaseOrderDetail
}
const mutations = {
    [Type.PURCHASE_ORDER] (state, payload) {
        state.purchaseOrderList = payload
    },
    [Type.PURCHASE_ORDER_DETAIL] (state, payload) {
        state.purchaseOrderDetail = payload
    }
}

const actions = {
    async findPurchaseList ({ commit }, params) {
        const { data } = await Api.getPurchaseList(params)
        commit(Type.PURCHASE_ORDER, data)
    },
    async findPurchaseOrderDetail ({ commit }, id) {
        const { data } = await Api.getPurchaseOrderDetail(id)
        commit(Type.PURCHASE_ORDER_DETAIL, data)
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

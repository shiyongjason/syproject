import * as Type from './purchaseOrderType'
import * as Api from '../api'

const state = {
    purchaseOrderData: {
        records: [],
        total: 0,
        size: 10,
        current: 1
    },
    purchaseOrderPagination: {},
    purchaseOrderDetail: {
        purchaseOrder: {},
        poInfo: {},
        contracts: [],
        poChanges: [],
        paymentOrders: {}
    }
}
const getters = {
    purchaseOrderList: state => state.purchaseOrderData.records,
    purchaseOrderPagination: state => {
        return {
            amount: state.purchaseOrderData.amount,
            total: state.purchaseOrderData.total,
            pageSize: state.purchaseOrderData.size,
            pageNumber: state.purchaseOrderData.current
        }
    },
    purchaseOrderDetail: state => state.purchaseOrderDetail
}
const mutations = {
    [Type.PURCHASE_ORDER] (state, payload) {
        state.purchaseOrderData = payload
    },
    [Type.PURCHASE_ORDER_DETAIL] (state, payload) {
        state.purchaseOrderDetail = payload
    },
    [Type.PURCHASE_ORDER_PAGINATION] (state, payload) {
        state.purchaseOrderPagination = payload
    }
}

const actions = {
    async findPurchaseList ({ commit }, params) {
        const { data } = await Api.getPurchaseList(params)
        const { data: amount } = await Api.getPurchaseTotal(params)
        data.amount = amount
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

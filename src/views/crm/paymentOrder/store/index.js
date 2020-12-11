import * as Api from '../api/index'
import * as Type from './const'
const state = {
    paymentOrderData: {
        records: [],
        amount: 0,
        total: 0,
        size: 10,
        current: 1
    }
}
const getters = {
    paymentOrderList: state => state.paymentOrderData.records,
    paymentOrderPagination: state => {
        return {
            amount: state.paymentOrderData.amount,
            total: state.paymentOrderData.total,
            pageSize: state.paymentOrderData.size,
            pageNumber: state.paymentOrderData.current
        }
    }
}
const mutations = {
    [Type.PAYMENT_ORDER_DATA] (state, payload) {
        state.paymentOrderData = payload
    }
}

const actions = {
    async getPaymentOrderList ({ commit }, params) {
        const { data } = await Api.getPaymentOrderList(params)
        const { data: amount } = await Api.getPaymentOrderTotal(params)
        data.amount = amount
        commit(Type.PAYMENT_ORDER_DATA, data)
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

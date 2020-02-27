import * as types from '../mutation-types'
import { getPaymentWhite } from '@/views/paymentCentral/api'
const state = {
    paymentWhite: {}
}

const getters = {
    paymentWhite: state => state.paymentWhite
}

const mutations = {
    [types.PAYMENT_WHITE] (state, payload) {
        state.paymentWhite = payload
    }
}

const actions = {
    async findPaymentwhite ({ commit }, params) {
        const { data } = await getPaymentWhite(params)
        console.log(data)
        commit(types.PAYMENT_WHITE, data)
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}

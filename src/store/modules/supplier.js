import * as types from '../mutation-types'
import { findSupplierlist, findBrand } from '@/views/hmall/suppliermanage/api'
const state = {
    supplierData: {},
    brandData: []
}

const getters = {
    supplierData: state => state.supplierData,
    brandData: state => state.brandData
}

const mutations = {
    [types.SUPPLIER_DATA] (state, payload) {
        state.supplierData = payload
    },
    [types.BRAND_DATA] (state, payload) {
        state.brandData = payload
    }
}

const actions = {
    async findSupplierlist ({ commit }, params) {
        const { data } = await findSupplierlist(params)
        commit(types.SUPPLIER_DATA, data)
    },
    async findBrand ({ commit }, params) {
        const { data } = await findBrand(params)
        commit(types.BRAND_DATA, data)
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}

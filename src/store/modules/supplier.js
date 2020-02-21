import * as types from '../mutation-types'
import { findSupplierlist, findBrand, findBranchlist } from '@/views/hmall/suppliermanage/api'
const state = {
    supplierData: {},
    brandData: [],
    supplierBranch: []
}

const getters = {
    supplierData: state => state.supplierData,
    brandData: state => {
        state.brandData && state.brandData.map(item => {
            item.value = item.brandName
            item.selectCode = item.id
        })
        return state.brandData
    },
    supplierBranch: state => state.supplierBranch
}

const mutations = {
    [types.SUPPLIER_DATA] (state, payload) {
        state.supplierData = payload
    },
    [types.BRAND_DATA] (state, payload) {
        state.brandData = payload
    },
    [types.SUPPLIER_BRACHLIST] (state, payload) {
        state.supplierBranch = payload
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
    },
    async getBranchlist ({ commit }, params) {
        const { data } = await findBranchlist(params)
        commit(types.SUPPLIER_BRACHLIST, data)
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}

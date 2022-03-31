import * as Type from '@/views/crm/supplierSearch/store/types'
import * as Api from '@/views/crm/supplierSearch/api'

const state = {
    supplierSearchData: []
}
const getters = {
    supplierList: state => state.supplierSearchData.records,
    supplierListPagination: state => {
        return {
            total: state.supplierSearchData.total,
            pageSize: state.supplierSearchData.size,
            amount: state.supplierSearchData.amount,
            pageNumber: state.supplierSearchData.current
        }
    }
}

const mutations = {
    [Type.SUPPLIER_SEARCH_LIST] (state, payload) {
        state.supplierSearchData = payload
    }
}
const actions = {
    async findPurchaseList ({ commit }, params) {
        console.log('params: ', params)
        const { data } = await Api.getSupplierSearchList(params)
        commit(Type.SUPPLIER_SEARCH_LIST, data)
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

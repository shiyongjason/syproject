import * as Type from '@/views/crm/supplierSearch/store/types'
import * as Api from '@/views/crm/supplierSearch/api'

const state = {
    supplierSearchList: []
}
const getters = {
    supplierList: state => state.fundsTableData.records,
    supplierListPagination: state => {
        return {
            total: state.fundsTableData.total,
            pageSize: state.fundsTableData.size,
            amount: state.fundsTableData.amount,
            pageNumber: state.fundsTableData.current
        }
    }
}

const mutations = {
    [Type.SUPPLIER_SEARCH_LIST] (state, payload) {
        state.supplierSearchList = payload
    }
}
const actions = {
    async findPurchaseList ({ commit }, params) {
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

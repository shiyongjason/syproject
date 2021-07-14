import * as Type from '@/views/crm/funds/store/fundsType'
import * as Api from '@/views/crm/funds/api'

const state = {
    fundsTableData: {
        records: [],
        amount: 0,
        total: 0,
        size: 10,
        current: 1
    }
}
const getters = {
    fundsList: state => state.fundsTableData.records,
    fundsListPagination: state => {
        return {
            total: state.fundsTableData.total,
            pageSize: state.fundsTableData.size,
            amount: state.fundsTableData.amount,
            pageNumber: state.fundsTableData.current
        }
    }
}
const mutations = {
    [Type.FUNDS_TABLE_DATA] (state, payload) {
        state.fundsTableData = payload
    }
}

const actions = {
    async findPurchaseList ({ commit }, params) {
        const { data } = await Api.getFundsList(params)
        const { data: amountData } = await Api.getFundsListTotal(params)
        data.amount = amountData
        commit(Type.FUNDS_TABLE_DATA, data)
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

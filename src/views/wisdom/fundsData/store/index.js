
// 资金台账 store
import * as types from './const'
import { findPlatformslist } from '@/views/wisdom/fundsData/api'
const state = {
    platformData: []
}

const getters = {
    // 查询平台公司
    platformData: state => {
        for (let i of state.platformData) {
            i.value = i.companyShortName
            i.selectCode = i.companyCode
        }
        return state.platformData
    }
}

const mutations = {
    [types.PLAT_FORMDATA] (state, payload) {
        state.platformData = payload
    }
}

const actions = {
    async findPlatformslist ({ commit }, params) {
        const { data } = await findPlatformslist()
        commit(types.PLAT_FORMDATA, data.data.pageContent)
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}
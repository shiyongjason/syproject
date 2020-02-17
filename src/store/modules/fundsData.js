import * as types from '../fundsData-type'
import axios from 'axios'
import { findPlatformslist } from '@/views/fundsData/api'
const state = {
    platformData: {}
}

const getters = {
    platformData: state => {
        for (let i of state.platformData) {
            i.value = i.companyName
            i.selectCode = i.companyCode
        }
        return state.platformData
    }
}

const mutations = {
    [types.PLAT_FORMDATA] (state, payload) {
        const productArr = state.eventProducts
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
import * as types from '../mutation-types'
import instance from '@/api/axios_new'
import axios from 'axios'
const state = {
    skuData: {}
}

const getters = {
    eventProducts: state => state.eventProducts,
    eventInfos: state => state.eventInfos
}

const mutations = {
    [types.ADD_EVENT_PRODUCTS] (state, payload) {
        const productArr = state.eventProducts
        payload && payload.map(item => {
            productArr.push(item)
        })
        // 去重
        // const newproductArr = productArr.filter(item => item.id)
        // console.log(newproductArr)
        state.eventProducts = productArr
        sessionStorage.setItem('eventProducts', JSON.stringify(state.eventProducts))
        // state.eventProducts = payload
    }
}

const actions = {
    async findListSku ({ commit }, params) {
        const { data } = await instance.get('/product/api/sku', { params })
        commit(types.SKU_DATA, data)
    },
}
export default {
    state,
    getters,
    actions,
    mutations
}
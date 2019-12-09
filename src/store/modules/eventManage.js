import * as types from '../mutation-types'
import instance from '@/api/axios_new'
import axios from 'axios'
const state = {
    eventProducts: JSON.parse(sessionStorage.getItem('eventProducts')) || [],
    skuData: {},
    spikeData: {},
    eventTrackData: {},
    eventInfos: {},
    listTrack: {}
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
    },
    [types.REMOVE_EVENT_PRODUCTS] (state, payload) {
        const productArr = JSON.parse(sessionStorage.getItem('eventProducts')) || []
        state.eventProducts = productArr && productArr.filter(item => item.skuCode != payload.skuCode)
        sessionStorage.setItem('eventProducts', JSON.stringify(state.eventProducts))
    },
    [types.EMPTY_EVENT_PRODUCTS] (state, payload) {
        state.eventProducts = []
        sessionStorage.removeItem('eventProducts')
    },
    [types.SKU_DATA] (state, payload) {
        state.skuData = payload
    },
    [types.SPIKE_DATA] (state, payload) {
        state.spikeData = payload
    },
    [types.SET_EVENT_INFO] (state, payload) {
        state.eventInfos = payload
    },
    [types.EVENT_DATA] (state, payload) {
        state.eventTrackData = payload
    },
    [types.LIST_TRACK] (state, payload) {
        state.listTrack = payload
    }
}

const actions = {
    async findListSku ({ commit }, params) {
        const { data } = await instance.get('/product/api/sku', { params })
        commit(types.SKU_DATA, data)
    },
    /** 活动详情 */
    async eventInfo ({ commit }, id) {
        const { data } = await instance.get(`/ops/api/spike/base-info/${id}`, {})
        let len = data.spikeSku.length - state.eventProducts.length
        console.log(len)
        if (len < 0) {
            const arr = state.eventProducts.splice(len)
            data.spikeSku = state.eventProducts.concat(arr)
            commit(types.SET_EVENT_INFO, data)
        } else {
            console.log(state.eventProducts)
            if (state.eventProducts && state.eventProducts.length > 0) {
                // 改变刷单数和库存数
                state.eventProducts.map(item => {
                    data.spikeSku.map(jtem => {
                        if (item.productId == jtem.productId) {
                            item.inventoryNum = jtem.inventoryNum
                            item.inventoryRemainNum = jtem.inventoryRemainNum
                            item.clickFarmingNum = jtem.clickFarmingNum
                        }
                    })
                })
                data.spikeSku = state.eventProducts// 拖动会改变顺序
                commit(types.SET_EVENT_INFO, data)
            } else { // state.eventProducts=[]
                // 初始化设置session
                commit(types.SET_EVENT_INFO, data)
            }
        }
    },
    async findSpike ({ commit }, params) {
        const { data } = await instance.get('/ops/api/spike', { params })
        commit(types.SPIKE_DATA, data)
    },
    async findEventTrack ({ commit }, params) {
        const { data } = await axios.get('ets/api/b2b/activity/grid', { params })
        commit(types.EVENT_DATA, data)
    },
    async hoverTrack ({ commit }, params) {
        const { data } = await axios.get('ets/api/b2b/activity/hover', { params })
        commit(types.LIST_TRACK, data)
    },
    /** 复制活动 */
    async copy ({ commit }, id) {
        const { data } = await instance.get(`/ops/api/spike/copy/${id}`, {})
        let len = data.spikeSku.length - state.eventProducts.length
        console.log(len)
        if (len < 0) {
            const arr = state.eventProducts.splice(len)
            data.spikeSku = state.eventProducts.concat(arr)
            commit(types.SET_EVENT_INFO, data)
        } else {
            console.log(state.eventProducts)
            if (state.eventProducts && state.eventProducts.length > 0) {
                // 改变刷单数和库存数
                state.eventProducts.map(item => {
                    data.spikeSku.map(jtem => {
                        if (item.productId == jtem.productId) {
                            item.inventoryNum = jtem.inventoryNum
                            item.inventoryRemainNum = jtem.inventoryRemainNum
                            item.clickFarmingNum = jtem.clickFarmingNum
                        }
                    })
                })
                data.spikeSku = state.eventProducts// 拖动会改变顺序
                commit(types.SET_EVENT_INFO, data)
            } else { // state.eventProducts=[]
                // 初始化设置session
                commit(types.SET_EVENT_INFO, data)
            }
        }
    }

}
export default {
    state,
    getters,
    actions,
    mutations
}

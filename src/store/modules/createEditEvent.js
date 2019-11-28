import * as types from '../mutation-types'

const state = {
    xxx: ''
}

const getters = {
    xxx: state => state.xxx
}

const actions = {

}

const mutations = {
    [types.DEMO] (state, data) {
        state.xxx = data
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}

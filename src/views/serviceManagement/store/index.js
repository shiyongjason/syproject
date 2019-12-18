import mutations from './mutations'
import actions from './actions'
import state from './state'
import getters from './getters'
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

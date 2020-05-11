import mutations from './mutations'
import actions from './actions'
import state from './state'
import finance from '@/views/hmall/finance/store/index'
import brand from '@/views/hmall/brand/store/index'
export default {
    state,
    mutations,
    actions,
    modules: {
        finance,
        brand
    }
}

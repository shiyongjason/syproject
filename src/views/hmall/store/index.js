import mutations from './mutations'
import actions from './actions'
import state from './state'
import finance from '@/views/hmall/finance/store/index'
import brand from '@/views/hmall/brand/store/index'
import category from '@/views/hmall/category/store/index'
import spumanage from '@/views/hmall/spumanage/store/index'
import dataBoard from '@/views/hmall/dataBoard/store/index'
export default {
    state,
    mutations,
    actions,
    modules: {
        finance,
        brand,
        category,
        spumanage,
        dataBoard
    }
}

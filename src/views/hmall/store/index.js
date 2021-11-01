import mutations from './mutations'
import actions from './actions'

import finance from '@/views/hmall/finance/store/index'
import brand from '@/views/hmall/brand/store/index'
import category from '@/views/hmall/category/store/index'
import spumanage from '@/views/hmall/spumanage/store/index'
import dataBoard from '@/views/hmall/dataBoard/store/index'
import searchProject from '@/views/hmall/searchProject/store/index'

import marketManage from '@/views/hmall/marketManage/store/index'
import fundAudit from '@/views/hmall/fundAudit/store/index'
import productManage from '@/views/hmall/productManage/store/index'
import warehouseManage from '@/views/hmall/warehouseManage/store/index'
import membershipInterests from '@/views/hmall/membershipInterests/store/index'

const state = {
    userInfo: {},
    categoryList: []
}
const getters = {

}

export default {
    state,
    getters,
    mutations,
    actions,
    modules: {
        marketManage,
        productManage,
        warehouseManage,
        finance,
        brand,
        category,
        spumanage,
        dataBoard,
        searchProject,
        fundAudit,
        membershipInterests
    }
}

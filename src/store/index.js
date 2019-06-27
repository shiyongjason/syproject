import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

// import editData from '@/views/goodsManage/store/index'

Vue.use(Vuex)

const userInfo = sessionStorage.getItem('userInfo')
const store = new Vuex.Store({
    state: {
        'loading': false,
        'userInfo': userInfo ? JSON.parse(userInfo) : {},
        'isSaving': false,
        'tagsInfo': {}

    },
    mutations,
    actions: {},
    modules: {
        // 视图的 store
    }
})

export default store

import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import { findMenuList } from '../views/layout/api'
import hmall from '@/views/hmall/store/index.js'
import layout from '@/views/layout/store/index.js'

Vue.use(Vuex)

const userInfo = sessionStorage.getItem('userInfo')
const store = new Vuex.Store({
    state: {
        'loading': false,
        'userInfo': userInfo ? JSON.parse(userInfo) : {},
        'isSaving': false,
        'menuList': [],
        'isCollapse': false

    },
    mutations,
    actions: {
        resetVuex (context) {
            this.state.tagsInfo = []
        },
        async findMenuList ({ commit }) {
            const { data } = await findMenuList()
            commit('MENU_LIST', data)
        }
    },
    modules: {
        // 视图的 store
        hmall,
        layout
    }
})

export default store

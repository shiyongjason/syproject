import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import { findMenuList } from '../views/layout/api'
import dueDiligence from '@/views/bestonline/store/index'

Vue.use(Vuex)

const userInfo = sessionStorage.getItem('userInfo')
const userdata = sessionStorage.getItem('user_data')
const store = new Vuex.Store({
    state: {
        'loading': false,
        'userInfo': userInfo ? JSON.parse(userInfo) : {},
        'userdata': userdata ? JSON.parse(userdata) : {},
        'isSaving': false,
        'tagsInfo': [],
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
        dueDiligence
    }
})

export default store

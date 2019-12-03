import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import dueDiligence from '@/views/bestonline/store/index'
import hmall from '@/views/hmall/store/index.js'
import layout from '@/views/layout/store/index.js'
import eventManage from './modules/eventManage'

Vue.use(Vuex)

const userInfo = sessionStorage.getItem('userInfo')
// const userdata = sessionStorage.getItem('user_data')
const store = new Vuex.Store({
    state: {
        'loading': false,
        'userInfo': userInfo ? JSON.parse(userInfo) : {},
        'tagsList': sessionStorage.getItem('tagsList') ? JSON.parse(sessionStorage.getItem('tagsList')) : [],
        'isSaving': false,
        'isFirst': true,
        'menuList': [],
        'isCollapse': false,
        'cachedInclude': [],
        'cachedExclude': []
    },
    mutations,
    actions: actions,
    modules: {
        // 视图的 store
        dueDiligence,
        hmall,
        layout,
        eventManage
    }
})

export default store

import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import { findMenuList } from '../views/layout/api'

Vue.use(Vuex)
//
// function makeMenus (Route, Data) {
//     return Route.filter((value1) => {
//         let valueTemp = true
//         Data.forEach((value2) => {
//             // console.log(value2)
//             if (value2.authUri === value1.path) {
//                 if (value1.children) {
//                     value1.children = makeMenus(value1.children, value2.childAuthList)
//                 }
//                 value1.meta.have = value2.have
//                 valueTemp = value2.have
//             }
//         })
//         if (valueTemp) {
//             delete value1.component
//             return value1
//         }
//         return false
//     })
// }

const userInfo = sessionStorage.getItem('userInfo')
const store = new Vuex.Store({
    state: {
        'loading': false,
        'userInfo': userInfo ? JSON.parse(userInfo) : {},
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
            // sessionStorage.setItem('menuList', JSON.stringify(data))
            // console.log(routerMapping)
            // console.log(makeMenus(routerMapping, data))
            // const menu = makeMenus(routerMapping, data)
            commit('MENU_LIST', data)
        }
    },
    modules: {
        // 视图的 store
    }
})

export default store

import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import { findMenuList } from '../views/layout/api'
import { routerMapping } from '../router'

Vue.use(Vuex)

function makeMenus (Route, Data) {
    return Route.filter((value1) => {
        let valueTemp = false
        Data.forEach((value2) => {
            // console.log(value2)
            if (value2.authUri === value1.path) {
                if (value1.children) {
                    value1.children = makeMenus(value1.children, value2.childAuthList)
                }
                valueTemp = value2.have
            }
        })
        if (valueTemp) {
            delete value1.component
            return value1
        }
        return false
    })
}

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
            console.log(context, this.state)
            this.state.tagsInfo = []
        },
        async findMenuList ({ commit }) {
            const { data } = await findMenuList()
            sessionStorage.setItem('menuList', JSON.stringify(data))
            // console.log(routerMapping)
            // console.log(makeMenus(routerMapping, data))
            commit('MENU_LIST', makeMenus(routerMapping, data))
        }
    },
    modules: {
        // 视图的 store
    }
})

export default store

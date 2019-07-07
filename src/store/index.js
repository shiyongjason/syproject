import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import { findMenuList } from '../views/layout/api'
import { routerMapping } from '../router'

Vue.use(Vuex)

function makeMenus (arr, arr2) {
    return arr.filter((value1) => {
        let valueTemp = false
        arr2.forEach((value2) => {
            if (value2.authUri === value1.path) {
                value1.meta.id = value2.id
                value1.meta.auth = true
                if (value1.children) {
                    value1.children = makeMenus(value1.children, value2.childAuthList)
                }
                valueTemp = value1
            }
        })
        delete valueTemp.component
        return valueTemp
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
            // console.log(data)
            // let authMenuTemp = routerMapping.filter((value1) => {
            //     let valueTemp = false
            //     data.forEach((value2) => {
            //         if (value2.authUri === value1.path) {
            //             value1.meta.id = value2.id
            //             value1.meta.auth = true
            //             valueTemp = value1
            //         }
            //     })
            //     return valueTemp
            // })
            // sessionStorage.setItem('menuList', JSON.stringify(data))
            var a = makeMenus(routerMapping, data)
            console.log(a)
            commit('MENU_LIST', makeMenus(routerMapping, data))
        }
    },
    modules: {
        // 视图的 store
    }
})

export default store

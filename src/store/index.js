import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import { findMenuList } from '../views/layout/api'
import { routerMapping } from '../router'

Vue.use(Vuex)

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
            let authMenuTemp = routerMapping.filter((value1) => {
                let valueTemp = false
                data.forEach((value2) => {
                    if (value2.authUri === value1.path) {
                        value1.meta.id = value2.id
                        value1.meta.auth = true
                        valueTemp = value1
                    }
                })
                return valueTemp
            })
            // sessionStorage.setItem('menuList', JSON.stringify(data))
            console.log('-----',authMenuTemp)
            commit('MENU_LIST', authMenuTemp)
        }
    },
    modules: {
        // 视图的 store
    }
})

export default store

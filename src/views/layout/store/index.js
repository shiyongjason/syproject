import { TAG_LIST, MENU_LIST } from './const'
import { findMenusList } from '../api/index'

export default {
    state: {
        tag_list: []
    },
    actions: {
        async findMenusList ({ commit }) {
            const { data } = await findMenusList()
            commit('MENU_LIST', data)
        }
    },
    mutations: {
        [TAG_LIST] (state, v) {
            state.tag_list = v
        },
        [MENU_LIST] (state, v) {
            state.menuList = v
        }
    }
}

import { findMenuList, tracking } from '../views/layout/api'
import { findDepList } from '../views/wisdom/api/index'
export default {
    resetVuex (context) {
        this.state.tagsInfo = []
        this.state.isFirst = true
    },
    async findMenuList ({ commit }) {
        const { data } = await findMenuList()
        commit('MENU_LIST', data)
    },
    async setNewTags ({ commit, state }, context) {
        // TODO payload 获取 当前的 router path
        const newList = state.tagsList.filter((item, index) => item.path != context)
        commit('SET_NEW_TAGS', newList)
    },
    tracking ({ state }, params) {
        tracking({
            login_name: state.userInfo.user_name,
            user_name: state.userInfo.employeeName,
            jinyun_type: 2,
            ...params
        })
    },
    async getDevdeplist ({ commit }, params) {
        const { data } = await findDepList(params)
        commit('DEVDEP_LIST', data)
    }
}
import { findMenuList, tracking } from '../views/layout/api'
import { findDepList } from '../views/wisdom/api/index'
import { findDepartment, findPlatformslist } from './api/index'
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
    },
    async findAuthList ({ commit }, params) {
        const { data } = await findDepartment(params)
        for (let i of data) {
            i.value = i.deptName
            i.selectCode = i.deptName
        }
        commit('GET_AUTHLIST', { data, deptType: params.deptType })
        return data
    },
    async findPlatformslist ({ commit }, params) {
        if ((this.state.userInfo.deptType == 1 || this.state.userInfo.deptType == 2) && !params.subsectionCode) {
            commit('PLAT_FORMDATA', [])
            return
        }
        const { data } = await findPlatformslist(params)
        console.log(data)
        for (let i of data.data.pageContent) {
            i.value = i.companyShortName
            i.selectCode = i.companyCode
        }
        commit('PLAT_FORMDATA', data.data.pageContent)
    }
}
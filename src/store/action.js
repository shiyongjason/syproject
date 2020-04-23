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
            i.selectCode = i.pkDeptDoc
        }
        commit('GET_AUTHLIST', { data, deptType: params.deptType })
        return data
    },
    async findPlatformslist ({ commit }, params) {
        /**
         * @description 根据分部查询平台公司
         * @params 参数
         * @subsectionCode 分部code
         * @subregionCode 区域code新
         * @showAll 处理非总部账户显示所有分部
         */
        if (this.state.userInfo.deptType !== 0 && !params) {
            // 非总部账号不传分部区域无法查看数据
            commit('PLAT_FORMDATA', [])
            return []
        }
        if (this.state.userInfo.deptType !== 0 && (!params.subsectionCode && !params.subregionCode) && !params.showAll) {
            // 非总部账号不传分部区域无法查看数据
            commit('PLAT_FORMDATA', [])
            return []
        }
        const { data } = await findPlatformslist(params)
        for (let i of data.data.pageContent) {
            i.value = i.companyShortName
            i.selectCode = i.companyCode
        }
        commit('PLAT_FORMDATA', data.data.pageContent)
        return data.data.pageContent
    }
}
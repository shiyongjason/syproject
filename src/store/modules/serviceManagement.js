import * as Const from '../const'
import * as Request from '../../views/serviceManagement/api'

const getters = {
    doneServiceCategoryTree: state => {
        function makeTreeList (data) {
            let subTemp = []
            if (data.child && data.child.length) {
                data.child.forEach(value => {
                    subTemp.push(makeTreeList(value))
                })
            }

            return {
                label: data.name,
                parentName: data.parentName,
                parentId: data.parentId,
                id: data.id,
                updateBy: data.updateBy,
                updateTime: data.updateTime,
                depth: data.depth,
                path: data.path,
                children: subTemp
            }
        }
        return [makeTreeList(state.serviceCategoryTree)]
    },
    resetServiceCategoryTree: state => {
        function resetTreeList (data) {
            let subTemp = []
            function makeList (data) {
                if (data.child && data.child.length) {
                    data.child.forEach(value => {
                        makeList(value)
                    })
                }

                subTemp.push({
                    label: data.name,
                    parentName: data.parentName,
                    parentId: data.parentId,
                    id: data.id,
                    updateBy: data.updateBy,
                    updateTime: data.updateTime,
                    depth: data.depth
                })
            }
            makeList(data)
            return subTemp
        }
        return resetTreeList(state.serviceCategoryTree)
    }
}
const state = {
    serviceCategoryTree: []
}
const mutations = {
    [Const.FIND_SERVICE_RESOURCES_CATEGORY] (state, data) {
        state.serviceCategoryTree = data
    }
}
const actions = {
    async findServiceResourcesCategory ({ commit }) {
        const { data } = await Request.findServiceResourcesCategory()
        commit('FIND_SERVICE_RESOURCES_CATEGORY', data)
    }
}
export default {
    getters,
    state,
    mutations,
    actions
}

import * as Request from '../api/index'
export default {
    async findServiceResourcesCategory ({ commit }) {
        const { data } = await Request.findServiceResourcesCategory()
        commit('FIND_SERVICE_RESOURCES_CATEGORY', data)
    }
}

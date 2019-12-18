import * as Const from './const'

export default {
    [Const.FIND_SERVICE_RESOURCES_CATEGORY] (state, data) {
        state.serviceCategoryTree = data
    }
}

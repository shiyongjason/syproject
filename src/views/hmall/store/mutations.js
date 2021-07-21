import * as types from './mutation-types'

export default {
    [types.GET_USER_INFO_NAME_AND_CODE] (state, data) {
        state.userInfo = data
    },
    [types.CATEGORY_LIST] (state, data) {
        state.categoryList = data
    }
}

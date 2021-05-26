import * as types from './mutation-types'

export default {
    [types.CHANGE_REVIEW_LIST_PAGE_NUMBER] (state, pageNumber) {
        state.reviewListPageNumber = pageNumber
    },
    [types.CHANGE_MANAGE_PAGE_NUMBER] (state, pageNumber) {
        state.managePageNumber = pageNumber
    },
    [types.GET_USER_INFO_NAME_AND_CODE] (state, data) {
        state.userInfo = data
    },
    [types.CATEGORY_LIST] (state, data) {
        state.categoryList = data
    }
}

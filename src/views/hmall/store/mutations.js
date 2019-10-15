import { CHANGE_MANAGE_PAGE_NUMBER, CHANGE_REVIEW_LIST_PAGE_NUMBER, GET_USER_INFO_NAME_AND_CODE, CATEGORY_LIST } from './const'

export default {
    [CHANGE_REVIEW_LIST_PAGE_NUMBER] (state, pageNumber) {
        state.reviewListPageNumber = pageNumber
    },
    [CHANGE_MANAGE_PAGE_NUMBER] (state, pageNumber) {
        state.managePageNumber = pageNumber
    },
    [GET_USER_INFO_NAME_AND_CODE] (state, data) {
        state.userInfo = data
    },
    [CATEGORY_LIST] (state, data) {
        state.categoryList = data
    }
}

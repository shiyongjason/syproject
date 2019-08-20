import {
    CHANGE_REVIEW_LIST_PAGE_NUMBER,
    CHANGE_MANAGE_PAGE_NUMBER,
    GET_USER_INFO_NAME_AND_CODE
} from './const.js'
import actions from './actions'
export default {
    state: {
        reviewListPageNumber: 1,
        managePageNumber: 1,
        userInfo: {}
    },
    mutations: {
        [CHANGE_REVIEW_LIST_PAGE_NUMBER] (state, pageNumber) {
            state.reviewListPageNumber = pageNumber
        },
        [CHANGE_MANAGE_PAGE_NUMBER] (state, pageNumber) {
            state.managePageNumber = pageNumber
        },
        [GET_USER_INFO_NAME_AND_CODE] (state, data) {
            state.userInfo = data
        }
    },
    actions
}

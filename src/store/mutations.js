import {
    LOAD_STATE, IS_SAVING, USER_INFO, TAGS_INFO, IS_COLLAPSE, MENU_LIST, IS_FIRST
} from './const'

export default {
    [LOAD_STATE] (state, payload) {
        state.loading = payload
    },
    [IS_SAVING] (state, payload) {
        state.isSaving = payload
    },
    [USER_INFO] (state, payload) {
        state.userInfo = payload
    },
    [TAGS_INFO] (state, payload) {
        state.tagsInfo = payload
    },
    [IS_COLLAPSE] (state, payload) {
        state.isCollapse = payload
    },
    [MENU_LIST] (state, v) {
        state.menuList = v
    },
    [IS_FIRST] (state, payload) {
        state.isFirst = payload
    }
}

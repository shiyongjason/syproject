import {
    LOAD_STATE, IS_SAVING, USER_INFO, TAGS_INFO, SET_NEW_TAGS, IS_COLLAPSE, MENU_LIST, IS_FIRST, ADD_CACHED_INCLUDE,
    REMOVE_CACHED_INCLUDE, ADD_CACHED_EXCLUDE, REMOVE_CACHED_EXCLUDE, DEVDEP_LIST
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
    [SET_NEW_TAGS] (state, payload) {
        state.tagsList = payload
        sessionStorage.setItem('tagsList', JSON.stringify(payload))
    },
    [IS_COLLAPSE] (state, payload) {
        state.isCollapse = payload
    },
    [MENU_LIST] (state, v) {
        state.menuList = v
    },
    [IS_FIRST] (state, payload) {
        state.isFirst = payload
    },
    [ADD_CACHED_INCLUDE] (state, payload) {
        state.cachedInclude.push(payload)
    },
    [REMOVE_CACHED_INCLUDE] (state, payload) {
        state.cachedInclude = state.cachedInclude.filter(item => item !== payload)
    },
    [ADD_CACHED_EXCLUDE] (state, payload) {
        state.cachedExclude.push(payload)
    },
    [REMOVE_CACHED_EXCLUDE] (state, payload) {
        state.cachedExclude = state.cachedExclude.filter(item => item !== payload)
    },
    [DEVDEP_LIST] (state, payload) {
        state.devDepList = payload
    }
}

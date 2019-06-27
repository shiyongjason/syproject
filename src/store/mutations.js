import {
    LOAD_STATE, IS_SAVING, USER_INFO, TAGS_INFO
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
    }

}

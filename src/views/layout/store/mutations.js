import { TAG_UPDATE, IS_RELOAD } from './const'
export default {
    [TAG_UPDATE] (state, tagsList) {
        state.tagsList = tagsList
        sessionStorage.setItem('tagsList', JSON.stringify(tagsList))
    },
    [IS_RELOAD] (state, reload) {
        state.isReload = reload
    }
}

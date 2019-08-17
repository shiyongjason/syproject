import {
    CHANGE_PAGENUMBER
} from './const.js'
export default {
    state: {
        pageNumber: 1 // 页数
    },
    mutations: {
        [CHANGE_PAGENUMBER] (state, pageNumber) {
            state.pageNumber = pageNumber
        }
    }
}

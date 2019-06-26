import TAG_LIST from './const'

export default {
    state: {
        tag_list: []
    },
    mutations: {
        [TAG_LIST] (state, v) {
            state.tag_list = v
        }
    }
}

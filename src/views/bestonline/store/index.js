import {
    GET_COMPANY_NAME,
    GET_APPLY_COMPANY_NAME
} from './const.js'
export default {
    state: {
        companyName: '', // 现场尽调公司名
        applyCompanyName: '申请' // 尽调申请公司名
    },
    mutations: {
        [GET_COMPANY_NAME] (state, val) {
            localStorage.setItem('companyName', val)
            state.companyName = val
        },
        [GET_APPLY_COMPANY_NAME] (state, val) {
            localStorage.setItem('applyCompanyName', val)
            state.applyCompanyName = val
        }
    }
}

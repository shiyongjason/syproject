import {
    GET_COMPANY_NAME,
    GET_APPLY_COMPANY_NAME,
    JUSTICE_DATA
} from './const.js'
import axios from 'axios'

export default {
    state: {
        companyName: '', // 现场尽调公司名
        applyCompanyName: '申请', // 尽调申请公司名
        justiceData: {
            investmentsOutList: [],
            assetList: [],
            debtList: [],
            assureList: [],
            punishmentList: [],
            branchAgencyList: [],
            relatedCompanyList: [],
            copartnerInfoList: []
        }
    },
    mutations: {
        [GET_COMPANY_NAME] (state, val) {
            localStorage.setItem('companyName', val)
            state.companyName = val
        },
        [GET_APPLY_COMPANY_NAME] (state, val) {
            localStorage.setItem('applyCompanyName', val)
            state.applyCompanyName = val
        },
        [JUSTICE_DATA] (state, payload) {
            state.justiceData = payload.data
        }
    },
    actions: {
        async findJusticeData ({ commit }, params) {
            const { data } = await axios.get(`develop/duelegal/${params.applyId}`)
            commit(JUSTICE_DATA, data)
        }
    }
}

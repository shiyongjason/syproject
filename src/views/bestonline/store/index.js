import {
    GET_COMPANY_NAME,
    GET_APPLY_COMPANY_NAME,
    COTARGET_DATA,
    JUSTICE_DATA,
    BUSINESS_DATA,
    FINANCE_DATA,
    ORGANIZATION_DATA
} from './const.js'
import axios from 'axios'

export default {
    state: {
        companyName: '', // 现场尽调公司名
        applyCompanyName: '申请', // 尽调申请公司名
        cotargetData: {
            scale: '',
            yearRateTabelContents: [],
            equityRatio: ''
        },
        justiceData: {
            affairs: {},
            investmentsOutList: [],
            assetList: [],
            debtList: [],
            assureList: [],
            punishmentList: [],
            branchAgencyList: [],
            relatedCompanyList: [],
            copartnerInfoList: [],
            dueLegalRemarkCreateForm: {}
        },
        businessData: {
            dueBusinessAssessmentCreateFormList: [], // 商业尽调评估
            dueBusinessSaleCreateFormList: [], // 12月份
            dueBusinessSupplierCreateFormList: [], // 商业尽调供应商
            dueBusinessCustomerCreateFormList: [], // 商业尽调客户结构
            dueBusinessCompetitorCreateFormList: [], // 商业尽调竞争对手
            dueBusinessProxySwitchSchemeCreateFormList: [],
            dueBusinessCustomerDemandCreateForm: {},
            dueBusinessFuturePlanCreateForm: {
                businessCategory: [],
                serviceCategory: []
            }
        },
        organizationData: {
            actualControllerSocialId: null,
            actualCompanyControllerId: null,
            organizationalStabilityId: null
        },
        financeData: {
            assessmentList: [], // 财务尽调评估
            dueFinanceYearOperatingCreateForms: [
                {},
                {},
                {}
            ],
            dueFinanceBasic: {},
            caseFlow: {},
            dueFinanceProfit: {},
            assetsLiabilities: {}
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
        [COTARGET_DATA] (state, payload) {
            state.cotargetData = payload.data
        },
        [BUSINESS_DATA] (state, payload) {
            state.businessData = payload.data
        },
        [FINANCE_DATA] (state, payload) {
            state.financeData = payload.data
        },
        [JUSTICE_DATA] (state, payload) {
            state.justiceData = payload.data
        },
        [ORGANIZATION_DATA] (state, payload) {
            state.organizationData = payload.data
        }
    },
    actions: {
        async findCotargetData ({ commit }, params) {
            const { data } = await axios.get(`develop/cooperativetarget/${params.applyId}`)
            commit(COTARGET_DATA, data)
        },
        async findBusinessData ({ commit }, params) {
            const { data } = await axios.get(`develop/business/${params.applyId}`)
            commit(BUSINESS_DATA, data)
        },
        async findFinanceData ({ commit }, params) {
            const { data } = await axios.get(`develop/duefinance/${params.applyId}`)
            commit(FINANCE_DATA, data)
        },
        async findJusticeData ({ commit }, params) {
            const { data } = await axios.get(`develop/duelegal/${params.applyId}`)
            commit(JUSTICE_DATA, data)
        },
        async findOrganizationData ({ commit }, params) {
            const { data } = await axios.get(`develop/organization/${params.applyId}`)
            commit(ORGANIZATION_DATA, data)
        }
    }
}

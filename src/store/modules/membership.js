import * as types from '../mutation-types'
import {
    getChiness, getBossMerchant, getBossMerchantDetail, getBossMerchantStatic, findBrandsList, getBossMember,
    getBossMemberStatic, getBossMemberDetail, getMerchantList, getAccountList, getAccountDetail
} from '@/views/hmall/membership/api'
const state = {
    nestDdata: {},
    merchantData: [],
    merchantDetail: {},
    merchantStatic: {},
    branchList: [],
    memberData: [],
    memberDetail: {},
    memberStatic: {},
    merchantList: [],
    accountData: {},
    accountDetail: {}
}

const getters = {
    nestDdata: state => state.nestDdata,
    merchantData: state => state.merchantData,
    merchantDetail: state => state.merchantDetail,
    merchantStatic: state => state.merchantStatic,
    branchList: state => state.branchList,
    memberData: state => state.memberData,
    memberDetail: state => state.memberDetail,
    memberStatic: state => state.memberStatic,
    merchantList: state => {
        // TODO 模糊搜索组件
        state.merchantList && state.merchantList.map(item => {
            item.value = item.companyName
            item.selectCode = item.companyCode
        })
        return state.merchantList
    },
    accountData: state => state.accountData,
    accountDetail: state => state.accountDetail
}

const mutations = {
    [types.NEST_DATA] (state, payload) {
        state.nestDdata = payload
    },
    [types.MERCHT_DATA] (state, payload) {
        state.merchantData = payload
    },
    [types.MERCHT_DETAIL] (state, payload) {
        state.merchantDetail = payload
    },
    [types.MERCHT_STATIC] (state, payload) {
        state.merchantStatic = payload
    },
    [types.BRANCH_LIST] (state, payload) {
        state.branchList = payload
    },
    [types.MEMBER_DATA] (state, payload) {
        state.memberData = payload
    },
    [types.MEMBER_DETAIL] (state, payload) {
        state.memberDetail = payload
    },
    [types.MEMBER_STATIC] (state, payload) {
        state.memberStatic = payload
    },
    [types.MERCHT_LIST] (state, payload) {
        state.merchantList = payload
    },
    [types.ACCOUNT_DATA] (state, payload) {
        state.accountData = payload
    },
    [types.ACCOUNT_DETAIL] (state, payload) {
        state.accountDetail = payload
    }
}

const actions = {
    async findNest ({ commit }, params) {
        const { data } = await getChiness(params)
        commit(types.NEST_DATA, data)
    },
    async findMerchantList ({ commit }, params) {
        const { data } = await getBossMerchant(params)
        commit(types.MERCHT_DATA, data)
    },
    async findMerchantDetail ({ commit }, params) {
        const { data } = await getBossMerchantDetail(params)
        commit(types.MERCHT_DETAIL, data)
    },
    async findMerchantStatic ({ commit }, params) {
        const { data } = await getBossMerchantStatic(params)
        commit(types.MERCHT_STATIC, data)
    },
    async findBranch ({ commit }, params) {
        const { data } = await findBrandsList(params)
        commit(types.BRANCH_LIST, data)
    },
    async findMemberList ({ commit }, params) {
        const { data } = await getBossMember(params)
        commit(types.MEMBER_DATA, data)
    },
    async findMemberDetail ({ commit }, params) {
        const { data } = await getBossMemberDetail(params)
        commit(types.MEMBER_DETAIL, data)
    },
    async findMemberStatic ({ commit }, params) {
        const { data } = await getBossMemberStatic(params)
        commit(types.MEMBER_STATIC, data)
    },
    async findMerchant ({ commit }, params) {
        const { data } = await getMerchantList(params)
        commit(types.MERCHT_LIST, data)
    },
    async findAccountList ({ commit }, params) {
        const { data } = await getAccountList(params)
        commit(types.ACCOUNT_DATA, data)
    },
    async findAccountDetail ({ commit }, params) {
        const { data } = await getAccountDetail(params)
        commit(types.ACCOUNT_DETAIL, data)
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}

import * as types from '../../../store/mutation-types'
import * as cloud from './cloudTypes'
// import { getMembersituation, getMemberDetail, getFamilyDetail, getActdetail, getCloudActlist } from '@/views/comfortcloud/api'
import * as Api from '@/views/comfortcloud/api'

const state = {
    iotmemberData: {},
    iotmemberDetail: {},
    familyData: {},
    cloudActivitydetail: {},
    cloudActicitylist: {},
    cloudAlarmList: [],
    cloudAlarmPagination: {},
    cloudEquipmentErrorList: [],
    cloudEquipmentErrorPagination: {},
    cloudDict: [],
    cloudSmartPlayList: [],
    cloudSmartPlayPagination: {},
    cloudSendMessageList: [],
    cloudSendMessagePagination: {},
    cloudSendMessagePostDetail: {},
    cloudSmartPlayPostDetail: {},
    cloudHistoryReport: {},
    cloudRuntimeReport: {},
    cloudDeviceCount: {},
    cloudDeviceDetailList: [],
    cloudDeviceDetailPagination: {},
    cloudHomeDetailList: [],
    cloudHomeDetailPagination: {},
    cloudHomeDetailDict: [],
    comfortableSceneList: [],
    comfortableSceneListPagination: {},
    getCloudHomeComfortStatisticsList: [],
    cloudAlarmChart: {},
    cloudSendMessageDetailChart: {},
    cloudUserFeedbackList: [],
    cloudUserFeedbackPagination: {},
    cloudComfortEncyclopediaList: [],
    cloudComfortEncyclopediaListPagination: {},
    cloudComfortEncyclopediaDetail: {},
    klCatalogueList: [],
    klQuestionList: [],
    klQuestionDetail: {},
    outBoundList: [],
    outBoundListPagination: {},
    splashScreenList: [],
    splashScreenPagination: {},
    allActivity: [],
    customerServiceList: [],
    customerServicePagination: {},
    cloudHomeModeTypeList: [],
    serviceManageHistoryList: [],
    cloudMerchantList: [],
    cloudMerchantListPagination: {},
    cloudMerchantAdList: [],
    cloudMerchantAdListPagination: {},
    cloudMerchantAdDetail: {},
    cloudMerchantOrderList: [],
    cloudMerchantOrderListPagination: {}
}

const getters = {
    iotmemberData: state => state.iotmemberData,
    iotmemberDetail: state => state.iotmemberDetail,
    familyData: state => state.familyData,
    cloudActivitydetail: state => state.cloudActivitydetail,
    cloudActicitylist: state => state.cloudActicitylist,
    cloudAlarmList: state => state.cloudAlarmList,
    cloudAlarmPagination: state => state.cloudAlarmPagination,
    cloudEquipmentErrorList: state => state.cloudEquipmentErrorList,
    cloudEquipmentErrorPagination: state => state.cloudEquipmentErrorPagination,
    cloudDict: state => state.cloudDict,
    cloudSmartPlayList: state => state.cloudSmartPlayList,
    cloudSmartPlayPagination: state => state.cloudSmartPlayPagination,
    cloudSmartPlayPostDetail: state => state.cloudSmartPlayPostDetail,
    cloudSendMessageList: state => state.cloudSendMessageList,
    cloudSendMessagePagination: state => state.cloudSendMessagePagination,
    cloudSendMessagePostDetail: state => state.cloudSendMessagePostDetail,
    cloudHistoryReport: state => state.cloudHistoryReport,
    cloudRuntimeReport: state => state.cloudRuntimeReport,
    cloudDeviceCount: state => state.cloudDeviceCount,
    cloudDeviceDetailList: state => state.cloudDeviceDetailList,
    cloudDeviceDetailPagination: state => state.cloudDeviceDetailPagination,
    cloudHomeDetailList: state => state.cloudHomeDetailList,
    cloudHomeDetailPagination: state => state.cloudHomeDetailPagination,
    cloudHomeOpDetailList: state => state.cloudHomeOpDetailList,
    cloudHomeOpDetailPagination: state => state.cloudHomeOpDetailPagination,
    cloudHomeCoDetailList: state => state.cloudHomeCoDetailList,
    cloudHomeCoDetailPagination: state => state.cloudHomeCoDetailPagination,
    cloudHomeApDetailList: state => state.cloudHomeApDetailList,
    cloudHomeApDetailPagination: state => state.cloudHomeApDetailPagination,
    cloudHomeRtDetailList: state => state.cloudHomeRtDetailList,
    cloudHomeRtDetailPagination: state => state.cloudHomeRtDetailPagination,
    cloudHomeDetailDict: state => state.cloudHomeDetailDict,
    cloudAlarmChart: state => state.cloudAlarmChart,
    cloudSendMessageDetailChart: state => state.cloudSendMessageDetailChart,
    cloudUserFeedbackList: state => state.cloudUserFeedbackList,
    cloudUserFeedbackPagination: state => state.cloudUserFeedbackPagination,
    klCatalogueList: state => state.klCatalogueList,
    klQuestionList: state => state.klQuestionList,
    klQuestionDetail: state => state.klQuestionDetail,
    splashScreenList: state => {
        state.splashScreenList.forEach(v => {
            v.status = !!v.status
            v.statusName = v.activityId ? '已关联' : '未关联'
        })
        return state.splashScreenList
    },
    allActivity: state => state.allActivity.map(v => {
        const value = v.title.length < 15 ? v.title : v.title.substr(0, 14) + '...'
        return { selectCode: v.id, value }
    }),
    cloudHomeModeTypeList: state => state.cloudHomeModeTypeList,
    serviceManageHistoryList: state => state.serviceManageHistoryList,
    cloudMerchantList: state => state.cloudMerchantList,
    cloudMerchantListPagination: state => state.cloudMerchantListPagination,
    cloudMerchantAdList: state => state.cloudMerchantAdList,
    cloudMerchantAdListPagination: state => state.cloudMerchantAdListPagination,
    cloudMerchantAdDetail: state => state.cloudMerchantAdDetail,
    cloudMerchantOrderList: state => state.cloudMerchantOrderList,
    cloudMerchantOrderListPagination: state => state.cloudMerchantOrderListPagination
}

const mutations = {
    [types.MEMBERS_DATA] (state, payload) {
        state.iotmemberData = payload
    },
    [types.MEMBERS_DETAIL] (state, payload) {
        state.iotmemberDetail = payload
    },
    [types.FAMILY_DATA] (state, payload) {
        state.familyData = payload
    },
    [cloud.CLOUD_ACTDETAIL] (state, payload) {
        state.cloudActivitydetail = payload
    },
    [cloud.CLOUD_ACTLIST] (state, payload) {
        state.cloudActicitylist = payload
    },
    [cloud.CLOUD_ALARM_LIST] (state, payload) {
        state.cloudAlarmList = payload
    },
    [cloud.CLOUD_ALARM_PAGINATION] (state, payload) {
        state.cloudAlarmPagination = payload
    },
    [cloud.CLOUD_EQUIPMENT_ERROR_LIST] (state, payload) {
        state.cloudEquipmentErrorList = payload
    },
    [cloud.CLOUD_EQUIPMENT_ERROR_PAGINATION] (state, payload) {
        state.cloudEquipmentErrorPagination = payload
    },
    [cloud.CLOUD_DICT] (state, payload) {
        state.cloudDict = payload
    },
    [cloud.CLOUD_SMART_PLAY_LIST] (state, payload) {
        state.cloudSmartPlayList = payload
    },
    [cloud.CLOUD_SMART_PLAY_PAGINATION] (state, payload) {
        state.cloudSmartPlayPagination = payload
    },
    [cloud.CLOUD_SMART_PLAY_POST_DETAIL] (state, payload) {
        state.cloudSmartPlayPostDetail = payload
    },
    [cloud.CLOUD_SEND_MESSAGE_LIST] (state, payload) {
        state.cloudSendMessageList = payload
    },
    [cloud.CLOUD_SEND_MESSAGE_PAGINATION] (state, payload) {
        state.cloudSendMessagePagination = payload
    },
    [cloud.CLOUD_SEND_MESSAGE_POST_DETAIL] (state, payload) {
        state.cloudSendMessagePostDetail = payload
    },
    [cloud.CLOUD_HISTORY_REPORT] (state, payload) {
        state.cloudHistoryReport = payload
    },
    [cloud.CLOUD_RUNTIME_REPORT] (state, payload) {
        state.cloudRuntimeReport = payload
    },
    [cloud.CLOUD_DEVICE_COUNT] (state, payload) {
        state.cloudDeviceCount = payload
    },
    [cloud.CLOUD_DEVICE_DETAIL_LIST] (state, payload) {
        state.cloudDeviceDetailList = payload
    },
    [cloud.CLOUD_DEVICE_DETAIL_PAGINATION] (state, payload) {
        state.cloudDeviceDetailPagination = payload
    },
    [cloud.CLOUD_HOME_DETAIL_LIST] (state, payload) {
        state.cloudHomeDetailList = payload
    },
    [cloud.CLOUD_HOME_DETAIL_PAGINATION] (state, payload) {
        state.cloudHomeDetailPagination = payload
    },
    [cloud.CLOUD_HOME_DETAIL_SEARCH_DICT] (state, payload) {
        state.cloudHomeDetailDict = payload
    },
    [cloud.CLOUD_HOME_COMFORT_SCENE] (state, payload) {
        state.comfortableSceneList = payload
    },
    [cloud.CLOUD_HOME_COMFORT_SCENE_PAGINATION] (state, payload) {
        state.comfortableSceneListPagination = payload
    },
    [cloud.CLOUD_HOME_COMFORT_SCENE_STATISTICS] (state, payload) {
        state.getCloudHomeComfortStatisticsList = payload
    },
    [cloud.CLOUD_ALARM_CHART] (state, payload) {
        state.cloudAlarmChart = payload
    },
    [cloud.CLOUD_SEND_MESSAGE_DETAIL_CHART] (state, payload) {
        state.cloudSendMessageDetailChart = payload
    },
    [cloud.CLOUD_USER_FEEDBACK_LIST] (state, payload) {
        state.cloudUserFeedbackList = payload
    },
    [cloud.CLOUD_USER_FEEDBACK_PAGINATION] (state, payload) {
        state.cloudUserFeedbackPagination = payload
        state.cloudSendMessageDetailChart = payload
    },
    [cloud.CLOUD_COMFORT_ENCYCLOPEDIA_LIST] (state, payload) {
        state.cloudComfortEncyclopediaList = payload
    },
    [cloud.CLOUD_COMFORT_ENCYCLOPEDIA_LIST_PAGINATION] (state, payload) {
        state.cloudComfortEncyclopediaListPagination = payload
    },
    [cloud.CLOUD_COMFORT_ENCYCLOPEDIA_DETAIL] (state, payload) {
        state.cloudComfortEncyclopediaDetail = payload
    },
    [cloud.KNOWLEDGE_CATALOGUE_LIST] (state, payload) {
        state.klCatalogueList = payload
    },
    [cloud.KNOWLEDGE_QUESTION_LIST] (state, payload) {
        state.klQuestionList = payload
    },
    [cloud.KNOWLEDGE_QUESTION_DETAIL] (state, payload) {
        state.klQuestionDetail = payload
    },
    [cloud.GET_OUTBOUND_LIST] (state, payload) {
        state.outBoundList = payload
    },
    [cloud.OUTBOUND_PAGINATION] (state, payload) {
        state.outBoundListPagination = payload
    },
    [cloud.SPLASH_SCREEN_LIST] (state, payload) {
        state.splashScreenList = payload
    },
    [cloud.SPLASH_SCREEN_PAGINATION] (state, payload) {
        state.splashScreenPagination = payload
    },
    [cloud.GET_ALL_ACTIVITY] (state, payload) {
        state.allActivity = payload
    },
    [cloud.GET_CUSTOMER_SERVICE_LIST] (state, payload) {
        state.customerServiceList = payload
    },
    [cloud.GET_CUSTOMER_SERVICE_PAGINATION] (state, payload) {
        state.customerServicePagination = payload
    },
    [cloud.GET_CLOUD_HOME_MODE_TYPE_LIST] (state, payload) {
        state.cloudHomeModeTypeList = payload
    },
    [cloud.GET_SERVICE_MANAGE_HISTORY_LIST] (state, payload) {
        state.serviceManageHistoryList = payload
    },
    [cloud.GET_CLOUD_MERCHANT_LIST] (state, payload) {
        state.cloudMerchantList = payload
    },
    [cloud.CLOUD_MERCHANT_LIST_PAGINATION] (state, payload) {
        state.cloudMerchantListPagination = payload
    },
    [cloud.GET_CLOUD_MERCHANT_AD_LIST]  (state, payload) {
        state.cloudMerchantAdList = payload
    },
    [cloud.GET_CLOUD_MERCHANT_AD_LIST_PAGINATION]  (state, payload) {
        state.cloudMerchantAdListPagination = payload
    },
    [cloud.GET_CLOUD_MERCHANT_AD_DETAIL] (state, payload) {
        state.cloudMerchantAdDetail = payload
    },
    [cloud.GET_CLOUD_MERCHANT_ORDER_LIST]  (state, payload) {
        state.cloudMerchantOrderList = payload
    },
    [cloud.GET_CLOUD_MERCHANT_ORDER_LIST_PAGINATION]  (state, payload) {
        state.cloudMerchantOrderListPagination = payload
    }
}

const actions = {
    async findMembersituation ({ commit }, params) {
        const { data } = await Api.getMembersituation(params)
        commit(types.MEMBERS_DATA, data.data)
    },
    async findIotMemberDetail ({ commit }, params) {
        const { data } = await Api.getMemberDetail(params)
        commit(types.MEMBERS_DETAIL, data.data)
    },
    async findFamilyDetail ({ commit }, params) {
        const { data } = await Api.getFamilyDetail(params)
        commit(types.FAMILY_DATA, data.data)
    },
    async findcloudActDetail ({ commit }, params) {
        const { data } = await Api.getActdetail(params)
        commit(cloud.CLOUD_ACTDETAIL, data.data)
    },
    async findcloudActList ({ commit }, params) {
        const { data } = await Api.getCloudActlist(params)
        commit(cloud.CLOUD_ACTLIST, data.data)
    },
    async findCloudAlarmList ({ commit }, params) {
        const { data } = await Api.getCloudAlarmList(params)
        // 后台返回的分页结果不一样
        commit(cloud.CLOUD_ALARM_LIST, data.data.pageContent)
        commit(cloud.CLOUD_ALARM_PAGINATION, {
            pageNumber: data.data.pageNumber,
            pageSize: data.data.pageSize,
            total: data.data.totalElements
        })
    },
    async findCloudEquipmentErrorList ({ commit }, params) {
        const { data } = await Api.getCloudEquipmentErrorList(params)
        commit(cloud.CLOUD_EQUIPMENT_ERROR_LIST, data.data.records)
        commit(cloud.CLOUD_EQUIPMENT_ERROR_PAGINATION, {
            pageNumber: data.data.current,
            pageSize: data.data.size,
            total: data.data.total
        })
    },
    async findCloudDict ({ commit }, params) {
        const { data } = await Api.getCloudDict(params)
        commit(cloud.CLOUD_DICT, data.data)
    },
    async findCloudSmartPlayList ({ commit }, params) {
        const { data } = await Api.getCloudSmartPlayList(params)
        commit(cloud.CLOUD_SMART_PLAY_LIST, data.data.records)
        commit(cloud.CLOUD_SMART_PLAY_PAGINATION, {
            pageNumber: data.data.current,
            pageSize: data.data.size,
            total: data.data.total
        })
    },
    async findCloudSmartPlayPostDetail ({ commit }, params) {
        const { data } = await Api.getCloudSmartPlayDetail(params)
        commit(cloud.CLOUD_SMART_PLAY_POST_DETAIL, data.data)
    },
    async findCloudSendMessageList ({ commit }, params) {
        const { data } = await Api.getCloudSendMessageList(params)
        commit(cloud.CLOUD_SEND_MESSAGE_LIST, data.data.records)
        commit(cloud.CLOUD_SEND_MESSAGE_PAGINATION, {
            pageNumber: data.data.current,
            pageSize: data.data.size,
            total: data.data.total
        })
    },
    async findCloudSendMessagePostDetail ({ commit }, params) {
        const { data } = await Api.getCloudSendMessagePostDetail(params)
        commit(cloud.CLOUD_SEND_MESSAGE_POST_DETAIL, data.data)
    },
    async findHistoryReport ({ commit }, params) {
        const { data } = await Api.getCloudHistoryReport(params)
        commit(cloud.CLOUD_HISTORY_REPORT, data.data)
    },
    async findRuntimeReport ({ commit }, params) {
        const { data } = await Api.getCloudRuntimeReport(params)
        commit(cloud.CLOUD_RUNTIME_REPORT, data.data)
    },
    async findCloudDeviceCount ({ commit }, params) {
        const { data } = await Api.getCloudDeviceCount(params)
        commit(cloud.CLOUD_DEVICE_COUNT, data.data)
    },
    async findCloudDeviceDetailList ({ commit }, params) {
        const { data } = await Api.getCloudDeviceDetailList(params)
        commit(cloud.CLOUD_DEVICE_DETAIL_LIST, data.data.records)
        commit(cloud.CLOUD_DEVICE_DETAIL_PAGINATION, {
            pageNumber: data.data.current,
            pageSize: data.data.size,
            total: data.data.total
        })
    },
    async findCloudHomeDetailList ({ commit }, params) {
        const { data } = await Api.getCloudHomeDetailList(params)
        commit(cloud.CLOUD_HOME_DETAIL_LIST, data.data.records)
        commit(cloud.CLOUD_HOME_DETAIL_PAGINATION, {
            pageNumber: data.data.current,
            pageSize: data.data.size,
            total: data.data.total
        })
    },
    async findCloudHomeDetailSearchDict ({ commit }, params) {
        const { data } = await Api.getCloudHomeDetailSearchDict(params)
        commit(cloud.CLOUD_HOME_DETAIL_SEARCH_DICT, data.data)
    },
    async findComfortableSceneList ({ commit }, params) {
        const { data } = await Api.getCloudHomeComfortReportList(params)
        commit(cloud.CLOUD_HOME_COMFORT_SCENE, data.data.content)
        commit(cloud.CLOUD_HOME_COMFORT_SCENE_PAGINATION, {
            pageNumber: data.data.number + 1,
            pageSize: data.data.size,
            total: data.data.totalElements
        })
    },
    async findCloudHomeComfortStatisticsList ({ commit }, params) {
        const { data } = await Api.getCloudHomeComfortStatisticsList(params)
        commit(cloud.CLOUD_HOME_COMFORT_SCENE_STATISTICS, data.data.comfortRunStats)
        return data.data.totalRunHours
    },
    async findCloudAlarmChart ({ commit }, params) {
        const { data } = await Api.getCloudAlarmChart(params)
        commit(cloud.CLOUD_ALARM_CHART, data.data)
    },
    async findCloudSendMessageDetailChart ({ commit }, params) {
        const { data } = await Api.getCloudSendMessageDetailChart(params)
        commit(cloud.CLOUD_SEND_MESSAGE_DETAIL_CHART, data.data)
    },
    async findUserFeedbackList ({ commit }, params) {
        const { data } = await Api.getCloudUserFeedback(params)
        commit(cloud.CLOUD_USER_FEEDBACK_LIST, data.data.records)
        commit(cloud.CLOUD_USER_FEEDBACK_PAGINATION, {
            pageNumber: data.data.current,
            pageSize: data.data.size,
            total: data.data.total
        })
    },
    async findCloudComfortEncyclopediaList ({ commit }, params) {
        const { data } = await Api.getComfortEncyclopediaList(params)
        commit(cloud.CLOUD_COMFORT_ENCYCLOPEDIA_LIST, data.data.records)
        commit(cloud.CLOUD_COMFORT_ENCYCLOPEDIA_LIST_PAGINATION, {
            pageNumber: data.data.current,
            pageSize: data.data.size,
            total: data.data.total
        })
    },
    async findComfortEncyclopediaDetail ({ commit }, params) {
        const { data } = await Api.getComfortEncyclopediaDetail(params)
        commit(cloud.CLOUD_COMFORT_ENCYCLOPEDIA_DETAIL, data.data)
    },
    async getCatalogueListAct ({ commit }, params) {
        const { data } = await Api.getCatalogueList()
        commit(cloud.KNOWLEDGE_CATALOGUE_LIST, data.data)
    },
    async getQuestionListAct ({ commit }, params) {
        const { data } = await Api.getQuestionList(params)
        commit(cloud.KNOWLEDGE_QUESTION_LIST, data.data)
    },
    async getQuestionDetailAct ({ commit }, params) {
        const { data } = await Api.getQuestionDetail(params)
        commit(cloud.KNOWLEDGE_QUESTION_DETAIL, data.data)
    },
    async getOutboundList ({ commit }, params) {
        const { data } = await Api.getOutboundList(params)
        commit(cloud.GET_OUTBOUND_LIST, data.data.records)
        commit(cloud.OUTBOUND_PAGINATION, {
            pageNumber: data.data.current,
            pageSize: data.data.size,
            total: data.data.total
        })
    },
    async getSplashScreenList ({ commit }, params) {
        const { data } = await Api.getSplashScreenList(params)
        commit(cloud.SPLASH_SCREEN_LIST, data.data.records)
        commit(cloud.SPLASH_SCREEN_PAGINATION, {
            pageNumber: data.data.current,
            pageSize: data.data.size,
            total: data.data.total
        })
    },
    async getAllActivity ({ commit }, params) {
        const { data } = await Api.getAllActivity(params)
        commit(cloud.GET_ALL_ACTIVITY, data.data)
    },
    async getCustomerService ({ commit }, params) {
        const { data } = await Api.getCustomerService(params)
        commit(cloud.GET_CUSTOMER_SERVICE_LIST, data.data.records)
        commit(cloud.GET_CUSTOMER_SERVICE_PAGINATION, {
            pageNumber: data.data.current,
            pageSize: data.data.size,
            total: data.data.total
        })
    },
    async getCloudHomeModeTypeList ({ commit }, params) {
        const { data } = await Api.getCloudHomeModeTypeList(params)
        commit(cloud.GET_CLOUD_HOME_MODE_TYPE_LIST, data.data)
    },
    async getServiceManageHistoryList ({ commit }, params) {
        const { data } = await Api.getServiceManageHistoryList(params)
        commit(cloud.GET_SERVICE_MANAGE_HISTORY_LIST, data.data)
    },
    async findCloudMerchantList ({ commit }, params) {
        const { data } = await Api.getCloudMerchantList(params)
        commit(cloud.GET_CLOUD_MERCHANT_LIST, data.data.records)
        commit(cloud.CLOUD_MERCHANT_LIST_PAGINATION, {
            pageNumber: data.data.current,
            pageSize: data.data.size,
            total: data.data.total
        })
    },
    async findCloudMerchantAdList ({ commit }, params) {
        const { data } = await Api.getCloudMerchantAdList(params)
        commit(cloud.GET_CLOUD_MERCHANT_AD_LIST, data.data.records)
        commit(cloud.GET_CLOUD_MERCHANT_AD_LIST_PAGINATION, {
            pageNumber: data.data.current,
            pageSize: data.data.size,
            total: data.data.total
        })
    },
    async getCloudMerchantAdDetail ({ commit }, params) {
        const { data } = await Api.getCloudMerchantAdDetail(params)
        commit(cloud.GET_CLOUD_MERCHANT_AD_DETAIL, data.data)
    },
    async findCloudMerchantOrderList ({ commit }, params) {
        const { data } = await Api.getCloudMerchantOrderList(params)
        commit(cloud.GET_CLOUD_MERCHANT_ORDER_LIST, data.data.records)
        commit(cloud.GET_CLOUD_MERCHANT_ORDER_LIST_PAGINATION, {
            pageNumber: data.data.current,
            pageSize: data.data.size,
            total: data.data.total
        })
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}

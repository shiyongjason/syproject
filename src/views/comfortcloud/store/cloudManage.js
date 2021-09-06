import * as types from '../../../store/mutation-types'
import * as cloud from './cloudTypes'
// import { getMembersituation, getMemberDetail, getFamilyDetail, getActdetail, getCloudActlist } from '@/views/comfortcloud/api'
import * as Api from '@/views/comfortcloud/api'

const state = {
    iotmemberData: {},
    iotmerchantmemberData: {},
    iotmerchantExternalMemberData: {},
    iotmerchantmemberDataPagination: {},
    iotmerchantDistributorPagination: {},
    iotmerchantDistributorData: {},
    iotmerchantRewardData: {},
    iotmerchantActiveData: {},
    iotmerchantmemberTotalData: {},
    iotmerchantmemberInvitationRegisterData: {},
    merchantCompanyEmployeeData: {},
    iotmerchantmemberEnterpriseInfo: {},
    iotmerchantmemberInvitationChangeData: {},
    iotmerchantmemberInvitationBuy: {},
    iotmerchantmemberInvitationTotal: {},
    iotmerchantmemberInvitationRegisterDataPagination: {},
    iotmerchantmemberInvitationOrderData: {},
    iotmerchantmemberInvitationOrderDataPagination: {},
    iotmemberDetail: {},
    familyData: {},
    cloudActivitydetail: {},
    cloudActicitylist: {},
    cloudAlarmList: [],
    cloudAlarmPagination: {},
    cloudEquipmentErrorList: [],
    cloudDeviceIDImportData: {},
    cloudEquipmentErrorPagination: {},
    deviceIDImportPagination: {},
    cloudDict: [],
    cloudImportDict: [],
    cloudSmartPlayList: [],
    cloudSmartPlayPagination: {},
    cloudSendMessageList: [],
    cloudSendMessagePagination: {},
    cloudSendMessagePostDetail: {},
    cloudSmartPlayPostDetail: {},
    cloudHistoryReport: {},
    cloudRuntimeReport: {},
    cloudNetworkReport: {},
    cloudDeviceCount: {},
    cloudDeviceDetailList: [],
    cloudDeviceDetailPagination: {},
    cloudHomeDetailList: [],
    cloudHomeDetailPagination: {},
    cloudHomeDetailDict: [],
    cloudNetworkDetailList: [],
    cloudNetworkDetailPagination: {},
    cloudNetworkModeTypeList: [],
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
    adPopList: [],
    adPopPagination: {},
    allActivity: [],
    customerServiceList: [],
    customerServicePagination: {},
    cloudHomeModeTypeList: [],
    serviceManageHistoryList: [],
    cloudMerchantList: [],
    cloudMerchantListPagination: {},
    cloudMerchantDetailList: [],
    cloudMerchantDetailListPagination: {},
    cloudMerchantDetailStats: {},
    cloudMerchantCaseList: [],
    cloudMerchantCaseDetailList: [],
    cloudMerchantFromPhone: [],
    cloudMerchantAgentDetail: {},
    cloudMerchantAdList: [],
    cloudMerchantAdListPagination: {},
    cloudMerchantAdDetail: {},
    cloudMerchantAgentOrderDetail: {},
    cloudMerchantOrderList: [],
    cloudMerchantOrderDetail: [],
    cloudMerchantOrderListPagination: {},
    cloudMerchantShopList: [],
    cloudMerchantShopListPagination: {},
    cloudMerchantShopCategoryList: [],
    cloudMerchantShopCategoryTypeList: [],
    cloudOutboundDeviceList: [],
    cloudOutboundMerchantList: [],
    cloudOutboundCategoryList: [],
    cloudMerchantRecommendList: [],
    cloudMerchantRecommendListPagination: {},
    cloudMerchantClassifyList: [],
    cloudMerchantClassifyListPagination: {},
    cloudMerchantProductOrderList: [],
    cloudMerchantProductOutOrderList: [],
    cloudMerchantProductOrderPagination: {},
    cloudMerchantProductOutOrderPagination: {},
    cloudMerchantProductOrderDetail: {},
    cloudMerchantProductOutOrderDetail: {},
    cloudMerchantProductOrderTotal: {},
    cloudMerchantActivityPurchaseData: {},
    cloudMerchantmemberInvitationOutOrderData: {},
    cloudMerchantmemberInvitationProjectData: {},
    cloudMerchantTaglist: [],
    cloudMerchantMemberCommunicationList: [],
    cloudMerchantMemberCommunicationListPagination: {},
    cloudMerchantMemberDepartmentList: [],
    cloudMerchantMaterialList: [],
    cloudMerchantProjectSchemeList: [],
    cloudMerchantProjectSchemeListPagination: {},
    cloudMerchantProjectSchemeDetail: {},
    canUnbindDeivceList: [],
    bossBindRecords: [],
    complaintOrderList: [],
    complaintOrderDetail: {},
    complaintProcessOrderList: [],
    complaintProcessOrderDetail: {},
    cloudServiceMindList: [],
    cloudServiceMindListPagination: {},
    clouldControlProjectList: [],
    clouldControlProjectDetail: {},
    clouldControlProjectDevicesTypes: []
}

const getters = {
    iotmemberData: state => state.iotmemberData,
    iotmerchantmemberData: state => state.iotmerchantmemberData,
    iotmerchantExternalMemberData: state => state.iotmerchantExternalMemberData,
    iotmerchantmemberTotalData: state => state.iotmerchantmemberTotalData,
    iotmerchantDistributorData: state => state.iotmerchantDistributorData,
    iotmerchantRewardData: state => state.iotmerchantRewardData,
    iotmerchantActiveData: state => state.iotmerchantActiveData,
    iotmerchantmemberInvitationOrderData: state => state.iotmerchantmemberInvitationOrderData,
    iotmerchantmemberInvitationRegisterData: state => state.iotmerchantmemberInvitationRegisterData,
    merchantCompanyEmployeeData: state => state.merchantCompanyEmployeeData,
    iotmerchantmemberEnterpriseInfo: state => state.iotmerchantmemberEnterpriseInfo,
    iotmerchantmemberInvitationChangeData: state => state.iotmerchantmemberInvitationChangeData,
    iotmerchantmemberInvitationBuy: state => state.iotmerchantmemberInvitationBuy,
    iotmerchantmemberInvitationTotal: state => state.iotmerchantmemberInvitationTotal,
    iotmemberDetail: state => state.iotmemberDetail,
    familyData: state => state.familyData,
    cloudActivitydetail: state => state.cloudActivitydetail,
    cloudActicitylist: state => state.cloudActicitylist,
    cloudAlarmList: state => state.cloudAlarmList,
    cloudAlarmPagination: state => state.cloudAlarmPagination,
    cloudEquipmentErrorList: state => state.cloudEquipmentErrorList,
    cloudDeviceIDImportData: state => state.cloudDeviceIDImportData,
    cloudEquipmentErrorPagination: state => state.cloudEquipmentErrorPagination,
    deviceIDImportPagination: state => state.deviceIDImportPagination,
    cloudDict: state => state.cloudDict,
    cloudImportDict: state => state.cloudImportDict,
    cloudSmartPlayList: state => state.cloudSmartPlayList,
    cloudSmartPlayPagination: state => state.cloudSmartPlayPagination,
    cloudSmartPlayPostDetail: state => state.cloudSmartPlayPostDetail,
    cloudSendMessageList: state => state.cloudSendMessageList,
    cloudSendMessagePagination: state => state.cloudSendMessagePagination,
    cloudSendMessagePostDetail: state => state.cloudSendMessagePostDetail,
    cloudHistoryReport: state => state.cloudHistoryReport,
    cloudRuntimeReport: state => state.cloudRuntimeReport,
    cloudNetworkReport: state => state.cloudNetworkReport,
    cloudDeviceCount: state => state.cloudDeviceCount,
    cloudDeviceDetailList: state => state.cloudDeviceDetailList,
    cloudDeviceDetailPagination: state => state.cloudDeviceDetailPagination,
    cloudHomeDetailList: state => state.cloudHomeDetailList,
    cloudHomeDetailPagination: state => state.cloudHomeDetailPagination,
    cloudHomeDetailDict: state => state.cloudHomeDetailDict,
    cloudNetworkDetailList: state => state.cloudNetworkDetailList,
    cloudNetworkDetailPagination: state => state.cloudNetworkDetailPagination,
    cloudNetworkModeTypeList: state => state.cloudNetworkModeTypeList,
    cloudHomeOpDetailList: state => state.cloudHomeOpDetailList,
    cloudHomeOpDetailPagination: state => state.cloudHomeOpDetailPagination,
    cloudHomeCoDetailList: state => state.cloudHomeCoDetailList,
    cloudHomeCoDetailPagination: state => state.cloudHomeCoDetailPagination,
    cloudHomeApDetailList: state => state.cloudHomeApDetailList,
    cloudHomeApDetailPagination: state => state.cloudHomeApDetailPagination,
    cloudHomeRtDetailList: state => state.cloudHomeRtDetailList,
    cloudHomeRtDetailPagination: state => state.cloudHomeRtDetailPagination,
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
    adPopList: state => {
        state.adPopList.forEach(v => {
            v.status = !!v.status
        })
        return state.adPopList
    },
    allActivity: state => state.allActivity.map(v => {
        const value = v.title.length < 15 ? v.title : v.title.substr(0, 14) + '...'
        return { selectCode: v.id, value }
    }),
    cloudHomeModeTypeList: state => state.cloudHomeModeTypeList,
    serviceManageHistoryList: state => state.serviceManageHistoryList,
    cloudMerchantList: state => state.cloudMerchantList,
    cloudMerchantListPagination: state => state.cloudMerchantListPagination,
    cloudMerchantDetailList: state => state.cloudMerchantDetailList,
    cloudMerchantDetailListPagination: state => state.cloudMerchantDetailListPagination,
    cloudMerchantDetailStats: state => state.cloudMerchantDetailStats,
    cloudMerchantCaseList: state => state.cloudMerchantCaseList,
    cloudMerchantCaseDetailList: state => state.cloudMerchantCaseDetailList,
    cloudMerchantFromPhone: state => state.cloudMerchantFromPhone,
    cloudMerchantAgentDetail: state => state.cloudMerchantAgentDetail,
    cloudMerchantAdList: state => state.cloudMerchantAdList,
    cloudMerchantAdListPagination: state => state.cloudMerchantAdListPagination,
    cloudMerchantAdDetail: state => state.cloudMerchantAdDetail,
    cloudMerchantAgentOrderDetail: state => state.cloudMerchantAgentOrderDetail,
    cloudMerchantOrderList: state => state.cloudMerchantOrderList,
    cloudMerchantOrderDetail: state => state.cloudMerchantOrderDetail,
    cloudMerchantOrderListPagination: state => state.cloudMerchantOrderListPagination,
    cloudMerchantShopList: state => state.cloudMerchantShopList,
    cloudMerchantShopListPagination: state => state.cloudMerchantShopListPagination,
    cloudMerchantShopCategoryList: state => state.cloudMerchantShopCategoryList,
    cloudMerchantShopCategoryTypeList: state => state.cloudMerchantShopCategoryTypeList,
    iotmerchantmemberDataPagination: state => state.iotmerchantmemberDataPagination,
    iotmerchantDistributorPagination: state => state.iotmerchantDistributorPagination,
    iotmerchantmemberInvitationRegisterDataPagination: state => state.iotmerchantmemberInvitationRegisterDataPagination,
    iotmerchantmemberInvitationOrderDataPagination: state => state.iotmerchantmemberInvitationOrderDataPagination,
    cloudOutboundDeviceList: state => state.cloudOutboundDeviceList,
    cloudOutboundMerchantList: state => state.cloudOutboundMerchantList,
    cloudOutboundCategoryList: state => state.cloudOutboundCategoryList,
    cloudMerchantRecommendList: state => state.cloudMerchantRecommendList,
    cloudMerchantRecommendListPagination: state => state.cloudMerchantRecommendListPagination,
    cloudMerchantClassifyList: state => state.cloudMerchantClassifyList,
    cloudMerchantClassifyListPagination: state => state.cloudMerchantClassifyListPagination,
    cloudMerchantProductOrderList: state => state.cloudMerchantProductOrderList,
    cloudMerchantProductOutOrderList: state => state.cloudMerchantProductOutOrderList,
    cloudMerchantProductOrderPagination: state => state.cloudMerchantProductOrderPagination,
    cloudMerchantProductOutOrderPagination: state => state.cloudMerchantProductOrderPagination,
    cloudMerchantProductOrderDetail: state => state.cloudMerchantProductOrderDetail,
    cloudMerchantProductOutOrderDetail: state => state.cloudMerchantProductOutOrderDetail,
    cloudMerchantProductOrderTotal: state => state.cloudMerchantProductOrderTotal,
    cloudMerchantActivityPurchaseData: state => state.cloudMerchantActivityPurchaseData,
    cloudMerchantmemberInvitationOutOrderData: state => state.cloudMerchantmemberInvitationOutOrderData,
    cloudMerchantmemberInvitationProjectData: state => state.cloudMerchantmemberInvitationProjectData,
    cloudMerchantTaglist: state => state.cloudMerchantTaglist,
    cloudMerchantMemberCommunicationList: state => state.cloudMerchantMemberCommunicationList,
    cloudMerchantMemberCommunicationListPagination: state => state.cloudMerchantMemberCommunicationListPagination,
    cloudMerchantMemberDepartmentList: state => state.cloudMerchantMemberDepartmentList,
    cloudMerchantMaterialList: state => state.cloudMerchantMaterialList,
    cloudMerchantProjectSchemeList: state => state.cloudMerchantProjectSchemeList,
    cloudMerchantProjectSchemeListPagination: state => state.cloudMerchantProjectSchemeListPagination,
    cloudMerchantProjectSchemeDetail: state => state.cloudMerchantProjectSchemeDetail,
    canUnbindDeivceList: state => state.canUnbindDeivceList,
    bossBindRecords: state => state.bossBindRecords,
    complaintOrderList: state => state.complaintOrderList,
    complaintOrderDetail: state => state.complaintOrderDetail,
    complaintProcessOrderList: state => state.complaintProcessOrderList,
    complaintProcessOrderDetail: state => state.complaintProcessOrderDetail,
    cloudServiceMindList: state => state.cloudServiceMindList,
    cloudServiceMindListPagination: state => state.cloudServiceMindListPagination,
    clouldControlProjectList: state => state.clouldControlProjectList,
    clouldControlProjectDetail: state => state.clouldControlProjectDetail,
    clouldControlProjectDevicesTypes: state => state.clouldControlProjectDevicesTypes
}

const mutations = {
    [types.MEMBERS_DATA] (state, payload) {
        state.iotmemberData = payload
    },
    [types.MERCHANT_MEMBERS_DATA] (state, payload) {
        state.iotmerchantmemberData = payload
    },
    [types.MERCHANT_EXTERNAL_MEMBERS_DATA] (state, payload) {
        state.iotmerchantExternalMemberData = payload
    },
    [types.MERCHANT_MEMBERS_DATA_LIST_PAGINATION] (state, payload) {
        state.iotmerchantmemberDataPagination = payload
    },
    [types.MERCHANT_MEMBERS_TOTAL_DATA] (state, payload) {
        state.iotmerchantmemberTotalData = payload
    },
    [types.MEMBERS_DISTRIBUTOR] (state, payload) {
        state.iotmerchantDistributorData = payload
    },
    [types.MERCHANT_REWARD_DATA] (state, payload) {
        state.iotmerchantRewardData = payload
    },
    [types.MERCHANT_ACTIVE_DATA] (state, payload) {
        state.iotmerchantActiveData = payload
    },
    [types.MERCHANT_MEMBERS_INVITATION_ORDER_DATA] (state, payload) {
        state.iotmerchantmemberInvitationOrderData = payload
    },
    [types.MERCHANT_MEMBERS_INVITATION_REGISTER_DATA] (state, payload) {
        state.iotmerchantmemberInvitationRegisterData = payload
    },
    [types.MERCHANT_COMPANY_EMPLOYEEDATA] (state, payload) {
        state.merchantCompanyEmployeeData = payload
    },
    [types.MERCHANT_MEMBERS_ENTERPRISE_INFO] (state, payload) {
        state.iotmerchantmemberEnterpriseInfo = payload
    },
    [types.MERCHANT_MEMBERS_INVITATION_CHANGE_DATA] (state, payload) {
        state.iotmerchantmemberInvitationChangeData = payload
    },
    [types.MERCHANT_MEMBERS_INVITATION_BUY_DATA] (state, payload) {
        state.iotmerchantmemberInvitationBuy = payload
    },
    [types.MERCHANT_MEMBERS_INVITATION_BUY_DATA_TOTAL] (state, payload) {
        state.iotmerchantmemberInvitationTotal = payload
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
    [cloud.CLOUD_DEVICE_ID_IMPORT] (state, payload) {
        state.cloudDeviceIDImportData = payload
    },
    [cloud.CLOUD_EQUIPMENT_ERROR_PAGINATION] (state, payload) {
        state.cloudEquipmentErrorPagination = payload
    },
    [cloud.CLOUD_DEVICE_ID_IMPORT_PAGINATION] (state, payload) {
        state.deviceIDImportPagination = payload
    },
    [cloud.CLOUD_DICT] (state, payload) {
        state.cloudDict = payload
    },
    [cloud.CLOUD_DEVICE_BRAND_NO] (state, payload) {
        state.cloudImportDict = payload
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
    [cloud.CLOUD_NETWORK_REPORT] (state, payload) {
        state.cloudNetworkReport = payload
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
    [cloud.CLOUD_NETWORK_DETAIL_LIST] (state, payload) {
        state.cloudNetworkDetailList = payload
    },
    [cloud.CLOUD_NETWORK_DETAIL_PAGINATION] (state, payload) {
        state.cloudNetworkDetailPagination = payload
    },
    [cloud.CLOUD_NETWORK_MODE_TYPE_LIST] (state, payload) {
        state.cloudNetworkModeTypeList = payload
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
    [cloud.AD_POP_LIST] (state, payload) {
        state.adPopList = payload
    },
    [cloud.AD_POP_PAGINATION] (state, payload) {
        state.adPopPagination = payload
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
    [cloud.GET_CLOUD_MERCHANT_DETAIL_LIST] (state, payload) {
        state.cloudMerchantDetailList = payload
    },
    [cloud.GET_CLOUD_MERCHANT_DETAIL_LIST_PAGINATION] (state, payload) {
        state.cloudMerchantDetailListPagination = payload
    },
    [cloud.GET_CLOUD_MERCHANT_DETAIL_STATS] (state, payload) {
        state.cloudMerchantDetailStats = payload
    },
    [cloud.GET_CLOUD_MERCHANT_CASE_LIST] (state, payload) {
        state.cloudMerchantCaseList = payload
    },
    [cloud.GET_CLOUD_MERCHANT_CASE_DETAIL_LIST] (state, payload) {
        state.cloudMerchantCaseDetailList = payload
    },
    [cloud.GET_CLOUD_MERCHANT_FROM_PHONE] (state, payload) {
        state.cloudMerchantFromPhone = payload
        console.log(payload)
    },
    [cloud.CLOUD_MERCHANT_LIST_PAGINATION] (state, payload) {
        state.cloudMerchantListPagination = payload
    },
    [cloud.CLOUD_MERCHANT_AGENT_DETAIL] (state, payload) {
        state.cloudMerchantAgentDetail = payload
    },
    [cloud.GET_CLOUD_MERCHANT_AD_LIST] (state, payload) {
        state.cloudMerchantAdList = payload
    },
    [cloud.GET_CLOUD_MERCHANT_AD_LIST_PAGINATION] (state, payload) {
        state.cloudMerchantAdListPagination = payload
    },
    [cloud.GET_CLOUD_MERCHANT_AD_DETAIL] (state, payload) {
        state.cloudMerchantAdDetail = payload
    },
    [cloud.GET_CLOUD_MERCHANT_AGENCY_ORDER_DETAIL] (state, payload) {
        state.cloudMerchantAgentOrderDetail = payload
    },
    [cloud.GET_CLOUD_MERCHANT_ORDER_LIST] (state, payload) {
        state.cloudMerchantOrderList = payload
    },
    [cloud.GET_CLOUD_MERCHANT_ORDER_DETAIL] (state, payload) {
        state.cloudMerchantOrderDetail = payload
    },
    [cloud.GET_CLOUD_MERCHANT_ORDER_LIST_PAGINATION] (state, payload) {
        state.cloudMerchantOrderListPagination = payload
    },
    [cloud.GET_CLOUD_MERCHANT_SHOP_LIST] (state, payload) {
        state.cloudMerchantShopList = payload
    },
    [cloud.GET_CLOUD_MERCHANT_SHOP_LIST_PAGINATION] (state, payload) {
        state.cloudMerchantShopListPagination = payload
    },
    [cloud.GET_CLOUD_MERCHANT_SHOP_CATEGORY_LIST] (state, payload) {
        state.cloudMerchantShopCategoryList = payload
    },
    [cloud.GET_CLOUD_MERCHANT_SHOP_CATEGORY_TYPE_LIST] (state, payload) {
        state.cloudMerchantShopCategoryTypeList = payload
    },
    [cloud.GET_CLOUD_OUTBOUND_DEVICE_LIST] (state, payload) {
        state.cloudOutboundDeviceList = payload
    },
    [cloud.GET_CLOUD_OUTBOUND_MERCHANT_LIST] (state, payload) {
        state.cloudOutboundMerchantList = payload
    },
    [cloud.GET_CLOUD_OUTBOUND_CATEGORY_LIST] (state, payload) {
        state.cloudOutboundCategoryList = payload
    },
    [cloud.GET_CLOUD_MERCHANT_RECOMMEND_LIST] (state, payload) {
        state.cloudMerchantRecommendList = payload
    },
    [cloud.GET_CLOUD_MERCHANT_RECOMMEND_LIST_PAGINATION] (state, payload) {
        state.cloudMerchantRecommendListPagination = payload
    },
    [cloud.GET_CLOUD_MERCHANT_CLASSIFY_LIST] (state, payload) {
        state.cloudMerchantClassifyList = payload
    },
    [cloud.GET_CLOUD_MERCHANT_CLASSIFY_LIST_PAGINATION] (state, payload) {
        state.cloudMerchantClassifyListPagination = payload
    },
    [cloud.GET_CLOUD_MERCHANT_PRODUCT_ORDER_LIST] (state, payload) {
        state.cloudMerchantProductOrderList = payload
    },
    [cloud.GET_CLOUD_MERCHANT_PRODUCT_OUT_ORDER_LIST] (state, payload) {
        state.cloudMerchantProductOutOrderList = payload
    },
    [cloud.GET_CLOUD_MERCHANT_PRODUCT_ORDER_LIST_PAGINATION] (state, payload) {
        state.cloudMerchantProductOrderPagination = payload
    },
    [cloud.GET_CLOUD_MERCHANT_PRODUCT_OUT_ORDER_LIST_PAGINATION] (state, payload) {
        state.cloudMerchantProductOutOrderPagination = payload
    },
    [cloud.GET_CLOUD_MERCHANT_PRODUCT_ORDER_DETAIL] (state, payload) {
        state.cloudMerchantProductOrderDetail = payload
    },
    [cloud.GET_CLOUD_MERCHANT_PRODUCT_OUT_ORDER_DETAIL] (state, payload) {
        state.cloudMerchantProductOutOrderDetail = payload
    },
    [cloud.GET_CLOUD_MERCHANT_PRODUCT_ORDER_TOTAL] (state, payload) {
        state.cloudMerchantProductOrderTotal = payload
    },
    [types.GET_CLOUD_MERCHANT_ACTIVITY_PURCHASE_DATA] (state, payload) {
        state.cloudMerchantActivityPurchaseData = payload
    },
    [cloud.MERCHANT_MEMBERS_INVITATION_OUT_ORDER_DATA] (state, payload) {
        state.cloudMerchantmemberInvitationOutOrderData = payload
    },
    [cloud.MERCHANT_MEMBERS_INVITATION_PROJECT_DATA] (state, payload) {
        state.cloudMerchantmemberInvitationProjectData = payload
    },
    [cloud.GET_CLOUD_MERCHANT_TAG_LIST] (state, payload) {
        state.cloudMerchantTaglist = payload
    },
    [cloud.GET_CLOUD_MERCHANT_MEMBER_COMMUNICATION_LIST] (state, payload) {
        state.cloudMerchantMemberCommunicationList = payload
    },
    [cloud.GET_CLOUD_MERCHANT_MEMBER_COMMUNICATION_LIST_PAGINATION] (state, payload) {
        state.cloudMerchantMemberCommunicationListPagination = payload
    },
    [cloud.GET_CLOUD_MERCHANT_MEMBER_DEPARTMENT_LIST] (state, payload) {
        state.cloudMerchantMemberDepartmentList = payload
    },
    [cloud.GET_CLOUD_MERCHANT_MATERIAL_LIST] (state, payload) {
        state.cloudMerchantMaterialList = payload
    },
    [cloud.GET_CLOUD_MERCHANT_PROJECT_SCHEME_LIST] (state, payload) {
        state.cloudMerchantProjectSchemeList = payload
    },
    [cloud.GET_CLOUD_MERCHANT_PROJECT_SCHEME_LIST_PAGINATION] (state, payload) {
        state.cloudMerchantProjectSchemeListPagination = payload
    },
    [cloud.GET_CLOUD_MERCHANT_PROJECT_SCHEME_DETAIL] (state, payload) {
        state.cloudMerchantProjectSchemeDetail = payload
    },
    [cloud.GET_CLOUD_MERCHANT_CANUNBIND_DEVICE_LIST] (state, payload) {
        state.canUnbindDeivceList = payload
    },
    [cloud.GET_CLOUD_MERCHANT_BIND_RECORDS] (state, payload) {
        state.bossBindRecords = payload
    },
    [cloud.GET_CLOUD_MERCHANT_COMPLAINT_ORDER_RECORDS] (state, payload) {
        state.complaintOrderList = payload
    },
    [cloud.GET_CLOUD_MERCHANT_COMPLAINT_ORDER_DETAIL] (state, payload) {
        state.complaintOrderDetail = payload
    },
    [cloud.GET_CLOUD_MERCHANT_COMPLAINT_PROCESS_ORDER_LIST] (state, payload) {
        state.complaintProcessOrderList = payload
    },
    [cloud.GET_CLOUD_MERCHANT_COMPLAINT_PROCESS_ORDER_DETAIL] (state, payload) {
        state.complaintProcessOrderDetail = payload
    },
    [cloud.GET_CLOUD_SERVICE_REMIND_LIST] (state, payload) {
        state.cloudServiceMindList = payload
    },
    [cloud.GET_CLOUD_SERVICE_REMIND_LIST_PAGINATION] (state, payload) {
        state.cloudServiceMindListPagination = payload
    },
    [cloud.GET_CLOUD_CONTROL_PROJECT_LIST] (state, payload) {
        state.clouldControlProjectList = payload
    },
    [cloud.GET_CLOUD_CONTROL_PROJECT_DETAIL] (state, payload) {
        state.clouldControlProjectDetail = payload
    },
    [cloud.GET_CLOUD_PROJECT_DEVICES_TYPES] (state, payload) {
        state.clouldControlProjectDevicesTypes = payload
    }
}

const actions = {
    async findMembersituation ({ commit }, params) {
        const { data } = await Api.getMembersituation(params)
        commit(types.MEMBERS_DATA, data.data)
    },
    async findMemberDistributor ({ commit }, params) {
        const { data } = await Api.getMerchantMembersDistributor(params)
        commit(types.MEMBERS_DISTRIBUTOR, data)
    },
    async findMerchantMembersituation ({ commit }, params) {
        const { data } = await Api.getMerchantMembersituation(params)
        commit(types.MERCHANT_MEMBERS_DATA, data)
        commit(types.MERCHANT_MEMBERS_DATA_LIST_PAGINATION, {
            pageNumber: data.pages,
            pageSize: data.size,
            total: data.total
        })
    },
    async findMerchantExternalMembersituation ({ commit }, params) {
        const { data } = await Api.getMerchantExernalMembersituation(params)
        commit(types.MERCHANT_EXTERNAL_MEMBERS_DATA, data)
    },
    async getmerchantRewardData ({ commit }, params) {
        const { data } = await Api.merchantReward(params)
        commit(types.MERCHANT_REWARD_DATA, data)
    },
    async getmerchantActiveData ({ commit }, params) {
        const { data } = await Api.merchantActive(params)
        commit(types.MERCHANT_ACTIVE_DATA, data)
    },
    async getMerchantPurchaseData ({ commit }, params) {
        const { data } = await Api.getMerchantPurchase(params)
        commit(types.GET_CLOUD_MERCHANT_ACTIVITY_PURCHASE_DATA, data)
    },
    async findMerchantMemberInvitationRegistersituation ({ commit }, params) {
        const { data } = await Api.getMerchantMemberInvitationRegistersituation(params)
        commit(types.MERCHANT_MEMBERS_INVITATION_REGISTER_DATA, data)
        commit(types.MERCHANT_MEMBERS_INVITATION_REGISTER_DATA_LIST_PAGINATION, {
            pageNumber: data.pages,
            pageSize: data.size,
            total: data.total
        })
    },
    async findMerchantMemberEnterpriseInfo ({ commit }, params) {
        const { data } = await Api.getMerchantMemberEnterpriseInfo(params)
        commit(types.MERCHANT_MEMBERS_ENTERPRISE_INFO, data)
    },
    async findMerchantMemberInvitationChangesituation ({ commit }, params) {
        const { data } = await Api.getMerchantMemberInvitationChangesituation(params)
        commit(types.MERCHANT_MEMBERS_INVITATION_CHANGE_DATA, data)
    },
    async findMerchantCompanyEmployee ({ commit }, params) {
        const { data } = await Api.getMerchantCompanyEmployee(params)
        commit(types.MERCHANT_COMPANY_EMPLOYEEDATA, data)
    },
    async findMerchantMemberInvitationBuy ({ commit }, params) {
        const { data } = await Api.getMerchantMemberInvitationBuy(params)
        commit(types.MERCHANT_MEMBERS_INVITATION_BUY_DATA, data)
    },
    async findMerchantMemberInvitationBuyTotal ({ commit }, params) {
        const { data } = await Api.getMerchantMemberInvitationBuyTotal(params)
        commit(types.MERCHANT_MEMBERS_INVITATION_BUY_DATA_TOTAL, data)
    },
    async findMerchantMemberInvitationOrdersituation ({ commit }, params) {
        const { data } = await Api.getMerchantMemberInvitationOrdersituation(params)
        commit(types.MERCHANT_MEMBERS_INVITATION_ORDER_DATA, data)
        commit(types.MERCHANT_MEMBERS_INVITATION_ORDER_DATA_LIST_PAGINATION, {
            pageNumber: data.pages,
            pageSize: data.size,
            total: data.total
        })
    },
    async findMerchantMemberTotalsituation ({ commit }, params) {
        const { data } = await Api.getMerchantMemberTotalsituation(params)
        commit(types.MERCHANT_MEMBERS_TOTAL_DATA, data)
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
    async findCloudDeviceIDImportData ({ commit }, params) {
        const { data } = await Api.getCloudDeviceIDImportData(params)
        commit(cloud.CLOUD_DEVICE_ID_IMPORT, data.data)
        commit(cloud.CLOUD_DEVICE_ID_IMPORT_PAGINATION, {
            pageNumber: data.data.current,
            pageSize: data.data.size,
            total: data.data.total
        })
    },
    async findCloudBrandNo ({ commit }, params) {
        const { data } = await Api.getCloudDeviceBrandNo(params)
        commit(cloud.CLOUD_DEVICE_BRAND_NO, data.data)
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
    async findNetworkReport ({ commit }, params) {
        const { data } = await Api.getCloudNetworkReport(params)
        commit(cloud.CLOUD_NETWORK_REPORT, data.data)
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
    async findCloudNetworkDetailList ({ commit }, params) {
        const { data } = await Api.getCloudNetworkDetailList(params)
        commit(cloud.CLOUD_NETWORK_DETAIL_LIST, data.data.content)
        commit(cloud.CLOUD_NETWORK_DETAIL_PAGINATION, {
            pageNumber: data.data.number + 1,
            pageSize: data.data.size,
            total: data.data.totalElements
        })
    },
    async findCloudNetworkModeTypeList ({ commit }, params) {
        const { data } = await Api.getCloudNetworkModeTypeList(params)
        commit(cloud.CLOUD_NETWORK_MODE_TYPE_LIST, data.data)
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
    async getAdPopList ({ commit }, params) {
        const { data } = await Api.getAdPopList(params)
        commit(cloud.AD_POP_LIST, data.data.records)
        commit(cloud.AD_POP_PAGINATION, {
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
        commit(cloud.GET_CLOUD_MERCHANT_LIST, data.records)
        commit(cloud.CLOUD_MERCHANT_LIST_PAGINATION, {
            pageNumber: data.current,
            pageSize: data.size,
            total: data.total
        })
    },
    async findCloudMerchantDetailList ({ commit }, params) {
        const { data } = await Api.getCloudMerchantDetailList(params)
        commit(cloud.GET_CLOUD_MERCHANT_DETAIL_LIST, data.records)
        commit(cloud.GET_CLOUD_MERCHANT_DETAIL_LIST_PAGINATION, {
            pageNumber: data.current,
            pageSize: data.size,
            total: data.total
        })
    },
    async findCloudMerchantDetailStats ({ commit }, params) {
        const { data } = await Api.getCloudMerchantDetailStats(params)
        commit(cloud.GET_CLOUD_MERCHANT_DETAIL_STATS, data)
    },
    async findCloudMerchantCaseList ({ commit }, params) {
        const { data } = await Api.getCloudMerchantCaseList(params)
        commit(cloud.GET_CLOUD_MERCHANT_CASE_LIST, data)
    },
    async findCloudMerchantCaseDetailList ({ commit }, params) {
        const { data } = await Api.getCloudMerchantCaseDetailList(params)
        commit(cloud.GET_CLOUD_MERCHANT_CASE_DETAIL_LIST, data)
    },
    async findCloudMerchantFromPhone ({ commit }, params) {
        const { data } = await Api.getCloudMerchantFromPhone(params)
        commit(cloud.GET_CLOUD_MERCHANT_FROM_PHONE, data)
    },
    async getCloudMerchantAgentDetail ({ commit }, params) {
        const { data } = await Api.getCloudMerchantAgentDetail(params)
        commit(cloud.CLOUD_MERCHANT_AGENT_DETAIL, data)
    },
    async findCloudMerchantAdList ({ commit }, params) {
        const { data } = await Api.getCloudMerchantAdList(params)
        commit(cloud.GET_CLOUD_MERCHANT_AD_LIST, data.records)
        commit(cloud.GET_CLOUD_MERCHANT_AD_LIST_PAGINATION, {
            pageNumber: data.current,
            pageSize: data.size,
            total: data.total
        })
    },
    async getCloudMerchantAdDetail ({ commit }, params) {
        const { data } = await Api.getCloudMerchantAdDetail(params)
        commit(cloud.GET_CLOUD_MERCHANT_AD_DETAIL, data)
    },
    async findCloudMerchantAgentOrderDetail ({ commit }, params) {
        const { data } = await Api.getCloudMerchantAgentOrderDetail(params)
        commit(cloud.GET_CLOUD_MERCHANT_AGENCY_ORDER_DETAIL, data)
    },
    async findCloudMerchantOrderList ({ commit }, params) {
        const { data } = await Api.getCloudMerchantOrderList(params)
        commit(cloud.GET_CLOUD_MERCHANT_ORDER_LIST, data.records)
        commit(cloud.GET_CLOUD_MERCHANT_ORDER_LIST_PAGINATION, {
            pageNumber: data.current,
            pageSize: data.size,
            total: data.total
        })
    },
    async findCloudMerchantOrderDetail ({ commit }, params) {
        const { data } = await Api.getCloudMerchantOrderDetail(params)
        commit(cloud.GET_CLOUD_MERCHANT_ORDER_DETAIL, data)
    },
    async findCloudMerchantShopList ({ commit }, params) {
        const { data } = await Api.getCloudMerchantShopList(params)
        commit(cloud.GET_CLOUD_MERCHANT_SHOP_LIST, data.records)
        commit(cloud.GET_CLOUD_MERCHANT_SHOP_LIST_PAGINATION, {
            pageNumber: data.current,
            pageSize: data.size,
            total: data.total
        })
    },
    // async findCloudShopListCategory ({ commit }, params) {
    //     const { data } = await Api.getCloudShopListCategory(params)
    //     commit(cloud.GET_CLOUD_MERCHANT_AD_DETAIL, data.data)
    // },
    async findCloudMerchantShopCategoryList ({ commit }, params) {
        const { data } = await Api.getCloudMerchantShopCategoryList(params)
        commit(cloud.GET_CLOUD_MERCHANT_SHOP_CATEGORY_LIST, data)
    },
    async findCloudMerchantShopCategoryTypeList ({ commit }, params) {
        const { data } = await Api.getCloudMerchantShopCategoryTypeList(params)
        commit(cloud.GET_CLOUD_MERCHANT_SHOP_CATEGORY_TYPE_LIST, data)
    },
    async findCloudOutboundDeviceList ({ commit }, params) {
        const { data } = await Api.getCloudOutboundDeviceList(params)
        commit(cloud.GET_CLOUD_OUTBOUND_DEVICE_LIST, data.data)
    },
    async findCloudOutboundMerchantList ({ commit }, params) {
        const { data } = await Api.getCloudOutboundMerchantList(params)
        commit(cloud.GET_CLOUD_OUTBOUND_MERCHANT_LIST, data)
    },
    async findCloudOutboundCategoryList ({ commit }, params) {
        const { data } = await Api.getCloudOutboundCategoryList(params)
        commit(cloud.GET_CLOUD_OUTBOUND_CATEGORY_LIST, data.data)
    },
    async clearCloudOutboundDeviceList ({ commit }) {
        commit(cloud.GET_CLOUD_OUTBOUND_DEVICE_LIST, [])
    },
    async findCloudMerchantRecommendList ({ commit }, params) {
        const { data } = await Api.getCloudMerchantRecommendList(params)
        commit(cloud.GET_CLOUD_MERCHANT_RECOMMEND_LIST, data.records)
        commit(cloud.GET_CLOUD_MERCHANT_RECOMMEND_LIST_PAGINATION, {
            pageNumber: data.current,
            pageSize: data.size,
            total: data.total
        })
    },
    async findCloudMerchantClassifyList ({ commit }, params) {
        const { data } = await Api.getMerchantClassifyList(params)
        commit(cloud.GET_CLOUD_MERCHANT_CLASSIFY_LIST, data.records)
        commit(cloud.GET_CLOUD_MERCHANT_CLASSIFY_LIST_PAGINATION, {
            pageNumber: data.current,
            pageSize: data.size,
            total: data.total
        })
    },
    async findCloudMerchantProductOrderList ({ commit }, params) {
        const { data } = await Api.getCloudMerchantProductOrderList(params)
        commit(cloud.GET_CLOUD_MERCHANT_PRODUCT_ORDER_LIST, data.orderPageDatas.records)
        commit(cloud.GET_CLOUD_MERCHANT_PRODUCT_ORDER_LIST_PAGINATION, {
            pageNumber: data.orderPageDatas.current,
            pageSize: data.orderPageDatas.size,
            total: data.orderPageDatas.total
        })
        commit(cloud.GET_CLOUD_MERCHANT_PRODUCT_ORDER_TOTAL, data.orderTotal)
    },
    async findCloudMerchantProductOutOrderList ({ commit }, params) {
        const { data } = await Api.getCloudMerchantProductOutOrderList(params)
        console.log(data)
        commit(cloud.GET_CLOUD_MERCHANT_PRODUCT_OUT_ORDER_LIST, data)
        commit(cloud.GET_CLOUD_MERCHANT_PRODUCT_OUT_ORDER_LIST_PAGINATION, {
            pageNumber: data.current,
            pageSize: data.size,
            total: data.total
        })
    },
    async findCloudMerchantProductOrderDetail ({ commit }, params) {
        const { data } = await Api.getCloudMerchantProductOrderDetail(params)
        commit(cloud.GET_CLOUD_MERCHANT_PRODUCT_ORDER_DETAIL, data)
    },
    async findCloudMerchantProductOutOrderDetail ({ commit }, params) {
        const { data } = await Api.getCloudMerchantProductOutOrderDetail(params)
        commit(cloud.GET_CLOUD_MERCHANT_PRODUCT_OUT_ORDER_DETAIL, data)
    },
    async findMerchantMemberInvitationOutOrdersituation ({ commit }, params) {
        const { data } = await Api.getMerchantMemberInvitationOutOrdersituation(params)
        commit(cloud.MERCHANT_MEMBERS_INVITATION_OUT_ORDER_DATA, data)
    },
    async findMerchantMemberInvitationProject ({ commit }, params) {
        console.log(params)
        const { data } = await Api.getMerchantMemberInvitationProject(params)
        commit(cloud.MERCHANT_MEMBERS_INVITATION_PROJECT_DATA, data)
    },
    async findCloudMerchantTaglist ({ commit }, params) {
        const { data } = await Api.getCloudMerchantTaglist(params)
        for (let i = 0; i < data.length; i++) {
            let element = data[i]
            for (let j = 0; j < element.tagDetailBos.length; j++) {
                element.tagDetailBos[j] = element.tagDetailBos[j]['tagName']
            }
        }
        commit(cloud.GET_CLOUD_MERCHANT_TAG_LIST, data)
    },
    async findCloudMerchantMemberCommunicationList ({ commit }, params) {
        const { data } = await Api.getCloudMerchantMemberCommunicationList(params)

        commit(cloud.GET_CLOUD_MERCHANT_MEMBER_COMMUNICATION_LIST, data.records)
        commit(cloud.GET_CLOUD_MERCHANT_MEMBER_COMMUNICATION_LIST_PAGINATION, {
            pageNumber: data.current,
            pageSize: data.size,
            total: data.total
        })
    },
    async findCloudMerchantMemberDepartmentList ({ commit }, params) {
        const { data } = await Api.findMerchantDep(params)
        commit(cloud.GET_CLOUD_MERCHANT_MEMBER_DEPARTMENT_LIST, data)
    },
    async findCloudMerchantMaterialList ({ commit }, params) {
        const { data } = await Api.getMarktingMaterial(params)
        commit(cloud.GET_CLOUD_MERCHANT_MATERIAL_LIST, data)
    },
    async findCloudMerchanProjectSchemeList ({ commit }, params) {
        const { data } = await Api.getCloudMerchantProjectSchemeList(params)
        commit(cloud.GET_CLOUD_MERCHANT_PROJECT_SCHEME_LIST, data.records)
        commit(cloud.GET_CLOUD_MERCHANT_PROJECT_SCHEME_LIST_PAGINATION, {
            pageNumber: data.current,
            pageSize: data.size,
            total: data.total
        })
    },
    async findCloudMerchanProjectSchemeDetail ({ commit }, params) {
        const { data } = await Api.getCloudMerchantProjectSchemeDetail(params)
        commit(cloud.GET_CLOUD_MERCHANT_PROJECT_SCHEME_DETAIL, data)
    },
    async getBossCanUnbindDeviceList ({ commit }, params) {
        const { data } = await Api.getBossCanUnbindDeviceList(params)
        commit(cloud.GET_CLOUD_MERCHANT_CANUNBIND_DEVICE_LIST, data.data)
    },
    async getBossBindRecords ({ commit }, params) {
        const { data } = await Api.getBossBindRecords(params)
        commit(cloud.GET_CLOUD_MERCHANT_BIND_RECORDS, data.data)
    },
    async getComplaintOrderList ({ commit }, params) {
        const { data } = await Api.getComplaintOrderList(params)
        commit(cloud.GET_CLOUD_MERCHANT_COMPLAINT_ORDER_RECORDS, data)
    },
    async getComplaintOrderDetail ({ commit }, params) {
        const { data } = await Api.getComplaintOrderDetail(params)
        commit(cloud.GET_CLOUD_MERCHANT_COMPLAINT_ORDER_DETAIL, data)
    },
    async getComplaintProcessOrderList ({ commit }, params) {
        const { data } = await Api.getComplaintProcessOrderList(params)
        commit(cloud.GET_CLOUD_MERCHANT_COMPLAINT_PROCESS_ORDER_LIST, data)
    },
    async getComplaintProcessOrderDetail ({ commit }, params) {
        const { data } = await Api.getComplaintProcessOrderDetail(params)
        commit(cloud.GET_CLOUD_MERCHANT_COMPLAINT_PROCESS_ORDER_DETAIL, data)
    },
    async findCloudServiceMindList ({ commit }, params) {
        const { data } = await Api.getServiceRemindList(params)
        commit(cloud.GET_CLOUD_SERVICE_REMIND_LIST, data.data.records)
        commit(cloud.GET_CLOUD_SERVICE_REMIND_LIST_PAGINATION, {
            pageNumber: data.data.current,
            pageSize: data.data.size,
            total: data.data.total
        })
    },
    async getClouldControlProjectList ({ commit }, params) {
        const { data } = await Api.getControlProjectList(params)
        commit(cloud.GET_CLOUD_CONTROL_PROJECT_LIST, data)
    },
    async getClouldControlProjectDetail ({ commit }, params) {
        const { data } = await Api.getControlProjectDetail(params)
        commit(cloud.GET_CLOUD_CONTROL_PROJECT_DETAIL, data)
    },
    async getClouldControlProjectDevicesTypes ({ commit }, params) {
        const { data } = await Api.getControlProjectDevicesTypes(params)
        commit(cloud.GET_CLOUD_PROJECT_DEVICES_TYPES, data)
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}

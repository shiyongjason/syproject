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
    cloudSendMessageDetailChart: {}
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
    cloudHomeDetailDict: state => state.cloudHomeDetailDict,
    cloudAlarmChart: state => state.cloudAlarmChart,
    cloudSendMessageDetailChart: state => state.cloudSendMessageDetailChart

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
        console.log(payload)
        state.cloudSendMessageDetailChart = payload
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
        console.log(data)
        commit(cloud.CLOUD_HOME_COMFORT_SCENE_STATISTICS, data.data.comfortRunStats)
        return data.data.totalRunHours
    },
    async findCloudAlarmChart ({ commit }, params) {
        const { data } = await Api.getCloudAlarmChart(params)
        commit(cloud.CLOUD_ALARM_CHART, data.data)
    },
    async findCloudSendMessageDetailChart ({ commit }, params) {
        const { data } = await Api.getCloudSendMessageDetailChart(params)
        console.log(data)
        commit(cloud.CLOUD_SEND_MESSAGE_DETAIL_CHART, data.data)
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}

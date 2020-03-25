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
    cloudEquipmentErrorDict: [],
    cloudSmartPlayList: [],
    cloudSmartPlayPagination: {},
    cloudSmartPlayPostDetail: {}
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
    cloudEquipmentErrorDict: state => state.cloudEquipmentErrorDict,
    cloudSmartPlayList: state => state.cloudSmartPlayList,
    cloudSmartPlayPagination: state => state.cloudSmartPlayPagination,
    cloudSmartPlayPostDetail: state => state.cloudSmartPlayPostDetail
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
    [cloud.CLOUD_EQUIPMENT_ERROR_DICT] (state, payload) {
        state.cloudEquipmentErrorDict = payload
    },
    [cloud.CLOUD_SMART_PLAY_LIST] (state, payload) {
        state.cloudSmartPlayList = payload
    },
    [cloud.CLOUD_SMART_PLAY_PAGINATION] (state, payload) {
        state.cloudSmartPlayPagination = payload
    },
    [cloud.CLOUD_SMART_PLAY_POST_DETAIL] (state, payload) {
        state.cloudSmartPlayPostDetail = payload
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
        commit(cloud.CLOUD_ALARM_LIST, data.data)
        commit(cloud.CLOUD_ALARM_PAGINATION, {
            pageNumber: data.current,
            pageSize: data.size,
            total: data.total
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
    async findCloudEquipmentErrorDict ({ commit }, params) {
        const { data } = await Api.getCloudEquipmentErrorDict(params)
        commit(cloud.CLOUD_EQUIPMENT_ERROR_DICT, data.data)
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
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}

import axios from 'axios'
import { iotUrl, mockUrl } from '@/api/config'

// 家庭概况
export function findHomeGeneralSituation (params) {
    return axios.get(iotUrl + `/api/home-manage/general-situation`, { params })
}

// 房屋详情
export function findHomeGeneralDetails (homeId) {
    return axios.get(iotUrl + `/api/home-detail/${homeId}`)
}
// 房屋详情
export function findHomeUserList (homeId) {
    return axios.get(iotUrl + `/api/home/users/${homeId}`)
}

// 用户实时统计数据
export const getRealreport = (params) => {
    return axios.get(iotUrl + '/uc/user/statistics/real/report', { params })
}
// 历史统计
export const getHostoryreport = (params) => {
    return axios.get(iotUrl + '/uc/user/statistics/history/report', { params })
}
// 房间列表详情
export function findRoomDetail (homeId) {
    return axios.get(iotUrl + `/api/home-manage/room-detail/${homeId}`)
}

// 会员概览
export function getMembersituation (params) {
    return axios.get(iotUrl + `/uc/user-manage/general-situation`, { params })
}
export function getMemberDetail (params) {
    return axios.get(iotUrl + `/uc/user-manage/login-detail`, { params })
}
export function getFamilyDetail (params) {
    return axios.get(iotUrl + `/uc/user-manage/home-info/${params}`)
}

// 活动管理
export function saveActdetail (params) {
    return axios.post(iotUrl + `/api/activity-center`, params)
}

export function editActdetail (params) {
    return axios.put(iotUrl + `/api/activity-center`, params)
}

export function getActdetail (params) {
    return axios.get(iotUrl + `/api/activity-center/${params}`)
}

export function deleteActivity (params) {
    return axios.delete(iotUrl + `/api/activity-center/${params}`)
}

export function getCloudActlist (params) {
    return axios.get(iotUrl + `/api/activity-center`, { params })
}
// 告警监控列表
export function getCloudAlarmList (params) {
    return axios.get(mockUrl + `/alarm.json`, { params })
}
// 设备故障列表
export function getCloudEquipmentErrorList (params) {
    return axios.get(mockUrl + `/equipmentError.json`, { params })
}
export function getCloudEquipmentErrorDict (params) {
    return axios.get(mockUrl + `/dictEquipmentError.json`, { params })
}

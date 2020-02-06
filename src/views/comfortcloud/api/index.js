import axios from 'axios'
import { iotUrl } from '@/api/config'

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
// 房间列表详情
export function findRoomDetail (homeId) {
    return axios.get(iotUrl + `/api/home-manage/room-detail/${homeId}`)
}

// 会员概览

export function getMembersituation (params) {
    return axios.get(iotUrl + `/uc/user-manage/general-situation`, { params })
}
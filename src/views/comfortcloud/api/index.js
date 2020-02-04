import axios from 'axios'
import { iotUrl } from '@/api/config'

// 家庭概况
export function findHomeGeneralSituation (params) {
    return axios.get(iotUrl + `/api/home-manage/general-situation`, { params })
}

// 家庭详情
export function findHomeGeneralDetails (homeId) {
    return axios.get(iotUrl + `/api/home-detail/${homeId}`)
}
// 家庭详情
export function findHomePopulationDetails (homeId) {
    return axios.get(iotUrl + `/api/home/users/${homeId}`)
}

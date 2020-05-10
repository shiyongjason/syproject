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
// 设备故障列表
export function getCloudEquipmentErrorList (params) {
    return axios.get(iotUrl + `/api/device/breakdown`, { params })
}
// 下载故障模板
export function downloadEquipmentErrorList () {
    axios.defaults.responseType = 'blob'
    axios.get(iotUrl + `/api/device/breakdown/download-template`).then(function (response) {
        try {
            const reader = new FileReader()
            reader.readAsDataURL(response.data)
            reader.onload = function (e) {
                const a = document.createElement('a')
                a.download = '故障模板.xlsx'
                a.href = e.target.result
                document.querySelector('body').appendChild(a)
                a.click()
                document.querySelector('body').removeChild(a)
            }
            axios.defaults.responseType = 'json'
        } catch (e) {
            axios.defaults.responseType = 'json'
        }
    }).catch(function () {
        axios.defaults.responseType = 'json'
    })
}
// 设备故障字典
export function getCloudDict (params) {
    return axios.get(iotUrl + `/uc/dictionary/search-by-item`, { params })
}
// 设备故障修改
export function updateCloudEquipment (params) {
    return axios.put(iotUrl + `/api/device/breakdown`, params)
}
// 设备故障删除
export function deleteCloudEquipment (params) {
    return axios.delete(iotUrl + `/api/device/breakdown`, { params })
}
// 智能玩法分页查询
export function getCloudSmartPlayList (params) {
    return axios.get(iotUrl + `/api/intelligence-play`, { params })
}
// 新增智能玩法
export function createCloudSmartPlay (params) {
    return axios.post(iotUrl + `/api/intelligence-play`, params)
}
// 编辑智能玩法
export function updateCloudSmartPlay (params) {
    return axios.put(iotUrl + `/api/intelligence-play`, params)
}
// 删除智能玩法
export function deleteCloudSmartPlay (params) {
    return axios.delete(iotUrl + `/api/intelligence-play`, { params })
}
// 智能玩法详情
export function getCloudSmartPlayDetail (id) {
    return axios.get(iotUrl + `/api/intelligence-play/detail/${id}`)
}
// 消息推送列表
export function getCloudSendMessageList (params) {
    return axios.get(iotUrl + `/api/push-message`, { params })
}
// 消息推送创建
export function createCloudSendMessage (params) {
    return axios.post(iotUrl + `/api/push-message`, params)
}
// 消息推送更新
export function updateCloudSendMessage (params) {
    return axios.put(iotUrl + `/api/push-message`, params)
}
// 消息推送删除
export function deleteCloudSendMessage (params) {
    return axios.delete(iotUrl + `/api/push-message`, { params })
}
// 消息推送内容详情
export function getCloudSendMessagePostDetail (id) {
    return axios.get(iotUrl + `/api/push-message/${id}`)
}
// 告警监控列表
export function getCloudAlarmList (params) {
    return axios.get(iotUrl + `/api/device/upline-downline-alarm`, { params })
}
// 告警监控列表导出
export function downloadCloudAlarmList (params) {
    axios.defaults.responseType = 'blob'
    axios.get(iotUrl + `/api/device/upline-downline-alarm/export`, { params }).then(function (response) {
        try {
            const reader = new FileReader()
            reader.readAsDataURL(response.data)
            reader.onload = function (e) {
                const a = document.createElement('a')
                a.download = '告警监控.xlsx'
                a.href = e.target.result
                document.querySelector('body').appendChild(a)
                a.click()
                document.querySelector('body').removeChild(a)
            }
            axios.defaults.responseType = 'json'
        } catch (e) {
            axios.defaults.responseType = 'json'
        }
    }).catch(function () {
        axios.defaults.responseType = 'json'
    })
}
// 智能设备折线
export function getCloudHistoryReport (params) {
    return axios.get(iotUrl + `/api/device/statistics/history/report`, { params })
}

export function getCloudRuntimeReport (params) {
    return axios.get(iotUrl + `/api/device/statistics/run-time/history/report`, { params })
}
export function getCloudDeviceCount (params) {
    return axios.get(iotUrl + `/api/device/statistics/count`, { params })
}
export function getCloudDeviceDetailList (params) {
    return axios.get(iotUrl + `/api/device/statistics/details`, { params })
}
export function getCloudHomeDetailList (params) {
    return axios.get(iotUrl + `/api/device/statistics/home/details`, { params })
}
export function getCloudHomeDetailSearchDict (params) {
    return axios.get(iotUrl + `/api/device/statistics/species`, { params })
}
// 家庭明细分页查询
export function getCloudHomeComfortReportList (params) {
    return axios.get(iotUrl + `/api/statistics/comfort/report`, { params })
}
// 舒适度场景统计报表
export function getCloudHomeComfortStatisticsList (params) {
    return axios.get(iotUrl + `/api/statistics/comfort/statistics`, { params })
}
// 告警监控图表
export function getCloudAlarmChart (params) {
    return axios.get(iotUrl + `/api/device/upline-downline-alarm/alarm-analysis`, { params })
}
// 消息推送 效果
export function getCloudSendMessageDetailChart (params) {
    return axios.get(iotUrl + `/api//push-message/result/${params.id}`)
}

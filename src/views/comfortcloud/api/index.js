import axios from 'axios'
import { iotUrl } from '@/api/config'
import qs from 'qs'

// 家庭概况
export function findHomeGeneralSituation (params) {
    return axios.get(iotUrl + `/api/home-manage/general-situation`, { params })
}
// 家庭概况
export function findEffectiveHome (params) {
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

// 知识库管理目录
export function getCatalogueList (params) {
    return axios.get(iotUrl + `/api/helpCenter/getAllType`)
}

// 问题列表
export function getQuestionList (params) {
    return axios.get(iotUrl + `/api/helpCenter/search-page`, { params })
}

// 问题删除
export function delQuestion (params) {
    console.log(params)
    return axios.delete(iotUrl + `/api/helpCenter?ids=${params}`)
}

// 问题保存
export function saveQuestion (params) {
    console.log(params)
    return axios.post(iotUrl + `/api/helpCenter`, params)
}

// 问题详情
export function getQuestionDetail (params) {
    return axios.get(iotUrl + `/api/helpCenter/get/${params}`)
}

// 下载问题模板
export function downloadQuestionTemp () {
    axios.defaults.responseType = 'blob'
    axios.get(iotUrl + `/api/helpCenter/download-template`).then(function (response) {
        try {
            const reader = new FileReader()
            reader.readAsDataURL(response.data)
            reader.onload = function (e) {
                const a = document.createElement('a')
                a.download = '帮助中心模板.xlsx'
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
    return axios.get(iotUrl + `/api/push-message/result/${params.id}`)
}
// 用户反馈列表
export function getCloudUserFeedback (params) {
    return axios.get(iotUrl + `/uc/user/feedback-page`, { params })
}
// 舒适小百科列表 boss端
export function getComfortEncyclopediaList (params) {
    return axios.get(iotUrl + `/api/comfy-encyclopedia/boss`, { params })
}
// 舒适小百科详情
export function getComfortEncyclopediaDetail (articleId) {
    return axios.get(iotUrl + `/api/comfy-encyclopedia/${articleId}`)
}
// boss端新增一条舒适百科
export function createCloudComfortEncyclopedia (params) {
    return axios.post(iotUrl + `/api/comfy-encyclopedia/boss`, params)
}
// boss端编辑一条舒适百科
export function updateCloudComfortEncyclopedia (params) {
    return axios.put(iotUrl + `/api/comfy-encyclopedia/boss`, params)
}
// boss端删除一条舒适百科
export function deleteCloudComfortEncyclopedia (params) {
    return axios.delete(iotUrl + `/api/comfy-encyclopedia/boss`, { data: params })
}
// 设备统计 空调
export function getDeviceAirDetail (params) {
    return axios.get(iotUrl + `/api/device/statistics/home/air/details`, { params })
}
// 设备统计 地暖
export function getDeviceFloorHeartDetail (params) {
    return axios.get(iotUrl + `/api/device/statistics/home/floor-heart/details`, { params })
}
// 设备统计 智能温控阀
export function getDeviceTempCtlValveDetail (params) {
    return axios.get(iotUrl + `/api/device/statistics/home/temp-ctl-valve/details`, { params })
}
// 出库管理分页
export function getOutboundList (params) {
    return axios.get(iotUrl + `/api/outbound`, { params })
}
// 删除出库管理
export function deleteOutboundList (params) {
    return axios.delete(iotUrl + `/api/outbound`, { params })
}
// 出库管理导出
export function downloadOutboundList (params) {
    axios.defaults.responseType = 'blob'
    axios.get(iotUrl + `/api/outbound/export`, { params }).then(function (response) {
        try {
            const reader = new FileReader()
            reader.readAsDataURL(response.data)
            reader.onload = function (e) {
                const a = document.createElement('a')
                a.download = '出库管理.xlsx'
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
// 闪屏页页面分页查询
export function getSplashScreenList (params) {
    return axios.get(iotUrl + `/api/splash-screen`, { params })
}
// 闪屏删除
export function deleteSplashScreen (params) {
    return axios.delete(iotUrl + `/api/splash-screen`, { params })
}
// 设置生效失效状态
export function setSplashScreenStatus (params) {
    return axios.put(iotUrl + `/api/splash-screen/status?${qs.stringify(params)}`)
}
// 新增闪屏页
export function createSplashScreen (params) {
    return axios.post(iotUrl + `/api/splash-screen`, params)
}
// 编辑闪屏页
export function updateSplashScreen (params) {
    return axios.put(iotUrl + `/api/splash-screen`, params)
}
// 查询所有活动
export function getAllActivity (params) {
    return axios.get(iotUrl + `/api/activity-center/all`, { params })
}
// 闪屏详情
export function getSplashScreenDetail (id) {
    return axios.get(iotUrl + `/api/splash-screen/detail/${id}`)
}
// 获取呼叫记录
export function getCustomerService (params) {
    return axios.get(iotUrl + `/api/customer-service`, { params })
}
// 根据homeId获取家庭概况
export function getHomeDetail (params) {
    return axios.get(iotUrl + `/api/home-manage/${params}`)
}
// 根据item查询字典
export function getDictionary (params) {
    return axios.get(iotUrl + `/uc/dictionary/search-by-item`, { params })
}

export function getCloudHomeModeTypeList (params) {
    return axios.get(iotUrl + '/api/device/statistics/mode-type-list', { params })
}

export function getServiceManageHistoryList (params) {
    return axios.get(iotUrl + '/api/customer-service/service-order', { params })
}

// 获取招商代理商列表
export function getCloudMerchantList (params) {
    return axios.get(iotUrl + '/api/boss/agent-sign/page', { params })
}

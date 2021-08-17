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

// 经销商会员列表分页查询
export function getMerchantMembersituation (params) {
    return axios.post(iotUrl + `/mall/boss/user/manage`, params)
}

// 销售线索管理会员列表分页查询
export function getMerchantExernalMembersituation (params) {
    return axios.post(iotUrl + `/mall/boss/out-member`, params)
}

// 删除第三方销售线索数据
export function deleteThirdExernalMembersituation (phone) {
    return axios.delete(iotUrl + `/mall/boss/out-member/third/${phone}`)
}

// 奖励管理
export function merchantReward (params) {
    return axios.get(iotUrl + `/mall/boss/wx/reward/manage`, { params })
}

// 活动管理
export function merchantActive (params) {
    return axios.get(iotUrl + `/mall/boss/shop-activity`, { params })
}

// 经销商分销员列表
export function getMerchantMembersDistributor (params) {
    return axios.get(iotUrl + `/mall/boss/distributor`, { params })
}

// 经销商会员邀请注册列表分页查询
export function getMerchantMemberInvitationRegistersituation (params) {
    return axios.get(iotUrl + `/mall/boss/user/registered/` + params.uuid, { params })
}

// 经销商会员企业信息
export function getMerchantMemberEnterpriseInfo (params) {
    return axios.get(iotUrl + `/mall/boss/company/info/` + params)
}

// 经销商会员邀请注册列表分页查询
export function getMerchantMemberInvitationChangesituation (params) {
    return axios.get(iotUrl + `/mall/boss/user/` + params)
}// 经销商会员邀请注册列表分页查询
export function getMerchantCompanyEmployee (params) {
    console.log(params)
    return axios.get(iotUrl + `/mall/boss/company/company-members/` + params)
}

// 经销商会员购买记录
export function getMerchantMemberInvitationBuy (params) {
    return axios.get(iotUrl + `/mall/boss/user/order/`, { params })
}

// 经销商会员购买记录
export function getMerchantMemberInvitationBuyTotal (params) {
    return axios.get(iotUrl + `/mall/boss/user/order-total/`, { params })
}

// 经销商会员邀请成交列表分页查询
export function getMerchantMemberInvitationOrdersituation (params) {
    return axios.get(iotUrl + `/mall/boss/user/order/` + params.uuid, { params })
}

// 经销商会员总数查询
export function getMerchantMemberTotalsituation (params) {
    return axios.post(iotUrl + `/mall/boss/user/count`, params)
}

// 邀请详情订单修改
export function updateInvitationDetail (params) {
    return axios.put(iotUrl + `/mall/boss/wx/reward`, params)
}

// 奖励发放
export function sendReward (params) {
    return axios.post(iotUrl + `/mall/boss/wx/reward/send`, params)
}

// 修改推荐人
export function recommendChange (params) {
    return axios.put(iotUrl + `/mall/boss/user/change-invite-user`, params)
}

// 修改销售顾问
export function salerChange (params) {
    return axios.post(iotUrl + `/mall/boss/out-order/order-saler`, params)
}

// 修改企业信息备注
export function updateCompanyInfo (params) {
    return axios.post(iotUrl + `/mall/boss/company`, params)
}

// 分销员审核订单修改
export function updateDistribution (params) {
    return axios.post(iotUrl + `/mall/boss/distributor`, params)
}

// 邀请订单删除
export function delInvitationOrder (params) {
    console.log(params)
    return axios.delete(iotUrl + `/mall/boss/wx/reward/` + params.id, { params })
}

// 生效失效活动
export function checkActiveStatus (params) {
    console.log(params)
    return axios.put(iotUrl + `/mall/boss/shop-activity`, params)
}

// 审核活动
export function operationActiveStatus (params) {
    console.log(params)
    return axios.put(iotUrl + `/mall/boss/shop-activity/status`, params)
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
                a.download = '订单明细模板.xlsx'
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
}// 设备故障列表
export function getCloudDeviceIDImportData (params) {
    return axios.get(iotUrl + `/api/user/device/page`, { params })
}
export function getCloudDeviceBrandNo (params) {
    return axios.get(iotUrl + `/api//user/device/batch-nos`)
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
// 下载
export function downloadEquipmentIDImportList () {
    axios.defaults.responseType = 'blob'
    axios.get(iotUrl + `/api/user/device/download-template`).then(function (response) {
        try {
            const reader = new FileReader()
            reader.readAsDataURL(response.data)
            reader.onload = function (e) {
                const a = document.createElement('a')
                a.download = '设备入库模板.xlsx'
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
// 下载导入数据失败列表
export function downloadImportDeviceErrorList (params) {
    axios.defaults.responseType = 'blob'
    axios.post(iotUrl + `/api/user/device/download-failed-devices`, params).then(function (response) {
        try {
            const reader = new FileReader()
            reader.readAsDataURL(response.data)
            reader.onload = function (e) {
                const a = document.createElement('a')
                a.download = '设备入库模板.xlsx'
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

export function getCloudNetworkReport (params) {
    return axios.get(iotUrl + `/api/device/network/boss/history/report`, { params })
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

export function getCloudNetworkDetailList (params) {
    return axios.get(iotUrl + `/api/device/network/boss/details`, { params })
}

export function getCloudNetworkModeTypeList (params) {
    return axios.get(iotUrl + `/api/device/network/species`, { params })
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

// 弹窗广告分页查询
export function getAdPopList (params) {
    return axios.get(iotUrl + `/api/pop-up`, { params })
}

// 闪屏删除
export function deleteSplashScreen (params) {
    return axios.delete(iotUrl + `/api/splash-screen`, { params })
}

// 弹窗广告删除
export function deleteAdPop (params) {
    return axios.delete(iotUrl + `/api/pop-up`, { params })
}

// 设置闪屏生效失效状态
export function setSplashScreenStatus (params) {
    return axios.put(iotUrl + `/api/splash-screen/status?${qs.stringify(params)}`)
}

// 设置弹窗广告生效失效状态
export function setAdPopStatus (params) {
    return axios.put(iotUrl + `/api/pop-up/status?${qs.stringify(params)}`)
}

// 新增闪屏页
export function createSplashScreen (params) {
    return axios.post(iotUrl + `/api/splash-screen`, params)
}

// 新增弹窗广告
export function createAdPop (params) {
    return axios.post(iotUrl + `/api/pop-up`, params)
}

// 编辑闪屏页
export function updateSplashScreen (params) {
    return axios.put(iotUrl + `/api/splash-screen`, params)
}

// 编辑弹窗广告
export function updateAdpop (params) {
    return axios.put(iotUrl + `/api/pop-up`, params)
}

// 闪屏详情
export function getSplashScreenDetail (id) {
    return axios.get(iotUrl + `/api/splash-screen/detail/${id}`)
}

// 弹窗广告详情
export function getAdPopDetail (id) {
    return axios.get(iotUrl + `/api/pop-up/detail/${id}`)
}

// 查询所有活动
export function getAllActivity (params) {
    return axios.get(iotUrl + `/api/activity-center/all`, { params })
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

export function getCloudDeviceDetail (params) {
    return axios.get(iotUrl + '/api/device/statistics/device/specific/details', { params })
}

export function getCloudSubDeviceDetail (params) {
    return axios.get(iotUrl + '/api/device/statistics/subDevice/specific/details', { params })
}

// 获取房屋信息(判断房屋是否被删除)
export function getHomeUser (params) {
    return axios.get(iotUrl + '/api/home-manage/home-user', { params })
}

// 获取招商代理商列表
export function getCloudMerchantList (params) {
    return axios.get(iotUrl + '/mall/boss/agent-sign', { params })
}

// 代理商代理详情
export function getCloudMerchantDetailList (params) {
    return axios.get(iotUrl + '/mall/boss/agent-sign/sign-detail', { params })
}

// 获取代理商详情统计
export function getCloudMerchantDetailStats (params) {
    return axios.get(iotUrl + '/mall/boss/agent-sign/sign-detail/statistics', { params })
}

// 获取用户方案
export function getCloudMerchantCaseList (params) {
    return axios.get(iotUrl + '/mall/boss/customer-project', { params })
}
// 获取用户方案详情
export function getCloudMerchantCaseDetailList (params) {
    return axios.get(iotUrl + '/mall/boss/customer-project/' + params.id)
}
// 获取招商代理商
export function getCloudMerchantFromPhone (params) {
    return axios.get(iotUrl + '/mall/boss/company/info-by-phone', { params })
}

// 获取招商代理商统计数据
export function getCloudMerchantStatistics (params) {
    return axios.get(iotUrl + '/mall/boss/agent-sign/count', { params })
}

// 获取招商代理订单详情
export function getCloudMerchantAgentDetail (params) {
    return axios.get(iotUrl + '/mall/boss/agent-sign/' + params.id)
}

// 获取代理商提货进度
export function getCloudMerchantAgentProgress (params) {
    return axios.get(iotUrl + '/mall/boss/agent-sign/pick-goods/' + params.id)
}

// 获取招商广告列表
export function getCloudMerchantAdList (params) {
    return axios.get(iotUrl + '/mall/boss/merchants-advertising/page', { params })
}

// 删除招商广告
export function deleteCloudMerchantAd (params) {
    return axios.put(iotUrl + '/mall/boss/merchants-advertising/' + params)
}

// 获取招商广告详情
export function getCloudMerchantAdDetail (params) {
    return axios.get(iotUrl + '/mall/boss/merchants-advertising/' + params)
}

// 获取招商广告详情
export function getCloudMerchantAgentOrderDetail (params) {
    return axios.get(iotUrl + '/mall/boss/agent-sign/manual-agent/edit-info', { params })
}

// 删除招商订单
export function deleteCloudMerchantAgentOrderDetail (params) {
    return axios.delete(iotUrl + '/mall/boss/agent-sign/manual-agent', { params })
}

// 招商广告保存
export function saveCloudMerchantAd (params) {
    return axios.post(iotUrl + '/mall/boss/merchants-advertising', params)
}

// 代理订单保存
export function saveManualAgent (params) {
    if (params.agentCode) { return axios.put(iotUrl + '/mall/boss/agent-sign/manual-agent', params) } else { return axios.post(iotUrl + '/mall/boss/agent-sign/manual-agent', params) }
}

// 招商订单列表
export function getCloudMerchantOrderList (params) {
    return axios.get(iotUrl + '/mall/boss/agent-sign/sign-order-page', { params })
}

// 招商订单详情
export function getCloudMerchantOrderDetail (params) {
    return axios.get(iotUrl + '/mall/boss/agent-sign/agent-detail', { params })
}

// 获取招商代理品类列表
export function getCloudMerchantCategory () {
    return axios.get(iotUrl + '/mall/boss/category/all')
}

// 商品列表
export function getCloudMerchantShopList (params) {
    return axios.get(iotUrl + '/mall/boss/product', { params })
}

// 新增小程序商品列表
export function createShop (params) {
    return axios.post(iotUrl + `/mall/boss/product`, params)
}

// 更新小程序商品列表
export function updateShop (params) {
    return axios.put(iotUrl + `/mall/boss/product`, params)
}

// 获取小程序商品品类
export function getCloudMerchantShopCategoryList () {
    return axios.get(iotUrl + '/mall/boss/category/all')
}

// 获取小程序商品品类
export function getCloudMerchantShopCategoryTypeList (params) {
    return axios.get(iotUrl + '/mall/boss/specification/of-category', { params })
}

// 获取小程序商品详情
export function getCloudMerchantShopDetail (params) {
    return axios.get(iotUrl + '/mall/boss/product/detail', { params })
}

// 商品上下架
export function updateStatusShop (params) {
    return axios.put(iotUrl + `/mall/boss/product/status`, params)
}

// 获取出库管理设备型号
export function getCloudOutboundDeviceList (params) {
    return axios.get(iotUrl + '/api/outbound/device/name/' + params.categoryId)
}

// 获取出库管理 经销商列表
export function getCloudOutboundMerchantList (params) {
    return axios.get(iotUrl + '/mall/boss/agent-sign/list/' + params.name)
}

// 获取出库管理品类列表
export function getCloudOutboundCategoryList () {
    return axios.get(iotUrl + '/api/outbound/device/category')
}

// 新增出库
export function addCloudOutbound (params) {
    return axios.post(iotUrl + '/api/outbound', params)
}

// 修改出库类型
export function changeCloudOutbound (params) {
    return axios.put(iotUrl + '/api/outbound', params)
}

// 获取推荐榜单列表
export function getCloudMerchantRecommendList (params) {
    return axios.get(iotUrl + '/mall/boss/recommend-list', { params })
}

// 添加推荐榜单
export function addCloudMerchantRecommend (params) {
    return axios.post(iotUrl + '/mall/boss/recommend-list', params)
}

// 删除推荐榜单
export function deleteCloudMerchantRecommend (params) {
    return axios.delete(iotUrl + '/mall/boss/recommend-list', { data: params })
}

// 修改推荐榜单
export function changeCloudMerchantRecommend (params) {
    return axios.put(iotUrl + '/mall/boss/recommend-list', params)
}

// 移动推荐榜单
export function moveCloudMerchantRecommend (params) {
    return axios.put(iotUrl + '/mall/boss/recommend-list/move', params)
}

// 修改分销员姓名
export function editDistributorName (params) {
    return axios.post(iotUrl + '/mall/boss/distributor/name', params)
}

// 获取主营产品分类
export function getMerchantClassifyList (params) {
    return axios.get(iotUrl + '/mall/boss/main-product', { params })
}

// 编辑主营产品分类
export function editMerchantClassifyList (params) {
    return axios.put(iotUrl + '/mall/boss/main-product', params)
}

// 增加主营产品分类
export function addMerchantClassifyList (params) {
    return axios.post(iotUrl + '/mall/boss/main-product', params)
}

// 删除主营产品分类
export function deleteMerchantClassifyList (params) {
    return axios.delete(iotUrl + '/mall/boss/main-product', { data: params })
}

// 获取主营产品某个分类对应的商品名称
export function getMerchantClassifyOfCategoryList (params) {
    return axios.get(iotUrl + '/mall/boss/main-product/products-of-category', { params })
}

// 根据商品名称模糊查询商品列表
export function getLikeMerchantList (params) {
    return axios.get(iotUrl + '/mall/boss/product/products-like-name', { params })
}

// 获取微信订单列表
export function getCloudMerchantProductOrderList (params) {
    return axios.get(iotUrl + '/mall/boss/order', { params })
}

// 添加订单
export function addCloudMerchantProductOrder (params) {
    return axios.post(iotUrl + '/mall/boss/order/add', params)
}

// 获取微信订单列表
export function getCloudMerchantProductOutOrderList (params) {
    return axios.get(iotUrl + '/mall/boss/out-order/page', { params })
}

// 获取微信订单详情
export function getCloudMerchantProductOutOrderDetail (params) {
    return axios.get(iotUrl + '/mall/boss/out-order/' + params.orderNo)
}

// 获取外部订单详情
export function getCloudMerchantProductOrderDetail (params) {
    return axios.get(iotUrl + '/mall/boss/order/detail/' + params.orderId, { params: { source: params.source } })
}

// 获取抢购活动信息
export function getMerchantPurchase (params) {
    return axios.get(iotUrl + '/mall/boss/seckill-activity', { params })
}

// 新建抢购活动
export function createMerchantPurchase (params) {
    return axios.post(iotUrl + '/mall/boss/seckill-activity', params)
}

// 获取某个抢购活动信息
export function getMerchantPurchaseDetail (params) {
    return axios.get(iotUrl + '/mall/boss/seckill-activity/' + params.id)
}

// 失效某个抢购活动
export function disableMerchantPurchase (params) {
    return axios.put(iotUrl + '/mall/boss/seckill-activity', params)
}

// 标签接口
export function getCloudMerchantTaglist () {
    return axios.get(iotUrl + '/mall/boss/tag/all')
}

// 新增标签
export function addCloudMerchantTag (params) {
    return axios.post(iotUrl + '/mall/boss/tag', params)
}

// 修改标签
export function modifyCloudMerchantTag (params) {
    return axios.put(iotUrl + '/mall/boss/tag', params)
}

// 删除标签
export function deleteCloudMerchantTag (params) {
    return axios.delete(iotUrl + '/mall/boss/tag', { data: params })
}

// 给用户新增标签
export function addMemberTag (params) {
    return axios.post(iotUrl + '/mall/boss/user-tag', params)
}

// 编辑用户标签
export function editMemberTag (params) {
    return axios.put(iotUrl + '/mall/boss/user-tag', params)
}

// 获取销售线索管理购买记录
export function getMerchantMemberInvitationOutOrdersituation (params) {
    return axios.get(iotUrl + '/mall/boss/user/out/order', { params })
}// 获取销售线索管理购买记录
export function getMerchantMemberInvitationProject (params) {
    return axios.get(iotUrl + '/mall/boss/hbp/projects', { params })
}

// 获取销售线索管理购买记录统计
export function getMerchantMemberInvitationOutOrdersTotal (params) {
    return axios.get(iotUrl + '/mall/boss/user/out/order-total', { params })
}

// 按会员标签新增商品匹配关系
export function addMerchantClassifyByTag (params) {
    return axios.post(iotUrl + '/mall/boss/main-product/tag-product', params)
}

// 按会员标签修改商品匹配关系
export function modifyMerchantClassifyByTag (params) {
    return axios.put(iotUrl + '/mall/boss/main-product/tag-product', params)
}

// 删除会员标签和商品匹配关系
export function deleteMerchantClassifyByTag (params) {
    return axios.delete(iotUrl + '/mall/boss/main-product/tag-product/' + params.batchNo + '/' + params.operator)
}

// 获取会员标签和商品匹配关系
export function getMerchantClassifyByTag (params) {
    return axios.get(iotUrl + '/mall/boss/main-product/tag-edit-info', { params })
}

// 获取沟通记录列表
export function getCloudMerchantMemberCommunicationList (params) {
    return axios.get(iotUrl + '/mall/boss/member-communication', { params })
}

// 新增沟通记录
export function postCloudMerchantMemberCommunication (params) {
    return axios.post(iotUrl + '/mall/boss/member-communication', params)
}

// 修改沟通记录
export function modifyCloudMerchantMemberCommunication (params) {
    return axios.put(iotUrl + '/mall/boss/member-communication', params)
}

// 删除沟通记录
export function deleteCloudMerchantMemberCommunication (params) {
    return axios.delete(iotUrl + '/mall/boss/member-communication', { data: params })
}

// 获取bi看板数据token
export const findBiToken = (params) => axios.get('/rms/bi/ali/token', { params })

// 分销员报价单开关
export const changeQuotationPermission = (params) => axios.put(iotUrl + '/mall/boss/distributor/quotation_permission', params)

// 删除外部订单
export const deleteThirdOrder = params => axios.delete(iotUrl + '/mall/boss/order/third/' + params.orderId)

// 获取营销物料列表
export const getMarktingMaterial = params => axios.get(iotUrl + '/mall/boss/marketing-material', { params })

// 获取营销物料详情
export const getMarktingMaterialDetail = params => axios.get(iotUrl + '/mall/boss/marketing-material/' + params.materialId)

// 获取待发货的营销物料列表
export const getToDispatchList = params => axios.get(iotUrl + '/mall/boss/delivery-order/product-options', { params })

// 新增修改营销物料
export const addMarktingMaterial = params => axios.post(iotUrl + '/mall/boss/marketing-material', params)

// 删除营销物料
export const deleteMarktingMaterial = params => axios.delete(iotUrl + '/mall/boss/marketing-material/' + params.materialId)

// 营销物料发货单
export const addDispatchOrder = params => axios.post(iotUrl + '/mall/boss/delivery-order', params)

// 物料回收
export const recycleMaterial = params => axios.put(iotUrl + '/mall/boss/marketing-material/recycle', params)

// 获取分部列表
export const findMerchantDep = (params) => axios.get(`/uaa/department/general/${params.pkDeptDoc}/${params.deptType}/${params.jobNumber}/${params.authCode}`)

// 获取工程方案列表
export const getCloudMerchantProjectSchemeList = params => axios.get(iotUrl + '/mall/boss/project-scheme', { params })

// 获取工程方案详情
export const getCloudMerchantProjectSchemeDetail = params => axios.get(iotUrl + '/mall/boss/project-scheme/' + params.id)

// 新增修改工程方案
export const addCloudMerchantProjectScheme = params => axios.post(iotUrl + '/mall/boss/project-scheme', params)

// 删除工程方案
export const deleteProjectScheme = params => axios.delete(iotUrl + '/mall/boss/project-scheme/' + params.id)

// 获取boss端可解绑设备列表
export const getBossCanUnbindDeviceList = params => axios.get(iotUrl + '/api/boss/device-unbind', { params })
// 获取boss端解绑设备记录
export const getBossBindRecords = params => axios.get(iotUrl + '/api/boss/device-unbind/record', { params })
// boss端设备解绑
export const bossDeviceUnbind = params => axios.post(iotUrl + '/api/boss/device-unbind', params)

// 获取投诉工单列表
export const getComplaintOrderList = params => axios.get(iotUrl + '/mall/boss/complaint', { params })
// 获取投诉工单详情
export const getComplaintOrderDetail = params => axios.get(iotUrl + '/mall/boss/complaint/detail', { params })
// 创建投诉工单
export const createComplaintOrder = params => axios.post(iotUrl + '/mall/boss/complaint', params)
// 修改投诉工单
export const editComplaintOrder = params => axios.put(iotUrl + '/mall/boss/complaint', params)

// 获取投诉工单解决记录列表
export const getComplaintProcessOrderList = params => axios.get(iotUrl + '/mall/boss/complaint/process', { params })
// 编辑工单解决记录
export const editComplaintProcessOrder = params => axios.put(iotUrl + '/mall/boss/complaint/process', params)
// 创建工单解决记录
export const createComplaintProcessOrder = params => axios.post(iotUrl + '/mall/boss/complaint/process', params)
// 删除工单解决记录
export const deleteComplaintProcessOrder = params => axios.delete(iotUrl + '/mall/boss/complaint/process', { data: params })
// 获取工单解决记录详情
export const getComplaintProcessOrderDetail = params => axios.get(iotUrl + '/mall/boss/complaint/process/detail', { params })
// 获取服务机会列表
export const getServiceRemindList = params => axios.get(iotUrl + '/api/service-reminds/boss', { params })

// 创建集控项目
export const createControlProject = params => axios.post(iotUrl + '/ccs/boss/project', params)
// 编辑集控项目
export const editControlProject = params => axios.put(iotUrl + '/ccs/boss/project', params)
// 查看集控项目列表
export const getControlProjectList = params => axios.get(iotUrl + '/ccs/boss/project/page', { params })
// 查看集控项目详情
export const getControlProjectDetail = params => axios.get(iotUrl + '/ccs/boss/project/' + params.id)
// 获取工程端一级设备类型
export const getControlProjectDevicesTypes = params => axios.get(iotUrl + '/ccs/project-device/types', params)

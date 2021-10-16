
/**
* 
* @export
* @interface AirSleepCustomPO
*/
export interface AirSleepCustomPO {
    
    /**
     * 
     * @type {string}
     * @memberof AirSleepCustomPO
     */
    coldMode?: string

    /**
     * 
     * @type {string}
     * @memberof AirSleepCustomPO
     */
    createTime?: string

    /**
     * 
     * @type {string}
     * @memberof AirSleepCustomPO
     */
    devId?: string

    /**
     * 
     * @type {string}
     * @memberof AirSleepCustomPO
     */
    endpoint?: string

    /**
     * 
     * @type {number | string}
     * @memberof AirSleepCustomPO
     */
    exeMode?: number | string

    /**
     * 
     * @type {string}
     * @memberof AirSleepCustomPO
     */
    hotMode?: string

    /**
     * 
     * @type {number | string}
     * @memberof AirSleepCustomPO
     */
    id?: number | string

    /**
     * 
     * @type {string}
     * @memberof AirSleepCustomPO
     */
    subdevId?: string

    /**
     * 
     * @type {string}
     * @memberof AirSleepCustomPO
     */
    updateTime?: string

}


/**
* 
* @export
* @interface AirSleepDTO
*/
export interface AirSleepDTO {
    
    /**
     * 
     * @type {number | string}
     * @memberof AirSleepDTO
     */
    delayTime?: number | string

    /**
     * 
     * @type {string}
     * @memberof AirSleepDTO
     */
    devId?: string

    /**
     * 
     * @type {string}
     * @memberof AirSleepDTO
     */
    endpoint?: string

    /**
     * 
     * @type {string}
     * @memberof AirSleepDTO
     */
    phaseT?: string

    /**
     * 
     * @type {number | string}
     * @memberof AirSleepDTO
     */
    sleepStatus?: number | string

    /**
     * 
     * @type {string}
     * @memberof AirSleepDTO
     */
    startDate?: string

    /**
     * 
     * @type {string}
     * @memberof AirSleepDTO
     */
    subdevId?: string

}


/**
* 
* @export
* @interface BoilerLinkageSwitchPO
*/
export interface BoilerLinkageSwitchPO {
    
    /**
     * 
     * @type {string}
     * @memberof BoilerLinkageSwitchPO
     */
    createTime?: string

    /**
     * 
     * @type {string}
     * @memberof BoilerLinkageSwitchPO
     */
    homeId?: string

    /**
     * 
     * @type {number | string}
     * @memberof BoilerLinkageSwitchPO
     */
    id?: number | string

    /**
     * 
     * @type {string}
     * @memberof BoilerLinkageSwitchPO
     */
    iotId?: string

    /**
     * 
     * @type {number | string}
     * @memberof BoilerLinkageSwitchPO
     */
    linkageSwitch?: number | string

    /**
     * 
     * @type {string}
     * @memberof BoilerLinkageSwitchPO
     */
    subIotId?: string

    /**
     * 
     * @type {string}
     * @memberof BoilerLinkageSwitchPO
     */
    type?: string

    /**
     * 
     * @type {string}
     * @memberof BoilerLinkageSwitchPO
     */
    updateTime?: string

}


/**
* 
* @export
* @interface ComfortRoomInfoPO
*/
export interface ComfortRoomInfoPO {
    
    /**
     * 
     * @type {string}
     * @memberof ComfortRoomInfoPO
     */
    actionData?: string

    /**
     * 
     * @type {number | string}
     * @memberof ComfortRoomInfoPO
     */
    comfortType?: number | string

    /**
     * 
     * @type {string}
     * @memberof ComfortRoomInfoPO
     */
    conditionData?: string

    /**
     * 
     * @type {string}
     * @memberof ComfortRoomInfoPO
     */
    createTime?: string

    /**
     * 
     * @type {string}
     * @memberof ComfortRoomInfoPO
     */
    effectDay?: string

    /**
     * 
     * @type {string}
     * @memberof ComfortRoomInfoPO
     */
    effectEndTime?: string

    /**
     * 
     * @type {string}
     * @memberof ComfortRoomInfoPO
     */
    effectStartTime?: string

    /**
     * 
     * @type {number | string}
     * @memberof ComfortRoomInfoPO
     */
    effectTimeState?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof ComfortRoomInfoPO
     */
    homeId: number | string

    /**
     * 
     * @type {number | string}
     * @memberof ComfortRoomInfoPO
     */
    id?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof ComfortRoomInfoPO
     */
    roomId: number | string

    /**
     * 
     * @type {number | string}
     * @memberof ComfortRoomInfoPO
     */
    startState: number | string

    /**
     * 
     * @type {number | string}
     * @memberof ComfortRoomInfoPO
     */
    targetHumidity?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof ComfortRoomInfoPO
     */
    targetTemperature?: number | string

    /**
     * 
     * @type {string}
     * @memberof ComfortRoomInfoPO
     */
    updateTime?: string

}


/**
* 舒适度场景记录
* @export
* @interface ComfortRoomRecord
*/
export interface ComfortRoomRecord {
    
    /**
     * 恒温恒湿模式当天运行时间(小时),type=1
     * @type {number | string}
     * @memberof ComfortRoomRecord
     */
    coldElapsedTime?: number | string

    /**
     * 创建时间
     * @type {string}
     * @memberof ComfortRoomRecord
     */
    createTime?: string

    /**
     * 日期 (年-月-日)
     * @type {string}
     * @memberof ComfortRoomRecord
     */
    date?: string

    /**
     * 时间
     * @type {string}
     * @memberof ComfortRoomRecord
     */
    dateTime?: string

    /**
     * 家id
     * @type {number | string}
     * @memberof ComfortRoomRecord
     */
    homeId?: number | string

    /**
     * 家名称
     * @type {string}
     * @memberof ComfortRoomRecord
     */
    homeName?: string

    /**
     * 智能调温模式当天运行时间(小时),type=2
     * @type {number | string}
     * @memberof ComfortRoomRecord
     */
    hotElapsedTime?: number | string

    /**
     * 
     * @type {string}
     * @memberof ComfortRoomRecord
     */
    id?: string

    /**
     * 智能除湿模式当天运行时间(小时),type=5
     * @type {number | string}
     * @memberof ComfortRoomRecord
     */
    loseWetElapsedTime?: number | string

    /**
     * 家庭管理员手机号
     * @type {string}
     * @memberof ComfortRoomRecord
     */
    phone?: string

    /**
     * 房间id
     * @type {number | string}
     * @memberof ComfortRoomRecord
     */
    roomId?: number | string

    /**
     * 房间名称
     * @type {string}
     * @memberof ComfortRoomRecord
     */
    roomName?: string

    /**
     * 总运行时间
     * @type {number | string}
     * @memberof ComfortRoomRecord
     */
    totalElapsedTime?: number | string

}


/**
* 
* @export
* @interface ComfortSchemePO
*/
export interface ComfortSchemePO {
    
    /**
     * 
     * @type {string}
     * @memberof ComfortSchemePO
     */
    createTime?: string

    /**
     * 
     * @type {number | string}
     * @memberof ComfortSchemePO
     */
    id?: number | string

    /**
     * 
     * @type {string}
     * @memberof ComfortSchemePO
     */
    miniProgramUrl?: string

    /**
     * 
     * @type {string}
     * @memberof ComfortSchemePO
     */
    picture?: string

    /**
     * 
     * @type {string}
     * @memberof ComfortSchemePO
     */
    title?: string

    /**
     * 
     * @type {string}
     * @memberof ComfortSchemePO
     */
    updateTime?: string

    /**
     * 
     * @type {string}
     * @memberof ComfortSchemePO
     */
    webUrl?: string

}


/**
* 设备配网记录
* @export
* @interface DeviceNetworkRecord
*/
export interface DeviceNetworkRecord {
    
    /**
     * 
     * @type {string}
     * @memberof DeviceNetworkRecord
     */
    createTime?: string

    /**
     * 设备名称
     * @type {string}
     * @memberof DeviceNetworkRecord
     */
    deviceName?: string

    /**
     * 
     * @type {string}
     * @memberof DeviceNetworkRecord
     */
    id?: string

    /**
     * 设备id
     * @type {string}
     * @memberof DeviceNetworkRecord
     */
    iotId?: string

    /**
     * 管理员手机号
     * @type {string}
     * @memberof DeviceNetworkRecord
     */
    phone?: string

    /**
     * 结果 1.成功,2.失败
     * @type {number | string}
     * @memberof DeviceNetworkRecord
     */
    result?: number | string

    /**
     * 来源 1.ios,2.android
     * @type {number | string}
     * @memberof DeviceNetworkRecord
     */
    source?: number | string

    /**
     * 子设备id
     * @type {string}
     * @memberof DeviceNetworkRecord
     */
    subIotId?: string

    /**
     * 设备类型
     * @type {string}
     * @memberof DeviceNetworkRecord
     */
    type?: string

}


/**
* 年度报告-设备报告
* @export
* @interface DeviceReport
*/
export interface DeviceReport {
    
    /**
     * 第三页-最喜欢的模式
     * @type {string}
     * @memberof DeviceReport
     */
    favouriteMode?: string

    /**
     * 第三页-最喜欢的风速
     * @type {string}
     * @memberof DeviceReport
     */
    favouriteSpeed?: string

    /**
     * 第三页-最喜欢的温度
     * @type {string}
     * @memberof DeviceReport
     */
    favouriteTemp?: string

    /**
     * 第三页-使用智能设备分钟数
     * @type {string}
     * @memberof DeviceReport
     */
    useMiniutes?: string

    /**
     * 第三页-使用智慧模式分钟数
     * @type {string}
     * @memberof DeviceReport
     */
    useWisdomModeMiniutes?: string

}


/**
* 
* @export
* @interface DeviceUnbindRecordResponse
*/
export interface DeviceUnbindRecordResponse {
    
    /**
     * 
     * @type {string}
     * @memberof DeviceUnbindRecordResponse
     */
    createTime?: string

    /**
     * 
     * @type {number | string}
     * @memberof DeviceUnbindRecordResponse
     */
    id?: number | string

    /**
     * 
     * @type {string}
     * @memberof DeviceUnbindRecordResponse
     */
    iotId?: string

    /**
     * 
     * @type {string}
     * @memberof DeviceUnbindRecordResponse
     */
    operator?: string

    /**
     * 
     * @type {string}
     * @memberof DeviceUnbindRecordResponse
     */
    phone?: string

    /**
     * 
     * @type {string}
     * @memberof DeviceUnbindRecordResponse
     */
    remark?: string

    /**
     * 
     * @type {string}
     * @memberof DeviceUnbindRecordResponse
     */
    typeName?: string

}


/**
* 
* @export
* @interface DeviceUnbindRequest
*/
export interface DeviceUnbindRequest {
    
    /**
     * 设备id 
     * @type {string}
     * @memberof DeviceUnbindRequest
     */
    iotId?: string

    /**
     * 操作人名称
     * @type {string}
     * @memberof DeviceUnbindRequest
     */
    operator?: string

    /**
     * 操作人手机号
     * @type {string}
     * @memberof DeviceUnbindRequest
     */
    operatorPhone?: string

    /**
     * 管理员手机号
     * @type {string}
     * @memberof DeviceUnbindRequest
     */
    phone?: string

    /**
     * 解绑备注
     * @type {string}
     * @memberof DeviceUnbindRequest
     */
    remark?: string

    /**
     * 设备型号名称，
     * @type {string}
     * @memberof DeviceUnbindRequest
     */
    typeName?: string

}


/**
* 
* @export
* @interface DeviceUnbindResponse
*/
export interface DeviceUnbindResponse {
    
    /**
     * 绑定时间
     * @type {string}
     * @memberof DeviceUnbindResponse
     */
    bindTime?: string

    /**
     * 经销商
     * @type {string}
     * @memberof DeviceUnbindResponse
     */
    dealer?: string

    /**
     * 设备id
     * @type {string}
     * @memberof DeviceUnbindResponse
     */
    iotId?: string

    /**
     * 管理员手机
     * @type {string}
     * @memberof DeviceUnbindResponse
     */
    phone?: string

    /**
     * 设备型号名称
     * @type {string}
     * @memberof DeviceUnbindResponse
     */
    typeName?: string

}


/**
* 
* @export
* @interface DinRealtedDevicePO
*/
export interface DinRealtedDevicePO {
    
    /**
     * 
     * @type {string}
     * @memberof DinRealtedDevicePO
     */
    createTime?: string

    /**
     * 
     * @type {number | string}
     * @memberof DinRealtedDevicePO
     */
    id?: number | string

    /**
     * 
     * @type {string}
     * @memberof DinRealtedDevicePO
     */
    relatedDevice?: string

    /**
     * 
     * @type {number | string}
     * @memberof DinRealtedDevicePO
     */
    selected?: number | string

    /**
     * 
     * @type {string}
     * @memberof DinRealtedDevicePO
     */
    subIotId?: string

    /**
     * 
     * @type {string}
     * @memberof DinRealtedDevicePO
     */
    updateTime?: string

}


/**
* 
* @export
* @interface DirectionalRequest
*/
export interface DirectionalRequest {
    
    /**
     * id
     * @type {number | string}
     * @memberof DirectionalRequest
     */
    id?: number | string

    /**
     * 设备id
     * @type {string}
     * @memberof DirectionalRequest
     */
    iotId?: string

    /**
     * 操作人
     * @type {string}
     * @memberof DirectionalRequest
     */
    operator?: string

    /**
     * 操作人手机号（用来验证权限）
     * @type {string}
     * @memberof DirectionalRequest
     */
    phone?: string

}


/**
* 
* @export
* @interface EnvironmentNewParamPO
*/
export interface EnvironmentNewParamPO {
    
    /**
     * 
     * @type {string}
     * @memberof EnvironmentNewParamPO
     */
    createTime?: string

    /**
     * 
     * @type {number | string}
     * @memberof EnvironmentNewParamPO
     */
    highHumidValue: number | string

    /**
     * 
     * @type {number | string}
     * @memberof EnvironmentNewParamPO
     */
    highTemperValue: number | string

    /**
     * 
     * @type {number | string}
     * @memberof EnvironmentNewParamPO
     */
    id?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof EnvironmentNewParamPO
     */
    lowHumidValue: number | string

    /**
     * 
     * @type {number | string}
     * @memberof EnvironmentNewParamPO
     */
    lowTemperValue: number | string

    /**
     * 
     * @type {number | string}
     * @memberof EnvironmentNewParamPO
     */
    middle1TemperValue: number | string

    /**
     * 
     * @type {number | string}
     * @memberof EnvironmentNewParamPO
     */
    middle2TemperValue: number | string

    /**
     * 
     * @type {number | string}
     * @memberof EnvironmentNewParamPO
     */
    season: number | string

    /**
     * 
     * @type {string}
     * @memberof EnvironmentNewParamPO
     */
    subIotId?: string

    /**
     * 
     * @type {string}
     * @memberof EnvironmentNewParamPO
     */
    updateTime?: string

}


/**
* 
* @export
* @interface ExcelProcessEvent
*/
export interface ExcelProcessEvent {
    
    /**
     * 
     * @type {boolean}
     * @memberof ExcelProcessEvent
     */
    allOk?: boolean

    /**
     * 
     * @type {number | string}
     * @memberof ExcelProcessEvent
     */
    alreadyInSize?: number | string

    /**
     * 
     * @type {Array<UploadData>}
     * @memberof ExcelProcessEvent
     */
    listNotValid?: Array<UploadData>

    /**
     * 
     * @type {string}
     * @memberof ExcelProcessEvent
     */
    phone?: string

}


/**
* 
* @export
* @interface FloorProgramm
*/
export interface FloorProgramm {
    
    /**
     * 名字
     * @type {string}
     * @memberof FloorProgramm
     */
    name?: string

    /**
     * 锅炉开关 0:关,1:开
     * @type {string}
     * @memberof FloorProgramm
     */
    status?: string

    /**
     * 温度 锅炉开传，关传空字符串
     * @type {string}
     * @memberof FloorProgramm
     */
    temperature?: string

    /**
     * 时间
     * @type {string}
     * @memberof FloorProgramm
     */
    time?: string

}


/**
* 
* @export
* @interface HomeDeviceBindPO
*/
export interface HomeDeviceBindPO {
    
    /**
     * 
     * @type {string}
     * @memberof HomeDeviceBindPO
     */
    createTime?: string

    /**
     * 
     * @type {number | string}
     * @memberof HomeDeviceBindPO
     */
    homeId?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof HomeDeviceBindPO
     */
    id?: number | string

    /**
     * 
     * @type {string}
     * @memberof HomeDeviceBindPO
     */
    iotId?: string

    /**
     * 
     * @type {string}
     * @memberof HomeDeviceBindPO
     */
    password?: string

    /**
     * 
     * @type {string}
     * @memberof HomeDeviceBindPO
     */
    updateTime?: string

}


/**
* 
* @export
* @interface HomePO
*/
export interface HomePO {
    
    /**
     * 
     * @type {string}
     * @memberof HomePO
     */
    cityName?: string

    /**
     * 
     * @type {string}
     * @memberof HomePO
     */
    createTime?: string

    /**
     * 
     * @type {number | string}
     * @memberof HomePO
     */
    deleted?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof HomePO
     */
    homeId?: number | string

    /**
     * 
     * @type {string}
     * @memberof HomePO
     */
    homeLocation?: string

    /**
     * 
     * @type {string}
     * @memberof HomePO
     */
    homeName?: string

    /**
     * 
     * @type {number | string}
     * @memberof HomePO
     */
    id?: number | string

    /**
     * 
     * @type {string}
     * @memberof HomePO
     */
    longitudeLatitude?: string

    /**
     * 
     * @type {number | string}
     * @memberof HomePO
     */
    role?: number | string

    /**
     * 
     * @type {string}
     * @memberof HomePO
     */
    updateTime?: string

    /**
     * 
     * @type {string}
     * @memberof HomePO
     */
    uuid?: string

}


/**
* 
* @export
* @interface HomeThreeDevicesDTO
*/
export interface HomeThreeDevicesDTO {
    
    /**
     * 
     * @type {string}
     * @memberof HomeThreeDevicesDTO
     */
    deviceName?: string

    /**
     * 
     * @type {string}
     * @memberof HomeThreeDevicesDTO
     */
    endpoint?: string

    /**
     * 
     * @type {number | string}
     * @memberof HomeThreeDevicesDTO
     */
    homeId?: number | string

    /**
     * 
     * @type {string}
     * @memberof HomeThreeDevicesDTO
     */
    iotId?: string

    /**
     * 
     * @type {string}
     * @memberof HomeThreeDevicesDTO
     */
    roomName?: string

    /**
     * 
     * @type {string}
     * @memberof HomeThreeDevicesDTO
     */
    subDeviceName?: string

    /**
     * 
     * @type {string}
     * @memberof HomeThreeDevicesDTO
     */
    subIotId?: string

    /**
     * 
     * @type {string}
     * @memberof HomeThreeDevicesDTO
     */
    type?: string

}


/**
* 
* @export
* @interface ListObjectint
*/
export interface ListObjectint {
    
    /**
     * 
     * @type {Array<number | string>}
     * @memberof ListObject«int»
     */
    list?: Array<number | string>

}


/**
* 登录日志
* @export
* @interface LoginLog
*/
export interface LoginLog {
    
    /**
     * 登录的手机型号
     * @type {string}
     * @memberof LoginLog
     */
    deviceModel?: string

    /**
     * 登录的时间
     * @type {string}
     * @memberof LoginLog
     */
    loginTime?: string

}


/**
* 
* @export
* @interface MedalDTO
*/
export interface MedalDTO {
    
    /**
     * 空调达人 1是,0不是
     * @type {number | string}
     * @memberof MedalDTO
     */
    airConditionerShow?: number | string

    /**
     * 舒适大咖 1是,0不是
     * @type {number | string}
     * @memberof MedalDTO
     */
    comfortableHigher?: number | string

    /**
     * 舒适新人 1是,0不是
     * @type {number | string}
     * @memberof MedalDTO
     */
    comfortableNew?: number | string

    /**
     * 健康大咖 1是,0不是
     * @type {number | string}
     * @memberof MedalDTO
     */
    healthHigher?: number | string

    /**
     * 健康达人 1是,0不是
     * @type {number | string}
     * @memberof MedalDTO
     */
    healthShow?: number | string

    /**
     * 采暖达人 1是,0不是
     * @type {number | string}
     * @memberof MedalDTO
     */
    heatingShow?: number | string

    /**
     * 节能达人 1是,0不是
     * @type {number | string}
     * @memberof MedalDTO
     */
    savingShow?: number | string

    /**
     * 分享大咖 1是,0不是
     * @type {number | string}
     * @memberof MedalDTO
     */
    shareHigher?: number | string

}


/**
* 
* @export
* @interface OutboundPO
*/
export interface OutboundPO {
    
    /**
     * 
     * @type {number | string}
     * @memberof OutboundPO
     */
    amount?: number | string

    /**
     * 
     * @type {string}
     * @memberof OutboundPO
     */
    createTime?: string

    /**
     * 
     * @type {string}
     * @memberof OutboundPO
     */
    dealer?: string

    /**
     * 
     * @type {string}
     * @memberof OutboundPO
     */
    dealerPhone?: string

    /**
     * 
     * @type {string}
     * @memberof OutboundPO
     */
    deviceCategory?: string

    /**
     * 
     * @type {number | string}
     * @memberof OutboundPO
     */
    deviceOnline?: number | string

    /**
     * 
     * @type {string}
     * @memberof OutboundPO
     */
    deviceType?: string

    /**
     * 
     * @type {number | string}
     * @memberof OutboundPO
     */
    id?: number | string

    /**
     * 
     * @type {string}
     * @memberof OutboundPO
     */
    iotId?: string

    /**
     * 
     * @type {string}
     * @memberof OutboundPO
     */
    operateId?: string

    /**
     * 
     * @type {string}
     * @memberof OutboundPO
     */
    outboundTime?: string

    /**
     * 
     * @type {string}
     * @memberof OutboundPO
     */
    outboundType?: string

}


/**
* 
* @export
* @interface PageUtilRespHomeMangeBO
*/
export interface PageUtilRespHomeMangeBO {
    
    /**
     * 
     * @type {object}
     * @memberof PageUtil«RespHomeMangeBO»
     */
    attachData?: object

    /**
     * 
     * @type {boolean}
     * @memberof PageUtil«RespHomeMangeBO»
     */
    firstPage?: boolean

    /**
     * 
     * @type {boolean}
     * @memberof PageUtil«RespHomeMangeBO»
     */
    lastPage?: boolean

    /**
     * 
     * @type {number | string}
     * @memberof PageUtil«RespHomeMangeBO»
     */
    lastPageNumber?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof PageUtil«RespHomeMangeBO»
     */
    numberOfBeginElements?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof PageUtil«RespHomeMangeBO»
     */
    numberOfBeginPages?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof PageUtil«RespHomeMangeBO»
     */
    numberOfEndPages?: number | string

    /**
     * 
     * @type {Array<RespHomeMangeBO>}
     * @memberof PageUtil«RespHomeMangeBO»
     */
    pageContent?: Array<RespHomeMangeBO>

    /**
     * 
     * @type {number | string}
     * @memberof PageUtil«RespHomeMangeBO»
     */
    pageNumber?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof PageUtil«RespHomeMangeBO»
     */
    pageSize?: number | string

    /**
     * 
     * @type {string}
     * @memberof PageUtil«RespHomeMangeBO»
     */
    pageSql?: string

    /**
     * 
     * @type {string}
     * @memberof PageUtil«RespHomeMangeBO»
     */
    sortColumn?: string

    /**
     * 
     * @type {string}
     * @memberof PageUtil«RespHomeMangeBO»
     */
    spareParam1?: string

    /**
     * 
     * @type {string}
     * @memberof PageUtil«RespHomeMangeBO»
     */
    spareParam2?: string

    /**
     * 
     * @type {number | string}
     * @memberof PageUtil«RespHomeMangeBO»
     */
    totalElements?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof PageUtil«RespHomeMangeBO»
     */
    totalPages?: number | string

}


/**
* 
* @export
* @interface Pageable
*/
export interface Pageable {
    
    /**
     * 
     * @type {number | string}
     * @memberof Pageable
     */
    offset?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Pageable
     */
    pageNumber?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Pageable
     */
    pageSize?: number | string

    /**
     * 
     * @type {boolean}
     * @memberof Pageable
     */
    paged?: boolean

    /**
     * 
     * @type {Sort}
     * @memberof Pageable
     */
    sort?: Sort

    /**
     * 
     * @type {boolean}
     * @memberof Pageable
     */
    unpaged?: boolean

}


/**
* 
* @export
* @interface PageComfortRoomRecord
*/
export interface PageComfortRoomRecord {
    
    /**
     * 
     * @type {Array<ComfortRoomRecord>}
     * @memberof Page«ComfortRoomRecord»
     */
    content?: Array<ComfortRoomRecord>

    /**
     * 
     * @type {boolean}
     * @memberof Page«ComfortRoomRecord»
     */
    empty?: boolean

    /**
     * 
     * @type {boolean}
     * @memberof Page«ComfortRoomRecord»
     */
    first?: boolean

    /**
     * 
     * @type {boolean}
     * @memberof Page«ComfortRoomRecord»
     */
    last?: boolean

    /**
     * 
     * @type {number | string}
     * @memberof Page«ComfortRoomRecord»
     */
    number?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«ComfortRoomRecord»
     */
    numberOfElements?: number | string

    /**
     * 
     * @type {Pageable}
     * @memberof Page«ComfortRoomRecord»
     */
    pageable?: Pageable

    /**
     * 
     * @type {number | string}
     * @memberof Page«ComfortRoomRecord»
     */
    size?: number | string

    /**
     * 
     * @type {Sort}
     * @memberof Page«ComfortRoomRecord»
     */
    sort?: Sort

    /**
     * 
     * @type {number | string}
     * @memberof Page«ComfortRoomRecord»
     */
    totalElements?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«ComfortRoomRecord»
     */
    totalPages?: number | string

}


/**
* 
* @export
* @interface PageDeviceNetworkRecord
*/
export interface PageDeviceNetworkRecord {
    
    /**
     * 
     * @type {Array<DeviceNetworkRecord>}
     * @memberof Page«DeviceNetworkRecord»
     */
    content?: Array<DeviceNetworkRecord>

    /**
     * 
     * @type {boolean}
     * @memberof Page«DeviceNetworkRecord»
     */
    empty?: boolean

    /**
     * 
     * @type {boolean}
     * @memberof Page«DeviceNetworkRecord»
     */
    first?: boolean

    /**
     * 
     * @type {boolean}
     * @memberof Page«DeviceNetworkRecord»
     */
    last?: boolean

    /**
     * 
     * @type {number | string}
     * @memberof Page«DeviceNetworkRecord»
     */
    number?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«DeviceNetworkRecord»
     */
    numberOfElements?: number | string

    /**
     * 
     * @type {Pageable}
     * @memberof Page«DeviceNetworkRecord»
     */
    pageable?: Pageable

    /**
     * 
     * @type {number | string}
     * @memberof Page«DeviceNetworkRecord»
     */
    size?: number | string

    /**
     * 
     * @type {Sort}
     * @memberof Page«DeviceNetworkRecord»
     */
    sort?: Sort

    /**
     * 
     * @type {number | string}
     * @memberof Page«DeviceNetworkRecord»
     */
    totalElements?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«DeviceNetworkRecord»
     */
    totalPages?: number | string

}


/**
* 
* @export
* @interface PageDeviceUnbindRecordResponse
*/
export interface PageDeviceUnbindRecordResponse {
    
    /**
     * 
     * @type {boolean}
     * @memberof Page«DeviceUnbindRecordResponse»
     */
    asc?: boolean

    /**
     * 
     * @type {number | string}
     * @memberof Page«DeviceUnbindRecordResponse»
     */
    current?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«DeviceUnbindRecordResponse»
     */
    limit?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«DeviceUnbindRecordResponse»
     */
    offset?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«DeviceUnbindRecordResponse»
     */
    offsetCurrent?: number | string

    /**
     * 
     * @type {string}
     * @memberof Page«DeviceUnbindRecordResponse»
     */
    orderByField?: string

    /**
     * 
     * @type {number | string}
     * @memberof Page«DeviceUnbindRecordResponse»
     */
    pages?: number | string

    /**
     * 
     * @type {Array<DeviceUnbindRecordResponse>}
     * @memberof Page«DeviceUnbindRecordResponse»
     */
    records?: Array<DeviceUnbindRecordResponse>

    /**
     * 
     * @type {boolean}
     * @memberof Page«DeviceUnbindRecordResponse»
     */
    searchCount?: boolean

    /**
     * 
     * @type {number | string}
     * @memberof Page«DeviceUnbindRecordResponse»
     */
    size?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«DeviceUnbindRecordResponse»
     */
    total?: number | string

}


/**
* 
* @export
* @interface PageDeviceUnbindResponse
*/
export interface PageDeviceUnbindResponse {
    
    /**
     * 
     * @type {boolean}
     * @memberof Page«DeviceUnbindResponse»
     */
    asc?: boolean

    /**
     * 
     * @type {number | string}
     * @memberof Page«DeviceUnbindResponse»
     */
    current?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«DeviceUnbindResponse»
     */
    limit?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«DeviceUnbindResponse»
     */
    offset?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«DeviceUnbindResponse»
     */
    offsetCurrent?: number | string

    /**
     * 
     * @type {string}
     * @memberof Page«DeviceUnbindResponse»
     */
    orderByField?: string

    /**
     * 
     * @type {number | string}
     * @memberof Page«DeviceUnbindResponse»
     */
    pages?: number | string

    /**
     * 
     * @type {Array<DeviceUnbindResponse>}
     * @memberof Page«DeviceUnbindResponse»
     */
    records?: Array<DeviceUnbindResponse>

    /**
     * 
     * @type {boolean}
     * @memberof Page«DeviceUnbindResponse»
     */
    searchCount?: boolean

    /**
     * 
     * @type {number | string}
     * @memberof Page«DeviceUnbindResponse»
     */
    size?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«DeviceUnbindResponse»
     */
    total?: number | string

}


/**
* 
* @export
* @interface PageReqIotDeviceBO
*/
export interface PageReqIotDeviceBO {
    
    /**
     * 
     * @type {boolean}
     * @memberof Page«ReqIotDeviceBO»
     */
    asc?: boolean

    /**
     * 
     * @type {number | string}
     * @memberof Page«ReqIotDeviceBO»
     */
    current?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«ReqIotDeviceBO»
     */
    limit?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«ReqIotDeviceBO»
     */
    offset?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«ReqIotDeviceBO»
     */
    offsetCurrent?: number | string

    /**
     * 
     * @type {string}
     * @memberof Page«ReqIotDeviceBO»
     */
    orderByField?: string

    /**
     * 
     * @type {number | string}
     * @memberof Page«ReqIotDeviceBO»
     */
    pages?: number | string

    /**
     * 
     * @type {Array<ReqIotDeviceBO>}
     * @memberof Page«ReqIotDeviceBO»
     */
    records?: Array<ReqIotDeviceBO>

    /**
     * 
     * @type {boolean}
     * @memberof Page«ReqIotDeviceBO»
     */
    searchCount?: boolean

    /**
     * 
     * @type {number | string}
     * @memberof Page«ReqIotDeviceBO»
     */
    size?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«ReqIotDeviceBO»
     */
    total?: number | string

}


/**
* 
* @export
* @interface PageRespActivityCenterBO
*/
export interface PageRespActivityCenterBO {
    
    /**
     * 
     * @type {boolean}
     * @memberof Page«RespActivityCenterBO»
     */
    asc?: boolean

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespActivityCenterBO»
     */
    current?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespActivityCenterBO»
     */
    limit?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespActivityCenterBO»
     */
    offset?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespActivityCenterBO»
     */
    offsetCurrent?: number | string

    /**
     * 
     * @type {string}
     * @memberof Page«RespActivityCenterBO»
     */
    orderByField?: string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespActivityCenterBO»
     */
    pages?: number | string

    /**
     * 
     * @type {Array<RespActivityCenterBO>}
     * @memberof Page«RespActivityCenterBO»
     */
    records?: Array<RespActivityCenterBO>

    /**
     * 
     * @type {boolean}
     * @memberof Page«RespActivityCenterBO»
     */
    searchCount?: boolean

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespActivityCenterBO»
     */
    size?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespActivityCenterBO»
     */
    total?: number | string

}


/**
* 
* @export
* @interface PageRespArticlePageBo
*/
export interface PageRespArticlePageBo {
    
    /**
     * 
     * @type {boolean}
     * @memberof Page«RespArticlePageBo»
     */
    asc?: boolean

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespArticlePageBo»
     */
    current?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespArticlePageBo»
     */
    limit?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespArticlePageBo»
     */
    offset?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespArticlePageBo»
     */
    offsetCurrent?: number | string

    /**
     * 
     * @type {string}
     * @memberof Page«RespArticlePageBo»
     */
    orderByField?: string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespArticlePageBo»
     */
    pages?: number | string

    /**
     * 
     * @type {Array<RespArticlePageBo>}
     * @memberof Page«RespArticlePageBo»
     */
    records?: Array<RespArticlePageBo>

    /**
     * 
     * @type {boolean}
     * @memberof Page«RespArticlePageBo»
     */
    searchCount?: boolean

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespArticlePageBo»
     */
    size?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespArticlePageBo»
     */
    total?: number | string

}


/**
* 
* @export
* @interface PageRespBreakdownBo
*/
export interface PageRespBreakdownBo {
    
    /**
     * 
     * @type {boolean}
     * @memberof Page«RespBreakdownBo»
     */
    asc?: boolean

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespBreakdownBo»
     */
    current?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespBreakdownBo»
     */
    limit?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespBreakdownBo»
     */
    offset?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespBreakdownBo»
     */
    offsetCurrent?: number | string

    /**
     * 
     * @type {string}
     * @memberof Page«RespBreakdownBo»
     */
    orderByField?: string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespBreakdownBo»
     */
    pages?: number | string

    /**
     * 
     * @type {Array<RespBreakdownBo>}
     * @memberof Page«RespBreakdownBo»
     */
    records?: Array<RespBreakdownBo>

    /**
     * 
     * @type {boolean}
     * @memberof Page«RespBreakdownBo»
     */
    searchCount?: boolean

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespBreakdownBo»
     */
    size?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespBreakdownBo»
     */
    total?: number | string

}


/**
* 
* @export
* @interface PageRespCustomerServicePhoneDataBO
*/
export interface PageRespCustomerServicePhoneDataBO {
    
    /**
     * 
     * @type {boolean}
     * @memberof Page«RespCustomerServicePhoneDataBO»
     */
    asc?: boolean

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespCustomerServicePhoneDataBO»
     */
    current?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespCustomerServicePhoneDataBO»
     */
    limit?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespCustomerServicePhoneDataBO»
     */
    offset?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespCustomerServicePhoneDataBO»
     */
    offsetCurrent?: number | string

    /**
     * 
     * @type {string}
     * @memberof Page«RespCustomerServicePhoneDataBO»
     */
    orderByField?: string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespCustomerServicePhoneDataBO»
     */
    pages?: number | string

    /**
     * 
     * @type {Array<RespCustomerServicePhoneDataBO>}
     * @memberof Page«RespCustomerServicePhoneDataBO»
     */
    records?: Array<RespCustomerServicePhoneDataBO>

    /**
     * 
     * @type {boolean}
     * @memberof Page«RespCustomerServicePhoneDataBO»
     */
    searchCount?: boolean

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespCustomerServicePhoneDataBO»
     */
    size?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespCustomerServicePhoneDataBO»
     */
    total?: number | string

}


/**
* 
* @export
* @interface PageRespDeviceDetailsBO
*/
export interface PageRespDeviceDetailsBO {
    
    /**
     * 
     * @type {boolean}
     * @memberof Page«RespDeviceDetailsBO»
     */
    asc?: boolean

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespDeviceDetailsBO»
     */
    current?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespDeviceDetailsBO»
     */
    limit?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespDeviceDetailsBO»
     */
    offset?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespDeviceDetailsBO»
     */
    offsetCurrent?: number | string

    /**
     * 
     * @type {string}
     * @memberof Page«RespDeviceDetailsBO»
     */
    orderByField?: string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespDeviceDetailsBO»
     */
    pages?: number | string

    /**
     * 
     * @type {Array<RespDeviceDetailsBO>}
     * @memberof Page«RespDeviceDetailsBO»
     */
    records?: Array<RespDeviceDetailsBO>

    /**
     * 
     * @type {boolean}
     * @memberof Page«RespDeviceDetailsBO»
     */
    searchCount?: boolean

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespDeviceDetailsBO»
     */
    size?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespDeviceDetailsBO»
     */
    total?: number | string

}


/**
* 
* @export
* @interface PageRespDeviceLoginBO
*/
export interface PageRespDeviceLoginBO {
    
    /**
     * 
     * @type {Array<RespDeviceLoginBO>}
     * @memberof Page«RespDeviceLoginBO»
     */
    content?: Array<RespDeviceLoginBO>

    /**
     * 
     * @type {boolean}
     * @memberof Page«RespDeviceLoginBO»
     */
    empty?: boolean

    /**
     * 
     * @type {boolean}
     * @memberof Page«RespDeviceLoginBO»
     */
    first?: boolean

    /**
     * 
     * @type {boolean}
     * @memberof Page«RespDeviceLoginBO»
     */
    last?: boolean

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespDeviceLoginBO»
     */
    number?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespDeviceLoginBO»
     */
    numberOfElements?: number | string

    /**
     * 
     * @type {Pageable}
     * @memberof Page«RespDeviceLoginBO»
     */
    pageable?: Pageable

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespDeviceLoginBO»
     */
    size?: number | string

    /**
     * 
     * @type {Sort}
     * @memberof Page«RespDeviceLoginBO»
     */
    sort?: Sort

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespDeviceLoginBO»
     */
    totalElements?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespDeviceLoginBO»
     */
    totalPages?: number | string

}


/**
* 
* @export
* @interface PageRespIPlayPageBo
*/
export interface PageRespIPlayPageBo {
    
    /**
     * 
     * @type {boolean}
     * @memberof Page«RespIPlayPageBo»
     */
    asc?: boolean

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespIPlayPageBo»
     */
    current?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespIPlayPageBo»
     */
    limit?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespIPlayPageBo»
     */
    offset?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespIPlayPageBo»
     */
    offsetCurrent?: number | string

    /**
     * 
     * @type {string}
     * @memberof Page«RespIPlayPageBo»
     */
    orderByField?: string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespIPlayPageBo»
     */
    pages?: number | string

    /**
     * 
     * @type {Array<RespIPlayPageBo>}
     * @memberof Page«RespIPlayPageBo»
     */
    records?: Array<RespIPlayPageBo>

    /**
     * 
     * @type {boolean}
     * @memberof Page«RespIPlayPageBo»
     */
    searchCount?: boolean

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespIPlayPageBo»
     */
    size?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespIPlayPageBo»
     */
    total?: number | string

}


/**
* 
* @export
* @interface PageRespOutboundBO
*/
export interface PageRespOutboundBO {
    
    /**
     * 
     * @type {boolean}
     * @memberof Page«RespOutboundBO»
     */
    asc?: boolean

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespOutboundBO»
     */
    current?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespOutboundBO»
     */
    limit?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespOutboundBO»
     */
    offset?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespOutboundBO»
     */
    offsetCurrent?: number | string

    /**
     * 
     * @type {string}
     * @memberof Page«RespOutboundBO»
     */
    orderByField?: string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespOutboundBO»
     */
    pages?: number | string

    /**
     * 
     * @type {Array<RespOutboundBO>}
     * @memberof Page«RespOutboundBO»
     */
    records?: Array<RespOutboundBO>

    /**
     * 
     * @type {boolean}
     * @memberof Page«RespOutboundBO»
     */
    searchCount?: boolean

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespOutboundBO»
     */
    size?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespOutboundBO»
     */
    total?: number | string

}


/**
* 
* @export
* @interface PageRespPopUpPageBO
*/
export interface PageRespPopUpPageBO {
    
    /**
     * 
     * @type {boolean}
     * @memberof Page«RespPopUpPageBO»
     */
    asc?: boolean

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespPopUpPageBO»
     */
    current?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespPopUpPageBO»
     */
    limit?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespPopUpPageBO»
     */
    offset?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespPopUpPageBO»
     */
    offsetCurrent?: number | string

    /**
     * 
     * @type {string}
     * @memberof Page«RespPopUpPageBO»
     */
    orderByField?: string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespPopUpPageBO»
     */
    pages?: number | string

    /**
     * 
     * @type {Array<RespPopUpPageBO>}
     * @memberof Page«RespPopUpPageBO»
     */
    records?: Array<RespPopUpPageBO>

    /**
     * 
     * @type {boolean}
     * @memberof Page«RespPopUpPageBO»
     */
    searchCount?: boolean

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespPopUpPageBO»
     */
    size?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespPopUpPageBO»
     */
    total?: number | string

}


/**
* 
* @export
* @interface PageRespPushMessagePageBo
*/
export interface PageRespPushMessagePageBo {
    
    /**
     * 
     * @type {boolean}
     * @memberof Page«RespPushMessagePageBo»
     */
    asc?: boolean

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespPushMessagePageBo»
     */
    current?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespPushMessagePageBo»
     */
    limit?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespPushMessagePageBo»
     */
    offset?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespPushMessagePageBo»
     */
    offsetCurrent?: number | string

    /**
     * 
     * @type {string}
     * @memberof Page«RespPushMessagePageBo»
     */
    orderByField?: string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespPushMessagePageBo»
     */
    pages?: number | string

    /**
     * 
     * @type {Array<RespPushMessagePageBo>}
     * @memberof Page«RespPushMessagePageBo»
     */
    records?: Array<RespPushMessagePageBo>

    /**
     * 
     * @type {boolean}
     * @memberof Page«RespPushMessagePageBo»
     */
    searchCount?: boolean

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespPushMessagePageBo»
     */
    size?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespPushMessagePageBo»
     */
    total?: number | string

}


/**
* 
* @export
* @interface PageRespQuestionAnswerBO
*/
export interface PageRespQuestionAnswerBO {
    
    /**
     * 
     * @type {boolean}
     * @memberof Page«RespQuestionAnswerBO»
     */
    asc?: boolean

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespQuestionAnswerBO»
     */
    current?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespQuestionAnswerBO»
     */
    limit?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespQuestionAnswerBO»
     */
    offset?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespQuestionAnswerBO»
     */
    offsetCurrent?: number | string

    /**
     * 
     * @type {string}
     * @memberof Page«RespQuestionAnswerBO»
     */
    orderByField?: string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespQuestionAnswerBO»
     */
    pages?: number | string

    /**
     * 
     * @type {Array<RespQuestionAnswerBO>}
     * @memberof Page«RespQuestionAnswerBO»
     */
    records?: Array<RespQuestionAnswerBO>

    /**
     * 
     * @type {boolean}
     * @memberof Page«RespQuestionAnswerBO»
     */
    searchCount?: boolean

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespQuestionAnswerBO»
     */
    size?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespQuestionAnswerBO»
     */
    total?: number | string

}


/**
* 
* @export
* @interface PageRespRemind
*/
export interface PageRespRemind {
    
    /**
     * 
     * @type {boolean}
     * @memberof Page«RespRemind»
     */
    asc?: boolean

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespRemind»
     */
    current?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespRemind»
     */
    limit?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespRemind»
     */
    offset?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespRemind»
     */
    offsetCurrent?: number | string

    /**
     * 
     * @type {string}
     * @memberof Page«RespRemind»
     */
    orderByField?: string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespRemind»
     */
    pages?: number | string

    /**
     * 
     * @type {Array<RespRemind>}
     * @memberof Page«RespRemind»
     */
    records?: Array<RespRemind>

    /**
     * 
     * @type {boolean}
     * @memberof Page«RespRemind»
     */
    searchCount?: boolean

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespRemind»
     */
    size?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespRemind»
     */
    total?: number | string

}


/**
* 
* @export
* @interface PageRespServiceOrderBo
*/
export interface PageRespServiceOrderBo {
    
    /**
     * 
     * @type {boolean}
     * @memberof Page«RespServiceOrderBo»
     */
    asc?: boolean

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespServiceOrderBo»
     */
    current?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespServiceOrderBo»
     */
    limit?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespServiceOrderBo»
     */
    offset?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespServiceOrderBo»
     */
    offsetCurrent?: number | string

    /**
     * 
     * @type {string}
     * @memberof Page«RespServiceOrderBo»
     */
    orderByField?: string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespServiceOrderBo»
     */
    pages?: number | string

    /**
     * 
     * @type {Array<RespServiceOrderBo>}
     * @memberof Page«RespServiceOrderBo»
     */
    records?: Array<RespServiceOrderBo>

    /**
     * 
     * @type {boolean}
     * @memberof Page«RespServiceOrderBo»
     */
    searchCount?: boolean

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespServiceOrderBo»
     */
    size?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespServiceOrderBo»
     */
    total?: number | string

}


/**
* 
* @export
* @interface PageRespSplashScreenPageBo
*/
export interface PageRespSplashScreenPageBo {
    
    /**
     * 
     * @type {boolean}
     * @memberof Page«RespSplashScreenPageBo»
     */
    asc?: boolean

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespSplashScreenPageBo»
     */
    current?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespSplashScreenPageBo»
     */
    limit?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespSplashScreenPageBo»
     */
    offset?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespSplashScreenPageBo»
     */
    offsetCurrent?: number | string

    /**
     * 
     * @type {string}
     * @memberof Page«RespSplashScreenPageBo»
     */
    orderByField?: string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespSplashScreenPageBo»
     */
    pages?: number | string

    /**
     * 
     * @type {Array<RespSplashScreenPageBo>}
     * @memberof Page«RespSplashScreenPageBo»
     */
    records?: Array<RespSplashScreenPageBo>

    /**
     * 
     * @type {boolean}
     * @memberof Page«RespSplashScreenPageBo»
     */
    searchCount?: boolean

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespSplashScreenPageBo»
     */
    size?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«RespSplashScreenPageBo»
     */
    total?: number | string

}


/**
* 
* @export
* @interface PageUpgradeDetailsResponse
*/
export interface PageUpgradeDetailsResponse {
    
    /**
     * 
     * @type {boolean}
     * @memberof Page«UpgradeDetailsResponse»
     */
    asc?: boolean

    /**
     * 
     * @type {number | string}
     * @memberof Page«UpgradeDetailsResponse»
     */
    current?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«UpgradeDetailsResponse»
     */
    limit?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«UpgradeDetailsResponse»
     */
    offset?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«UpgradeDetailsResponse»
     */
    offsetCurrent?: number | string

    /**
     * 
     * @type {string}
     * @memberof Page«UpgradeDetailsResponse»
     */
    orderByField?: string

    /**
     * 
     * @type {number | string}
     * @memberof Page«UpgradeDetailsResponse»
     */
    pages?: number | string

    /**
     * 
     * @type {Array<UpgradeDetailsResponse>}
     * @memberof Page«UpgradeDetailsResponse»
     */
    records?: Array<UpgradeDetailsResponse>

    /**
     * 
     * @type {boolean}
     * @memberof Page«UpgradeDetailsResponse»
     */
    searchCount?: boolean

    /**
     * 
     * @type {number | string}
     * @memberof Page«UpgradeDetailsResponse»
     */
    size?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«UpgradeDetailsResponse»
     */
    total?: number | string

}


/**
* 
* @export
* @interface PageUpgradeResponse
*/
export interface PageUpgradeResponse {
    
    /**
     * 
     * @type {boolean}
     * @memberof Page«UpgradeResponse»
     */
    asc?: boolean

    /**
     * 
     * @type {number | string}
     * @memberof Page«UpgradeResponse»
     */
    current?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«UpgradeResponse»
     */
    limit?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«UpgradeResponse»
     */
    offset?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«UpgradeResponse»
     */
    offsetCurrent?: number | string

    /**
     * 
     * @type {string}
     * @memberof Page«UpgradeResponse»
     */
    orderByField?: string

    /**
     * 
     * @type {number | string}
     * @memberof Page«UpgradeResponse»
     */
    pages?: number | string

    /**
     * 
     * @type {Array<UpgradeResponse>}
     * @memberof Page«UpgradeResponse»
     */
    records?: Array<UpgradeResponse>

    /**
     * 
     * @type {boolean}
     * @memberof Page«UpgradeResponse»
     */
    searchCount?: boolean

    /**
     * 
     * @type {number | string}
     * @memberof Page«UpgradeResponse»
     */
    size?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof Page«UpgradeResponse»
     */
    total?: number | string

}


/**
* 
* @export
* @interface PeakValleyFee
*/
export interface PeakValleyFee {
    
    /**
     * 
     * @type {string}
     * @memberof PeakValleyFee
     */
    endTime?: string

    /**
     * 
     * @type {number | string}
     * @memberof PeakValleyFee
     */
    price?: number | string

    /**
     * 
     * @type {string}
     * @memberof PeakValleyFee
     */
    startTime?: string

}


/**
* 
* @export
* @interface Push
*/
export interface Push {
    
    /**
     * 
     * @type {object}
     * @memberof Push
     */
    additionalParameters?: object

    /**
     * 
     * @type {string}
     * @memberof Push
     */
    body?: string

    /**
     * 推送时间-用于定时推送,实时推送的任务不用传
     * @type {string}
     * @memberof Push
     */
    pushTime?: string

    /**
     * 
     * @type {string}
     * @memberof Push
     */
    target?: string

    /**
     * 
     * @type {string}
     * @memberof Push
     */
    targetValue?: string

    /**
     * 
     * @type {string}
     * @memberof Push
     */
    title?: string

}


/**
* 命令参数,同场景那边的action
* @export
* @interface ReqActionBo
*/
export interface ReqActionBo {
    
    /**
     * 命令集合
     * @type {Array<ReqCmdBo>}
     * @memberof ReqActionBo
     */
    cmds: Array<ReqCmdBo>

    /**
     * 设备id
     * @type {string}
     * @memberof ReqActionBo
     */
    devId: string

    /**
     * 三级设备id
     * @type {string}
     * @memberof ReqActionBo
     */
    endpoint: string

    /**
     * 厂商id,2.物联 3.中弘...9.洛吉克
     * @type {number | string}
     * @memberof ReqActionBo
     */
    factoryId: number | string

    /**
     * 二级设备id 中弘传空字符
     * @type {string}
     * @memberof ReqActionBo
     */
    subdevId: string

    /**
     * 服务标识
     * @type {string}
     * @memberof ReqActionBo
     */
    svcId: string

    /**
     * 用户id
     * @type {string}
     * @memberof ReqActionBo
     */
    uuid: string

}


/**
* 执行命令对象
* @export
* @interface ReqActionsBo
*/
export interface ReqActionsBo {
    
    /**
     * 命令集合
     * @type {string}
     * @memberof ReqActionsBo
     */
    actionDtos?: string

    /**
     * 命令集合对象-前端不用管
     * @type {Array<ReqActionBo>}
     * @memberof ReqActionsBo
     */
    actionList?: Array<ReqActionBo>

    /**
     * 用户id
     * @type {string}
     * @memberof ReqActionsBo
     */
    uuid?: string

}


/**
* 活动中心请求类
* @export
* @interface ReqActivityCenterBO
*/
export interface ReqActivityCenterBO {
    
    /**
     * 活动详情 必填
     * @type {string}
     * @memberof ReqActivityCenterBO
     */
    detail?: string

    /**
     * 生效时间 必填
     * @type {string}
     * @memberof ReqActivityCenterBO
     */
    effectiveTime?: string

    /**
     * 活动id 修改时必填
     * @type {number | string}
     * @memberof ReqActivityCenterBO
     */
    id?: number | string

    /**
     * 活动图片 必填
     * @type {string}
     * @memberof ReqActivityCenterBO
     */
    picture?: string

    /**
     * 是否展示在轮播页 0 展示 1不展示
     * @type {number | string}
     * @memberof ReqActivityCenterBO
     */
    showed?: number | string

    /**
     * 活动标题 必填
     * @type {string}
     * @memberof ReqActivityCenterBO
     */
    title?: string

}


/**
* 请求地址
* @export
* @interface ReqAddressBO
*/
export interface ReqAddressBO {
    
    /**
     * 默认地址 1.为默认
     * @type {number | string}
     * @memberof ReqAddressBO
     */
    defaultFlag?: number | string

    /**
     * 详细地址
     * @type {string}
     * @memberof ReqAddressBO
     */
    detailAddress: string

    /**
     * 主键id
     * @type {number | string}
     * @memberof ReqAddressBO
     */
    id?: number | string

    /**
     * 联系人
     * @type {string}
     * @memberof ReqAddressBO
     */
    name: string

    /**
     * 联系电话
     * @type {string}
     * @memberof ReqAddressBO
     */
    phone: string

    /**
     * 所在地区
     * @type {string}
     * @memberof ReqAddressBO
     */
    region: string

    /**
     * 用户id
     * @type {string}
     * @memberof ReqAddressBO
     */
    uuid: string

}


/**
* 空调定时请求类
* @export
* @interface ReqAirConditionBO
*/
export interface ReqAirConditionBO {
    
    /**
     * 延时时间 分钟
     * @type {number | string}
     * @memberof ReqAirConditionBO
     */
    delay?: number | string

    /**
     * 延时分类  0 关机  ，1  开机
     * @type {number | string}
     * @memberof ReqAirConditionBO
     */
    delayType?: number | string

    /**
     * 端点
     * @type {string}
     * @memberof ReqAirConditionBO
     */
    endpoint?: string

    /**
     * 设备id
     * @type {string}
     * @memberof ReqAirConditionBO
     */
    iotId?: string

    /**
     * 子设备id
     * @type {string}
     * @memberof ReqAirConditionBO
     */
    subIotId?: string

}


/**
* 
* @export
* @interface ReqAirSleepBO
*/
export interface ReqAirSleepBO {
    
    /**
     * 
     * @type {string}
     * @memberof ReqAirSleepBO
     */
    devId?: string

    /**
     * 
     * @type {string}
     * @memberof ReqAirSleepBO
     */
    endpoint: string

    /**
     * 
     * @type {number | string}
     * @memberof ReqAirSleepBO
     */
    sleepStatus: number | string

    /**
     * 
     * @type {string}
     * @memberof ReqAirSleepBO
     */
    subdevId?: string

    /**
     * 
     * @type {string}
     * @memberof ReqAirSleepBO
     */
    uuid?: string

}


/**
* 
* @export
* @interface ReqAirSleepCopyBO
*/
export interface ReqAirSleepCopyBO {
    
    /**
     * 复制设备id
     * @type {string}
     * @memberof ReqAirSleepCopyBO
     */
    copyDevId: string

    /**
     * 复制端点id
     * @type {string}
     * @memberof ReqAirSleepCopyBO
     */
    copyEndpoint: string

    /**
     * 复制子设备id
     * @type {string}
     * @memberof ReqAirSleepCopyBO
     */
    copySubdevId: string

    /**
     * 设备id
     * @type {string}
     * @memberof ReqAirSleepCopyBO
     */
    devId: string

    /**
     * 端点id
     * @type {string}
     * @memberof ReqAirSleepCopyBO
     */
    endpoint: string

    /**
     * 子设备id
     * @type {string}
     * @memberof ReqAirSleepCopyBO
     */
    subdevId: string

}


/**
* 
* @export
* @interface ReqAirSleepCustomBO
*/
export interface ReqAirSleepCustomBO {
    
    /**
     * 制冷模式
     * @type {string}
     * @memberof ReqAirSleepCustomBO
     */
    coldMode?: string

    /**
     * 设备id
     * @type {string}
     * @memberof ReqAirSleepCustomBO
     */
    devId: string

    /**
     * 端点id,二合一设备endpoint传空串
     * @type {string}
     * @memberof ReqAirSleepCustomBO
     */
    endpoint: string

    /**
     * 制热模式
     * @type {string}
     * @memberof ReqAirSleepCustomBO
     */
    hotMode?: string

    /**
     * 主键id
     * @type {number | string}
     * @memberof ReqAirSleepCustomBO
     */
    id?: number | string

    /**
     * 子设备id
     * @type {string}
     * @memberof ReqAirSleepCustomBO
     */
    subdevId: string

}


/**
* 
* @export
* @interface ReqAirSleepTempBo
*/
export interface ReqAirSleepTempBo {
    
    /**
     * 
     * @type {string}
     * @memberof ReqAirSleepTempBo
     */
    endpoint?: string

    /**
     * 
     * @type {string}
     * @memberof ReqAirSleepTempBo
     */
    iotId?: string

    /**
     * 
     * @type {string}
     * @memberof ReqAirSleepTempBo
     */
    subIotId?: string

    /**
     * 
     * @type {string}
     * @memberof ReqAirSleepTempBo
     */
    temp?: string

}


/**
* 安吉尔req
* @export
* @interface ReqAngelBO
*/
export interface ReqAngelBO {
    
    /**
     * 控制编码  控制设备时必填
     * @type {number | string}
     * @memberof ReqAngelBO
     */
    cmdId?: number | string

    /**
     * 滤芯防伪码 滤芯重置时传，其它不传
     * @type {string}
     * @memberof ReqAngelBO
     */
    code?: string

    /**
     * 要查询的日期 报表查询是必填
     * @type {string}
     * @memberof ReqAngelBO
     */
    date?: string

    /**
     * 家id 绑定时选填，不填新建家，解绑必填
     * @type {number | string}
     * @memberof ReqAngelBO
     */
    homeId?: number | string

    /**
     * 滤芯位置号 滤芯重置时传，其它不传
     * @type {number | string}
     * @memberof ReqAngelBO
     */
    index?: number | string

    /**
     * sn
     * @type {string}
     * @memberof ReqAngelBO
     */
    sn: string

    /**
     * 操作人名称 控制设备及绑定设备时必填
     * @type {string}
     * @memberof ReqAngelBO
     */
    uuid?: string

}


/**
* app升级请求类
* @export
* @interface ReqAppVersionBO
*/
export interface ReqAppVersionBO {
    
    /**
     * app版本号
     * @type {string}
     * @memberof ReqAppVersionBO
     */
    appVersion?: string

    /**
     * 手机系统平台类型  1：android  2：ios
     * @type {number | string}
     * @memberof ReqAppVersionBO
     */
    phoneType?: number | string

}


/**
* 锅炉请求类
* @export
* @interface ReqBoilerBO
*/
export interface ReqBoilerBO {
    
    /**
     * 锅炉类型 1采暖与生活热水两用 2仅供采暖系统,设定时必填
     * @type {number | string}
     * @memberof ReqBoilerBO
     */
    boilerType?: number | string

    /**
     * 设备id 必填
     * @type {string}
     * @memberof ReqBoilerBO
     */
    iotId?: string

    /**
     * 子设备id 必填
     * @type {string}
     * @memberof ReqBoilerBO
     */
    subIotId?: string

}


/**
* 
* @export
* @interface ReqBoilerEnvironmentBO
*/
export interface ReqBoilerEnvironmentBO {
    
    /**
     * 环境传感器
     * @type {ReqEnvironmentBO}
     * @memberof ReqBoilerEnvironmentBO
     */
    environmentBO?: ReqEnvironmentBO

    /**
     * 网关id
     * @type {string}
     * @memberof ReqBoilerEnvironmentBO
     */
    iotId?: string

    /**
     * 子设备id
     * @type {string}
     * @memberof ReqBoilerEnvironmentBO
     */
    subIotId?: string

    /**
     * 用户id
     * @type {string}
     * @memberof ReqBoilerEnvironmentBO
     */
    uuid?: string

}


/**
* 
* @export
* @interface ReqBoilerLinkageSwitchBo
*/
export interface ReqBoilerLinkageSwitchBo {
    
    /**
     * 设备id
     * @type {string}
     * @memberof ReqBoilerLinkageSwitchBo
     */
    iotId?: string

    /**
     * 温控阀联动自动开关 1.开启，0.未开启
     * @type {number | string}
     * @memberof ReqBoilerLinkageSwitchBo
     */
    linkageSwitch?: number | string

    /**
     * 子设备id
     * @type {string}
     * @memberof ReqBoilerLinkageSwitchBo
     */
    subIotId?: string

    /**
     * 设备类型
     * @type {string}
     * @memberof ReqBoilerLinkageSwitchBo
     */
    type?: string

}


/**
* 
* @export
* @interface ReqBuriedPointBO
*/
export interface ReqBuriedPointBO {
    
    /**
     * app类型 1.IOS,2.ANDROID 3.前端
     * @type {number | string}
     * @memberof ReqBuriedPointBO
     */
    appType: number | string

    /**
     * 埋点当前数值
     * @type {string}
     * @memberof ReqBuriedPointBO
     */
    currentValue?: string

    /**
     * 格式 yyyy-MM-dd HH:mm:ss
     * @type {string}
     * @memberof ReqBuriedPointBO
     */
    date: string

    /**
     * 操作设备填写
     * @type {string}
     * @memberof ReqBuriedPointBO
     */
    endpoint?: string

    /**
     * 
     * @type {number | string}
     * @memberof ReqBuriedPointBO
     */
    eventType?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof ReqBuriedPointBO
     */
    functionType?: number | string

    /**
     * 操作设备填写
     * @type {string}
     * @memberof ReqBuriedPointBO
     */
    iotId?: string

    /**
     * 埋点编号
     * @type {number | string}
     * @memberof ReqBuriedPointBO
     */
    num: number | string

    /**
     * 操作设备填写
     * @type {string}
     * @memberof ReqBuriedPointBO
     */
    subIotId?: string

    /**
     * 操作人id
     * @type {string}
     * @memberof ReqBuriedPointBO
     */
    uuid: string

}


/**
* 
* @export
* @interface ReqBuriedPointListBO
*/
export interface ReqBuriedPointListBO {
    
    /**
     * 1.APP,2.后台, 3.前端
     * @type {number | string}
     * @memberof ReqBuriedPointListBO
     */
    operationType: number | string

    /**
     * 埋点请求实体
     * @type {Array<ReqBuriedPointBO>}
     * @memberof ReqBuriedPointListBO
     */
    reqListBO?: Array<ReqBuriedPointBO>

}


/**
* 命令参数
* @export
* @interface ReqCmdBo
*/
export interface ReqCmdBo {
    
    /**
     * 命令id
     * @type {string}
     * @memberof ReqCmdBo
     */
    cmdId?: string

    /**
     * 命令值
     * @type {string}
     * @memberof ReqCmdBo
     */
    cmdValue?: string

}


/**
* 舒适小百科入参
* @export
* @interface ReqComfortEncyclopediaBO
*/
export interface ReqComfortEncyclopediaBO {
    
    /**
     * 文章id
     * @type {number | string}
     * @memberof ReqComfortEncyclopediaBO
     */
    articleId?: number | string

    /**
     * 来源,1=舒适小百科,2=智能玩法,3=活动中心,默认1
     * @type {number | string}
     * @memberof ReqComfortEncyclopediaBO
     */
    source?: number | string

    /**
     * 热度类型 1点赞 2文章点击
     * @type {number | string}
     * @memberof ReqComfortEncyclopediaBO
     */
    type?: number | string

    /**
     * 用户uuid，点赞必填，点击不填
     * @type {string}
     * @memberof ReqComfortEncyclopediaBO
     */
    uuid?: string

}


/**
* 
* @export
* @interface ReqComfortRoomBO
*/
export interface ReqComfortRoomBO {
    
    /**
     * 执行动作
     * @type {string}
     * @memberof ReqComfortRoomBO
     */
    actionData?: string

    /**
     * 1.制冷,2.制热,5.恒温恒湿
     * @type {number | string}
     * @memberof ReqComfortRoomBO
     */
    comfortType?: number | string

    /**
     * 条件数据
     * @type {string}
     * @memberof ReqComfortRoomBO
     */
    conditionData: string

    /**
     * 生效天 格式:1,1,1,1,1,1,1
     * @type {string}
     * @memberof ReqComfortRoomBO
     */
    effectDay?: string

    /**
     * 生效结束时间 HH:mm:ss
     * @type {string}
     * @memberof ReqComfortRoomBO
     */
    effectEndTime?: string

    /**
     * 生效开始时间 HH:mm:ss
     * @type {string}
     * @memberof ReqComfortRoomBO
     */
    effectStartTime?: string

    /**
     * 生效类型 1.生效，2.不生效
     * @type {number | string}
     * @memberof ReqComfortRoomBO
     */
    effectTimeState?: number | string

    /**
     * 家id
     * @type {number | string}
     * @memberof ReqComfortRoomBO
     */
    homeId: number | string

    /**
     * 场景id
     * @type {number | string}
     * @memberof ReqComfortRoomBO
     */
    id?: number | string

    /**
     * 手机号
     * @type {string}
     * @memberof ReqComfortRoomBO
     */
    phone?: string

    /**
     * 房间id
     * @type {number | string}
     * @memberof ReqComfortRoomBO
     */
    roomId: number | string

    /**
     * 启用类型 1.生效，2.不生效
     * @type {number | string}
     * @memberof ReqComfortRoomBO
     */
    startState: number | string

    /**
     * 目标湿度
     * @type {number | string}
     * @memberof ReqComfortRoomBO
     */
    targetHumidity?: number | string

    /**
     * 目标温度
     * @type {number | string}
     * @memberof ReqComfortRoomBO
     */
    targetTemperature?: number | string

}


/**
* 客服中心请求类
* @export
* @interface ReqCustomerServicePhoneBO
*/
export interface ReqCustomerServicePhoneBO {
    
    /**
     * 当前家庭
     * @type {number | string}
     * @memberof ReqCustomerServicePhoneBO
     */
    homeId?: number | string

    /**
     * 手机类型 android ios
     * @type {string}
     * @memberof ReqCustomerServicePhoneBO
     */
    phoneType?: string

    /**
     * 用户id
     * @type {string}
     * @memberof ReqCustomerServicePhoneBO
     */
    uuid?: string

}


/**
* 删除入参
* @export
* @interface ReqDelBo
*/
export interface ReqDelBo {
    
    /**
     * id
     * @type {number | string}
     * @memberof ReqDelBo
     */
    id: number | string

    /**
     * 操作人名称
     * @type {string}
     * @memberof ReqDelBo
     */
    operateUserName: string

}


/**
* 
* @export
* @interface ReqDeviceDictBO
*/
export interface ReqDeviceDictBO {
    
    /**
     * 设备名称
     * @type {string}
     * @memberof ReqDeviceDictBO
     */
    deviceName?: string

    /**
     * 厂家id
     * @type {number | string}
     * @memberof ReqDeviceDictBO
     */
    factoryId?: number | string

    /**
     * 产品key
     * @type {string}
     * @memberof ReqDeviceDictBO
     */
    productKey?: string

    /**
     * 种类 0：全部 1:智能网关 2：智能门锁 3：智能开关 4：智能传感器类
     * @type {number | string}
     * @memberof ReqDeviceDictBO
     */
    type?: number | string

    /**
     * 设备版本号 备分组列表
     * @type {number | string}
     * @memberof ReqDeviceDictBO
     */
    version?: number | string

}


/**
* 设备离线通知请求类
* @export
* @interface ReqDeviceDownlinePushBO
*/
export interface ReqDeviceDownlinePushBO {
    
    /**
     * 设备id
     * @type {string}
     * @memberof ReqDeviceDownlinePushBO
     */
    iotId?: string

    /**
     * 开关状态 1.开启 0.关闭
     * @type {number | string}
     * @memberof ReqDeviceDownlinePushBO
     */
    status?: number | string

    /**
     * 子设备id
     * @type {string}
     * @memberof ReqDeviceDownlinePushBO
     */
    subIotId?: string

}


/**
* 配网统计记录
* @export
* @interface ReqDeviceNetworkRecordBO
*/
export interface ReqDeviceNetworkRecordBO {
    
    /**
     * 家庭地址
     * @type {string}
     * @memberof ReqDeviceNetworkRecordBO
     */
    homeAddress?: string

    /**
     * 家id
     * @type {string}
     * @memberof ReqDeviceNetworkRecordBO
     */
    homeId: string

    /**
     * 设备id
     * @type {string}
     * @memberof ReqDeviceNetworkRecordBO
     */
    iotId?: string

    /**
     * 手机号
     * @type {string}
     * @memberof ReqDeviceNetworkRecordBO
     */
    phone: string

    /**
     * 结果 1.成功,2.失败
     * @type {number | string}
     * @memberof ReqDeviceNetworkRecordBO
     */
    result: number | string

    /**
     * 来源 1.ios,2.android
     * @type {number | string}
     * @memberof ReqDeviceNetworkRecordBO
     */
    source: number | string

    /**
     * 子设备id
     * @type {string}
     * @memberof ReqDeviceNetworkRecordBO
     */
    subIotId?: string

    /**
     * 设备类型
     * @type {string}
     * @memberof ReqDeviceNetworkRecordBO
     */
    type: string

}


/**
* 
* @export
* @interface ReqDeviceSortBO
*/
export interface ReqDeviceSortBO {
    
    /**
     * 端点
     * @type {string}
     * @memberof ReqDeviceSortBO
     */
    endpoint?: string

    /**
     * 设备id
     * @type {string}
     * @memberof ReqDeviceSortBO
     */
    iotId?: string

    /**
     * 顺序号
     * @type {number | string}
     * @memberof ReqDeviceSortBO
     */
    sort?: number | string

    /**
     * 子设备id
     * @type {string}
     * @memberof ReqDeviceSortBO
     */
    subIotId?: string

    /**
     * 设备类型
     * @type {string}
     * @memberof ReqDeviceSortBO
     */
    type?: string

}


/**
* 
* @export
* @interface ReqDeviceTypeBO
*/
export interface ReqDeviceTypeBO {
    
    /**
     * 
     * @type {number | string}
     * @memberof ReqDeviceTypeBO
     */
    factoryId?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof ReqDeviceTypeBO
     */
    type?: number | string

    /**
     * 
     * @type {string}
     * @memberof ReqDeviceTypeBO
     */
    typeName?: string

}


/**
* 
* @export
* @interface ReqDinRealtedDeviceBO
*/
export interface ReqDinRealtedDeviceBO {
    
    /**
     * 
     * @type {Array<DinRealtedDevicePO>}
     * @memberof ReqDinRealtedDeviceBO
     */
    dinRealtedDevicelist?: Array<DinRealtedDevicePO>

    /**
     * 
     * @type {string}
     * @memberof ReqDinRealtedDeviceBO
     */
    subIotId?: string

}


/**
* 
* @export
* @interface ReqDistributeNetworkGuideBO
*/
export interface ReqDistributeNetworkGuideBO {
    
    /**
     * 
     * @type {string}
     * @memberof ReqDistributeNetworkGuideBO
     */
    description?: string

    /**
     * 
     * @type {string}
     * @memberof ReqDistributeNetworkGuideBO
     */
    image?: string

    /**
     * 
     * @type {string}
     * @memberof ReqDistributeNetworkGuideBO
     */
    productKey?: string

    /**
     * 
     * @type {number | string}
     * @memberof ReqDistributeNetworkGuideBO
     */
    step?: number | string

}


/**
* 
* @export
* @interface ReqElectricFeeBO
*/
export interface ReqElectricFeeBO {
    
    /**
     * 
     * @type {Array<PeakValleyFee>}
     * @memberof ReqElectricFeeBO
     */
    electricLists?: Array<PeakValleyFee>

    /**
     * 
     * @type {number | string}
     * @memberof ReqElectricFeeBO
     */
    electricType?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof ReqElectricFeeBO
     */
    fixPrice?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof ReqElectricFeeBO
     */
    id?: number | string

    /**
     * 
     * @type {string}
     * @memberof ReqElectricFeeBO
     */
    subIotId?: string

}


/**
* 
* @export
* @interface ReqEnvironmentBO
*/
export interface ReqEnvironmentBO {
    
    /**
     * 环境传感器id
     * @type {string}
     * @memberof ReqEnvironmentBO
     */
    environmentIotId?: string

    /**
     * 环境传感器子设备id
     * @type {string}
     * @memberof ReqEnvironmentBO
     */
    environmentSubIotId?: string

}


/**
* 用户最爱入参
* @export
* @interface ReqFavDeviceBo
*/
export interface ReqFavDeviceBo {
    
    /**
     * 设备id
     * @type {string}
     * @memberof ReqFavDeviceBo
     */
    devId: string

    /**
     * 端点,空调必传
     * @type {string}
     * @memberof ReqFavDeviceBo
     */
    endpoint?: string

    /**
     * 当前所属家id
     * @type {number | string}
     * @memberof ReqFavDeviceBo
     */
    homeId: number | string

    /**
     * 子设备id
     * @type {string}
     * @memberof ReqFavDeviceBo
     */
    subDevId: string

    /**
     * 设备类型,1=空调 2=地暖 3=新风机
     * @type {number | string}
     * @memberof ReqFavDeviceBo
     */
    type: number | string

}


/**
* 
* @export
* @interface ReqFeedbackDingBo
*/
export interface ReqFeedbackDingBo {
    
    /**
     * 
     * @type {Array<string>}
     * @memberof ReqFeedbackDingBo
     */
    messages?: Array<string>

    /**
     * 
     * @type {string}
     * @memberof ReqFeedbackDingBo
     */
    phone?: string

    /**
     * 
     * @type {string}
     * @memberof ReqFeedbackDingBo
     */
    uuid?: string

}


/**
* 
* @export
* @interface ReqFloorHeatBO
*/
export interface ReqFloorHeatBO {
    
    /**
     * 自定义日1
     * @type {Array<FloorProgramm>}
     * @memberof ReqFloorHeatBO
     */
    custom1List?: Array<FloorProgramm>

    /**
     * 自定义日1名称
     * @type {string}
     * @memberof ReqFloorHeatBO
     */
    custom1Name?: string

    /**
     * 自定义日2
     * @type {Array<FloorProgramm>}
     * @memberof ReqFloorHeatBO
     */
    custom2List?: Array<FloorProgramm>

    /**
     * 自定义日2名称
     * @type {string}
     * @memberof ReqFloorHeatBO
     */
    custom2Name?: string

    /**
     * 自定义日期
     * @type {string}
     * @memberof ReqFloorHeatBO
     */
    effectDays?: string

    /**
     * 自定义日列表
     * @type {Array<ReqFloorHeatCalendarBO>}
     * @memberof ReqFloorHeatBO
     */
    floorHeatCalendarBOs?: Array<ReqFloorHeatCalendarBO>

    /**
     * 休息日
     * @type {Array<FloorProgramm>}
     * @memberof ReqFloorHeatBO
     */
    holidayList?: Array<FloorProgramm>

    /**
     * 网关id
     * @type {string}
     * @memberof ReqFloorHeatBO
     */
    iotId: string

    /**
     * 子设备id
     * @type {string}
     * @memberof ReqFloorHeatBO
     */
    subIotId: string

    /**
     * 工作日
     * @type {Array<FloorProgramm>}
     * @memberof ReqFloorHeatBO
     */
    workDayList?: Array<FloorProgramm>

    /**
     * 自定义月份
     * @type {string}
     * @memberof ReqFloorHeatBO
     */
    yyyymm?: string

}


/**
* 
* @export
* @interface ReqFloorHeatCalendarBO
*/
export interface ReqFloorHeatCalendarBO {
    
    /**
     * 自定义日 1,2,3,1
     * @type {string}
     * @memberof ReqFloorHeatCalendarBO
     */
    effectDays?: string

    /**
     * 日期 yyyymm
     * @type {string}
     * @memberof ReqFloorHeatCalendarBO
     */
    yyyymm?: string

}


/**
* 
* @export
* @interface ReqFloorHeatCopyBO
*/
export interface ReqFloorHeatCopyBO {
    
    /**
     * 被复制的设备id
     * @type {string}
     * @memberof ReqFloorHeatCopyBO
     */
    copyIotId: string

    /**
     * 被复制的子设备id
     * @type {string}
     * @memberof ReqFloorHeatCopyBO
     */
    copySubIotId: string

    /**
     * 设备id
     * @type {string}
     * @memberof ReqFloorHeatCopyBO
     */
    iotId: string

    /**
     * 子设备id
     * @type {string}
     * @memberof ReqFloorHeatCopyBO
     */
    subIotId: string

}


/**
* 
* @export
* @interface ReqFloorHeatDelBO
*/
export interface ReqFloorHeatDelBO {
    
    /**
     * 参数day
     * @type {number | string}
     * @memberof ReqFloorHeatDelBO
     */
    day: number | string

    /**
     * 网关id
     * @type {string}
     * @memberof ReqFloorHeatDelBO
     */
    iotId: string

    /**
     * 子设备id
     * @type {string}
     * @memberof ReqFloorHeatDelBO
     */
    subIotId: string

}


/**
* 果麦请求类
* @export
* @interface ReqGmBO
*/
export interface ReqGmBO {
    
    /**
     * 果麦分给好享家的id 后台使用
     * @type {string}
     * @memberof ReqGmBO
     */
    appid?: string

    /**
     * 节能模式 1节能模式 2普通模式 修改节能模式时必填
     * @type {number | string}
     * @memberof ReqGmBO
     */
    energySaving?: number | string

    /**
     * 家id，绑定时选填，不填新建家
     * @type {number | string}
     * @memberof ReqGmBO
     */
    homeId?: number | string

    /**
     * 模式   sleep/auto/manual 改变模式时必填
     * @type {string}
     * @memberof ReqGmBO
     */
    mode?: string

    /**
     * 开启辅热  1000W(warm)/500W(cosy)/关(off) 开辅热时必填
     * @type {string}
     * @memberof ReqGmBO
     */
    operation?: string

    /**
     * 设备码 必填
     * @type {string}
     * @memberof ReqGmBO
     */
    qrcode?: string

    /**
     * 风速 改变风速时必填 60-420
     * @type {number | string}
     * @memberof ReqGmBO
     */
    speed?: number | string

    /**
     * 用户id，绑定时必传
     * @type {string}
     * @memberof ReqGmBO
     */
    uuid?: string

    /**
     * 动作  开启(on)，关闭(off) 操作时必填
     * @type {string}
     * @memberof ReqGmBO
     */
    value?: string

}


/**
* 帮助中心保存修改类
* @export
* @interface ReqHelpCenterBO
*/
export interface ReqHelpCenterBO {
    
    /**
     * 问题主键
     * @type {string}
     * @memberof ReqHelpCenterBO
     */
    answer: string

    /**
     * 主键id 新增时为空保存。不为空修改
     * @type {number | string}
     * @memberof ReqHelpCenterBO
     */
    id?: number | string

    /**
     * 问题标题
     * @type {string}
     * @memberof ReqHelpCenterBO
     */
    question: string

    /**
     * 问题类目id
     * @type {number | string}
     * @memberof ReqHelpCenterBO
     */
    questionId: number | string

    /**
     * 设备类型 ， 若类目全部设备及智能音箱时必填
     * @type {string}
     * @memberof ReqHelpCenterBO
     */
    type?: string

}


/**
* 家庭请求类
* @export
* @interface ReqHomeBO
*/
export interface ReqHomeBO {
    
    /**
     * 城市名称
     * @type {string}
     * @memberof ReqHomeBO
     */
    cityName?: string

    /**
     * 删除标识：0未删除，1删除
     * @type {number | string}
     * @memberof ReqHomeBO
     */
    deleted?: number | string

    /**
     * 家id
     * @type {number | string}
     * @memberof ReqHomeBO
     */
    homeId?: number | string

    /**
     * 家庭位置
     * @type {string}
     * @memberof ReqHomeBO
     */
    homeLocation?: string

    /**
     * 家庭名称
     * @type {string}
     * @memberof ReqHomeBO
     */
    homeName?: string

    /**
     * 主键id
     * @type {number | string}
     * @memberof ReqHomeBO
     */
    id?: number | string

    /**
     * 家庭经纬度
     * @type {string}
     * @memberof ReqHomeBO
     */
    longitudeLatitude?: string

    /**
     * 要转让管理员的接收者
     * @type {string}
     * @memberof ReqHomeBO
     */
    receiver?: string

    /**
     * 设备类型
     * @type {string}
     * @memberof ReqHomeBO
     */
    type?: string

    /**
     * 用户id
     * @type {string}
     * @memberof ReqHomeBO
     */
    uuid?: string

}


/**
* 
* @export
* @interface ReqHomeComfortBO
*/
export interface ReqHomeComfortBO {
    
    /**
     * 
     * @type {number | string}
     * @memberof ReqHomeComfortBO
     */
    homeId: number | string

    /**
     * 
     * @type {number | string}
     * @memberof ReqHomeComfortBO
     */
    modeType: number | string

}


/**
* 
* @export
* @interface ReqHomeDetailBO
*/
export interface ReqHomeDetailBO {
    
    /**
     * 
     * @type {number | string}
     * @memberof ReqHomeDetailBO
     */
    familyPopulation?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof ReqHomeDetailBO
     */
    floor?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof ReqHomeDetailBO
     */
    glassLayer?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof ReqHomeDetailBO
     */
    homeId?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof ReqHomeDetailBO
     */
    id?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof ReqHomeDetailBO
     */
    insulationLayer?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof ReqHomeDetailBO
     */
    size?: number | string

}


/**
* 
* @export
* @interface ReqHomeDeviceBindBO
*/
export interface ReqHomeDeviceBindBO {
    
    /**
     * 
     * @type {number | string}
     * @memberof ReqHomeDeviceBindBO
     */
    homeId?: number | string

    /**
     * 
     * @type {string}
     * @memberof ReqHomeDeviceBindBO
     */
    iotId?: string

}


/**
* 智慧空气参数
* @export
* @interface ReqIAirEnvDelBo
*/
export interface ReqIAirEnvDelBo {
    
    /**
     * 
     * @type {string}
     * @memberof ReqIAirEnvDelBo
     */
    envIotId?: string

    /**
     * 
     * @type {string}
     * @memberof ReqIAirEnvDelBo
     */
    envSubIotId?: string

}


/**
* 智慧空气参数
* @export
* @interface ReqIAirInfoBo
*/
export interface ReqIAirInfoBo {
    
    /**
     * 新风设备id
     * @type {string}
     * @memberof ReqIAirInfoBo
     */
    airIotId: string

    /**
     * 新风子设备id
     * @type {string}
     * @memberof ReqIAirInfoBo
     */
    airSubIotId: string

}


/**
* 保存智慧空气入参
* @export
* @interface ReqIAirSaveBo
*/
export interface ReqIAirSaveBo {
    
    /**
     * 新风设备名称
     * @type {string}
     * @memberof ReqIAirSaveBo
     */
    airDeviceName: string

    /**
     * 新风设备id
     * @type {string}
     * @memberof ReqIAirSaveBo
     */
    airIotId: string

    /**
     * 新风子设备id
     * @type {string}
     * @memberof ReqIAirSaveBo
     */
    airSubIotId: string

    /**
     * 环境传感器设备名称
     * @type {string}
     * @memberof ReqIAirSaveBo
     */
    envDeviceName: string

    /**
     * 环境传感器设备type
     * @type {string}
     * @memberof ReqIAirSaveBo
     */
    envDeviceType: string

    /**
     * 环境传感器设备id
     * @type {string}
     * @memberof ReqIAirSaveBo
     */
    envIotId: string

    /**
     * 环境传感器子设备id
     * @type {string}
     * @memberof ReqIAirSaveBo
     */
    envSubIotId: string

}


/**
* 智慧空气开关入参
* @export
* @interface ReqIAirSwitchBo
*/
export interface ReqIAirSwitchBo {
    
    /**
     * 新风设备id
     * @type {string}
     * @memberof ReqIAirSwitchBo
     */
    airIotId: string

    /**
     * 新风子设备id
     * @type {string}
     * @memberof ReqIAirSwitchBo
     */
    airSubIotId: string

    /**
     * 智能空气开关,1=开启,0=关闭
     * @type {string}
     * @memberof ReqIAirSwitchBo
     */
    airSwitch: string

    /**
     * 操作人名称
     * @type {string}
     * @memberof ReqIAirSwitchBo
     */
    operator?: string

}


/**
* 新增编辑智能玩法入参
* @export
* @interface ReqIPlaySaveBo
*/
export interface ReqIPlaySaveBo {
    
    /**
     * 内容
     * @type {string}
     * @memberof ReqIPlaySaveBo
     */
    content: string

    /**
     * 生效时间
     * @type {string}
     * @memberof ReqIPlaySaveBo
     */
    effectiveTime: string

    /**
     * 列表图片
     * @type {string}
     * @memberof ReqIPlaySaveBo
     */
    iconUrl: string

    /**
     * 序号-编辑时必传
     * @type {number | string}
     * @memberof ReqIPlaySaveBo
     */
    id?: number | string

    /**
     * 操作人
     * @type {string}
     * @memberof ReqIPlaySaveBo
     */
    operateUserName: string

    /**
     * 标题
     * @type {string}
     * @memberof ReqIPlaySaveBo
     */
    title: string

}


/**
* 入库设备
* @export
* @interface ReqIotDeviceBO
*/
export interface ReqIotDeviceBO {
    
    /**
     * [查询条件]批次号
     * @type {string}
     * @memberof ReqIotDeviceBO
     */
    batchNo?: string

    /**
     * 渠道来源 0零售 1工程
     * @type {number | string}
     * @memberof ReqIotDeviceBO
     */
    deviceChannel?: number | string

    /**
     * 设备名称
     * @type {string}
     * @memberof ReqIotDeviceBO
     */
    deviceName?: string

    /**
     * 设备秘钥
     * @type {string}
     * @memberof ReqIotDeviceBO
     */
    deviceSecret?: string

    /**
     * 
     * @type {number | string}
     * @memberof ReqIotDeviceBO
     */
    factoryId: number | string

    /**
     * [查询条件]设备id
     * @type {string}
     * @memberof ReqIotDeviceBO
     */
    iotId?: string

    /**
     * 入网时间
     * @type {string}
     * @memberof ReqIotDeviceBO
     */
    netDate?: string

    /**
     * [查询条件]是否无版本号,勾选了则传1
     * @type {number | string}
     * @memberof ReqIotDeviceBO
     */
    noVersion?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof ReqIotDeviceBO
     */
    nodeType: number | string

    /**
     * 
     * @type {string}
     * @memberof ReqIotDeviceBO
     */
    productKey?: string

    /**
     * 入库时间
     * @type {string}
     * @memberof ReqIotDeviceBO
     */
    storeDate?: string

    /**
     * 版本号
     * @type {string}
     * @memberof ReqIotDeviceBO
     */
    version?: string

}


/**
* 
* @export
* @interface ReqMongoBO
*/
export interface ReqMongoBO {
    
    /**
     * 
     * @type {string}
     * @memberof ReqMongoBO
     */
    endpoint?: string

    /**
     * 
     * @type {string}
     * @memberof ReqMongoBO
     */
    iotId?: string

    /**
     * 
     * @type {number | string}
     * @memberof ReqMongoBO
     */
    messageType?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof ReqMongoBO
     */
    pageNumber?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof ReqMongoBO
     */
    pageSize?: number | string

    /**
     * 
     * @type {string}
     * @memberof ReqMongoBO
     */
    startDate?: string

    /**
     * 
     * @type {string}
     * @memberof ReqMongoBO
     */
    status?: string

    /**
     * 
     * @type {string}
     * @memberof ReqMongoBO
     */
    subIotId?: string

    /**
     * 
     * @type {string}
     * @memberof ReqMongoBO
     */
    subType?: string

    /**
     * 
     * @type {string}
     * @memberof ReqMongoBO
     */
    uuid?: string

}


/**
* 
* @export
* @interface ReqOutboundExcelBO
*/
export interface ReqOutboundExcelBO {
    
    /**
     * 
     * @type {number | string}
     * @memberof ReqOutboundExcelBO
     */
    amount: number | string

    /**
     * 
     * @type {string}
     * @memberof ReqOutboundExcelBO
     */
    dealer?: string

    /**
     * 
     * @type {string}
     * @memberof ReqOutboundExcelBO
     */
    dealerPhone?: string

    /**
     * 
     * @type {string}
     * @memberof ReqOutboundExcelBO
     */
    deviceCategory?: string

    /**
     * 
     * @type {string}
     * @memberof ReqOutboundExcelBO
     */
    deviceType?: string

    /**
     * 
     * @type {string}
     * @memberof ReqOutboundExcelBO
     */
    iotId?: string

    /**
     * 
     * @type {string}
     * @memberof ReqOutboundExcelBO
     */
    outboundTime?: string

    /**
     * 
     * @type {string}
     * @memberof ReqOutboundExcelBO
     */
    outboundType?: string

    /**
     * 
     * @type {string}
     * @memberof ReqOutboundExcelBO
     */
    reason?: string

}


/**
* 
* @export
* @interface ReqOutboundListBO
*/
export interface ReqOutboundListBO {
    
    /**
     * 
     * @type {string}
     * @memberof ReqOutboundListBO
     */
    phone?: string

}


/**
* 
* @export
* @interface ReqOutboundSaveBO
*/
export interface ReqOutboundSaveBO {
    
    /**
     * 出库数量
     * @type {number | string}
     * @memberof ReqOutboundSaveBO
     */
    amount?: number | string

    /**
     * 经销商
     * @type {string}
     * @memberof ReqOutboundSaveBO
     */
    dealer?: string

    /**
     * 经销商电话
     * @type {string}
     * @memberof ReqOutboundSaveBO
     */
    dealerPhone?: string

    /**
     * 设备类目
     * @type {string}
     * @memberof ReqOutboundSaveBO
     */
    deviceCategory?: string

    /**
     * 设备型号
     * @type {string}
     * @memberof ReqOutboundSaveBO
     */
    deviceType?: string

    /**
     * 设备id
     * @type {string}
     * @memberof ReqOutboundSaveBO
     */
    iotId?: string

    /**
     * 操作人
     * @type {string}
     * @memberof ReqOutboundSaveBO
     */
    operateId?: string

    /**
     * 出库类型
     * @type {string}
     * @memberof ReqOutboundSaveBO
     */
    outboundType?: string

}


/**
* 
* @export
* @interface ReqOutboundUpdateBO
*/
export interface ReqOutboundUpdateBO {
    
    /**
     * 主键id
     * @type {number | string}
     * @memberof ReqOutboundUpdateBO
     */
    id?: number | string

    /**
     * 出库类型
     * @type {string}
     * @memberof ReqOutboundUpdateBO
     */
    outboundType?: string

}


/**
* 
* @export
* @interface ReqOutboundUpdateDeviceOnlineBO
*/
export interface ReqOutboundUpdateDeviceOnlineBO {
    
    /**
     * 设备状态
     * @type {number | string}
     * @memberof ReqOutboundUpdateDeviceOnlineBO
     */
    deviceOnline?: number | string

    /**
     * iotId
     * @type {string}
     * @memberof ReqOutboundUpdateDeviceOnlineBO
     */
    iotId?: string

}


/**
* 首页弹窗广告后台新增入参
* @export
* @interface ReqPopUpSaveBo
*/
export interface ReqPopUpSaveBo {
    
    /**
     * 活动id,跳转类型=1时必填
     * @type {number | string}
     * @memberof ReqPopUpSaveBo
     */
    activityId?: number | string

    /**
     * 弹窗广告id,更新时必传
     * @type {number | string}
     * @memberof ReqPopUpSaveBo
     */
    id?: number | string

    /**
     * 操作人
     * @type {string}
     * @memberof ReqPopUpSaveBo
     */
    operator: string

    /**
     * 弹窗图片
     * @type {string}
     * @memberof ReqPopUpSaveBo
     */
    picture: string

    /**
     * 跳转类型,1=活动页 2=指定链接
     * @type {number | string}
     * @memberof ReqPopUpSaveBo
     */
    redirectType: number | string

    /**
     * 指定跳转链接,跳转类型=2时必填
     * @type {string}
     * @memberof ReqPopUpSaveBo
     */
    redirectUrl?: string

    /**
     * 标题
     * @type {string}
     * @memberof ReqPopUpSaveBo
     */
    title: string

}


/**
* 智能预测升温开关入参
* @export
* @interface ReqPreTempSwitchBO
*/
export interface ReqPreTempSwitchBO {
    
    /**
     * 网关id
     * @type {string}
     * @memberof ReqPreTempSwitchBO
     */
    iotId: string

    /**
     * 是否开启,1=开启 0=关闭
     * @type {string}
     * @memberof ReqPreTempSwitchBO
     */
    openFlag: string

    /**
     * 子设备id
     * @type {string}
     * @memberof ReqPreTempSwitchBO
     */
    subIotId: string

}


/**
* 
* @export
* @interface ReqPushDeviceBO
*/
export interface ReqPushDeviceBO {
    
    /**
     * 网关id
     * @type {string}
     * @memberof ReqPushDeviceBO
     */
    iotId: string

    /**
     * 开关状态 1.开启 0.关闭
     * @type {number | string}
     * @memberof ReqPushDeviceBO
     */
    status?: number | string

    /**
     * 子设备id
     * @type {string}
     * @memberof ReqPushDeviceBO
     */
    subIotId: string

    /**
     * 用户id
     * @type {string}
     * @memberof ReqPushDeviceBO
     */
    uuid?: string

}


/**
* 推送免打扰请求类
* @export
* @interface ReqPushDndBO
*/
export interface ReqPushDndBO {
    
    /**
     * 免打扰结束时间 格式 HH:mm 必填
     * @type {string}
     * @memberof ReqPushDndBO
     */
    endTime?: string

    /**
     * 免打扰开始时间 格式 HH:mm 必填
     * @type {string}
     * @memberof ReqPushDndBO
     */
    startTime?: string

    /**
     * 启用状态 0启用 1未启用 必填
     * @type {string}
     * @memberof ReqPushDndBO
     */
    state?: string

    /**
     * 用户id 必填
     * @type {string}
     * @memberof ReqPushDndBO
     */
    uuid?: string

}


/**
* 新增消息推送入参
* @export
* @interface ReqPushSaveBo
*/
export interface ReqPushSaveBo {
    
    /**
     * 消息通知的内容
     * @type {string}
     * @memberof ReqPushSaveBo
     */
    content?: string

    /**
     * 序号,编辑时必填
     * @type {number | string}
     * @memberof ReqPushSaveBo
     */
    id?: number | string

    /**
     * 操作人手机号账号
     * @type {string}
     * @memberof ReqPushSaveBo
     */
    operateAccount?: string

    /**
     * 操作人
     * @type {string}
     * @memberof ReqPushSaveBo
     */
    operateUserName?: string

    /**
     * 推送时间
     * @type {string}
     * @memberof ReqPushSaveBo
     */
    pushTime?: string

    /**
     * 点击消息跳转类型 1=应用 2=应用内页面 3=h5页面
     * @type {number | string}
     * @memberof ReqPushSaveBo
     */
    redirectType?: number | string

    /**
     * 跳转路径
     * @type {string}
     * @memberof ReqPushSaveBo
     */
    redirectUrl?: string

    /**
     * 目标用户 1=所有用户 2=有效家庭的管理员
     * @type {number | string}
     * @memberof ReqPushSaveBo
     */
    target?: number | string

    /**
     * 消息主题
     * @type {string}
     * @memberof ReqPushSaveBo
     */
    theme?: string

}


/**
* 
* @export
* @interface ReqRoomBO
*/
export interface ReqRoomBO {
    
    /**
     * 
     * @type {number | string}
     * @memberof ReqRoomBO
     */
    bigSwitch?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof ReqRoomBO
     */
    homeId?: number | string

    /**
     * 
     * @type {string}
     * @memberof ReqRoomBO
     */
    roomIcon?: string

    /**
     * 
     * @type {number | string}
     * @memberof ReqRoomBO
     */
    roomId?: number | string

    /**
     * 
     * @type {string}
     * @memberof ReqRoomBO
     */
    roomIds?: string

    /**
     * 
     * @type {string}
     * @memberof ReqRoomBO
     */
    roomName?: string

    /**
     * 
     * @type {number | string}
     * @memberof ReqRoomBO
     */
    roomSize?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof ReqRoomBO
     */
    sort?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof ReqRoomBO
     */
    window?: number | string

}


/**
* 
* @export
* @interface ReqRoomDeviceBindBO
*/
export interface ReqRoomDeviceBindBO {
    
    /**
     * 
     * @type {string}
     * @memberof ReqRoomDeviceBindBO
     */
    createTime?: string

    /**
     * 
     * @type {string}
     * @memberof ReqRoomDeviceBindBO
     */
    endpoint?: string

    /**
     * 
     * @type {string}
     * @memberof ReqRoomDeviceBindBO
     */
    iotId: string

    /**
     * 
     * @type {number | string}
     * @memberof ReqRoomDeviceBindBO
     */
    newRoomId?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof ReqRoomDeviceBindBO
     */
    roomId?: number | string

    /**
     * 
     * @type {string}
     * @memberof ReqRoomDeviceBindBO
     */
    subIotId: string

    /**
     * 
     * @type {string}
     * @memberof ReqRoomDeviceBindBO
     */
    type?: string

    /**
     * 
     * @type {string}
     * @memberof ReqRoomDeviceBindBO
     */
    updateTime?: string

}


/**
* 舒适小百科新增编辑入参
* @export
* @interface ReqSaveBo
*/
export interface ReqSaveBo {
    
    /**
     * 内容
     * @type {string}
     * @memberof ReqSaveBo
     */
    body?: string

    /**
     * 生效时间
     * @type {string}
     * @memberof ReqSaveBo
     */
    effectiveTime?: string

    /**
     * 舒适百科id,编辑时必传
     * @type {number | string}
     * @memberof ReqSaveBo
     */
    id?: number | string

    /**
     * 操作人
     * @type {string}
     * @memberof ReqSaveBo
     */
    operator?: string

    /**
     * 列表图片
     * @type {string}
     * @memberof ReqSaveBo
     */
    picture?: string

    /**
     * 标题
     * @type {string}
     * @memberof ReqSaveBo
     */
    title?: string

}


/**
* 
* @export
* @interface ReqSceneBO
*/
export interface ReqSceneBO {
    
    /**
     * 添加动作
     * @type {string}
     * @memberof ReqSceneBO
     */
    actionData?: string

    /**
     * 添加条件
     * @type {string}
     * @memberof ReqSceneBO
     */
    conditionData?: string

    /**
     * 条件逻辑：1.与，2.或
     * @type {number | string}
     * @memberof ReqSceneBO
     */
    conditionLogic?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof ReqSceneBO
     */
    conditionResult?: number | string

    /**
     * 生效天 格式:1,1,1,1,1,1,1  周一开始
     * @type {string}
     * @memberof ReqSceneBO
     */
    effectDay?: string

    /**
     * 生效结束时间 HH:mm:ss
     * @type {string}
     * @memberof ReqSceneBO
     */
    effectEndTime?: string

    /**
     * 生效开始时间 HH:mm:ss
     * @type {string}
     * @memberof ReqSceneBO
     */
    effectStartTime?: string

    /**
     * 生效类型 1.生效，2.不生效
     * @type {number | string}
     * @memberof ReqSceneBO
     */
    effectTimeState?: number | string

    /**
     * 执行类型 1.手动，2.自动
     * @type {number | string}
     * @memberof ReqSceneBO
     */
    executeType?: number | string

    /**
     * 家id
     * @type {number | string}
     * @memberof ReqSceneBO
     */
    homeId?: number | string

    /**
     * 场景id 修改写
     * @type {number | string}
     * @memberof ReqSceneBO
     */
    id?: number | string

    /**
     * 是否展示 0：展示 ，1 不展示
     * @type {number | string}
     * @memberof ReqSceneBO
     */
    isDisplay?: number | string

    /**
     * 手机号
     * @type {string}
     * @memberof ReqSceneBO
     */
    phone?: string

    /**
     * 场景图标
     * @type {string}
     * @memberof ReqSceneBO
     */
    sceneIcon?: string

    /**
     * 场景名称
     * @type {string}
     * @memberof ReqSceneBO
     */
    sceneName?: string

    /**
     * 1.回家，2.离家，3.起床，4.睡眠，5.室内温度高，6.室内温度低，7.自定义
     * @type {number | string}
     * @memberof ReqSceneBO
     */
    sceneType?: number | string

    /**
     * 启用类型 1.生效，2.不生效
     * @type {number | string}
     * @memberof ReqSceneBO
     */
    startState?: number | string

    /**
     * 用户id
     * @type {string}
     * @memberof ReqSceneBO
     */
    uuid?: string

}


/**
* 
* @export
* @interface ReqSceneConditionResultBO
*/
export interface ReqSceneConditionResultBO {
    
    /**
     * 条件结果
     * @type {number | string}
     * @memberof ReqSceneConditionResultBO
     */
    conditionResult?: number | string

    /**
     * 场景id 修改写
     * @type {number | string}
     * @memberof ReqSceneConditionResultBO
     */
    id?: number | string

}


/**
* 场景日志请求类
* @export
* @interface ReqSceneMongoBO
*/
export interface ReqSceneMongoBO {
    
    /**
     * 家id
     * @type {number | string}
     * @memberof ReqSceneMongoBO
     */
    homeId: number | string

    /**
     * 页码, 默认1
     * @type {number | string}
     * @memberof ReqSceneMongoBO
     */
    pageNumber?: number | string

    /**
     * 每页数量, 默认10
     * @type {number | string}
     * @memberof ReqSceneMongoBO
     */
    pageSize?: number | string

    /**
     * 场景id
     * @type {string}
     * @memberof ReqSceneMongoBO
     */
    sceneId?: string

    /**
     * 查询开始时间
     * @type {string}
     * @memberof ReqSceneMongoBO
     */
    startDate?: string

}


/**
* 服务单类
* @export
* @interface ReqServiceOrderBo
*/
export interface ReqServiceOrderBo {
    
    /**
     * 联系人地址
     * @type {string}
     * @memberof ReqServiceOrderBo
     */
    customerAddress: string

    /**
     * 联系人
     * @type {string}
     * @memberof ReqServiceOrderBo
     */
    customerName: string

    /**
     * 联系电话
     * @type {string}
     * @memberof ReqServiceOrderBo
     */
    customerPhone: string

    /**
     * 操作人账号（手机号）
     * @type {string}
     * @memberof ReqServiceOrderBo
     */
    operator: string

    /**
     * 照片地址 多个以 ','隔开
     * @type {string}
     * @memberof ReqServiceOrderBo
     */
    pictureUrl?: string

    /**
     * 故障产品
     * @type {string}
     * @memberof ReqServiceOrderBo
     */
    product: string

    /**
     * 备注
     * @type {string}
     * @memberof ReqServiceOrderBo
     */
    remark?: string

    /**
     * 服务时间
     * @type {string}
     * @memberof ReqServiceOrderBo
     */
    serviceTime: string

    /**
     * 服务单类型 1：预约维修，2：清洗保养
     * @type {number | string}
     * @memberof ReqServiceOrderBo
     */
    serviceType: number | string

}


/**
* boss保存闪屏入参
* @export
* @interface ReqSplashSaveBo
*/
export interface ReqSplashSaveBo {
    
    /**
     * 关联活动id
     * @type {number | string}
     * @memberof ReqSplashSaveBo
     */
    activityId?: number | string

    /**
     * 闪屏id,编辑时必填
     * @type {number | string}
     * @memberof ReqSplashSaveBo
     */
    id?: number | string

    /**
     * 操作人
     * @type {string}
     * @memberof ReqSplashSaveBo
     */
    operator: string

    /**
     * 闪屏图片
     * @type {string}
     * @memberof ReqSplashSaveBo
     */
    picture: string

    /**
     * 标题
     * @type {string}
     * @memberof ReqSplashSaveBo
     */
    title: string

}


/**
* 
* @export
* @interface ReqStatBO
*/
export interface ReqStatBO {
    
    /**
     * 当前时间 格式 yyyy-MM-dd HH:mm:ss
     * @type {string}
     * @memberof ReqStatBO
     */
    date?: string

    /**
     * 日期类型 5:日,3:周,2:月,1:年
     * @type {number | string}
     * @memberof ReqStatBO
     */
    dateType?: number | string

    /**
     * 维度 温度:temper,湿度:humid,pm2.5:pm,室内温度:innerTemp,运行时间:elapsedTime,二氧化碳:co2
     * @type {string}
     * @memberof ReqStatBO
     */
    dimension?: string

    /**
     * 空调传其它不传
     * @type {string}
     * @memberof ReqStatBO
     */
    endPoint?: string

    /**
     * 网关id
     * @type {string}
     * @memberof ReqStatBO
     */
    iotId?: string

    /**
     * 子设备id
     * @type {string}
     * @memberof ReqStatBO
     */
    subIotId?: string

}


/**
* 子设备入参
* @export
* @interface ReqSubDeviceBO
*/
export interface ReqSubDeviceBO {
    
    /**
     * 点击的按钮,1=暂不需要 2=已保养过 默认1
     * @type {number | string}
     * @memberof ReqSubDeviceBO
     */
    clickSource?: number | string

    /**
     * 点击类型,1000,2000,3000...表示点击时的运行时间
     * @type {string}
     * @memberof ReqSubDeviceBO
     */
    clickType?: string

    /**
     * 延时时间  分钟
     * @type {number | string}
     * @memberof ReqSubDeviceBO
     */
    delay?: number | string

    /**
     *  延时分类  0 开机  ，1  关机
     * @type {number | string}
     * @memberof ReqSubDeviceBO
     */
    deleyType?: number | string

    /**
     * 设备名称
     * @type {string}
     * @memberof ReqSubDeviceBO
     */
    deviceName?: string

    /**
     * 三级子设备
     * @type {string}
     * @memberof ReqSubDeviceBO
     */
    endpoint?: string

    /**
     * 设备id
     * @type {string}
     * @memberof ReqSubDeviceBO
     */
    iotId?: string

    /**
     * 子设备id
     * @type {string}
     * @memberof ReqSubDeviceBO
     */
    subIotId?: string

    /**
     * 品类标识符
     * @type {number | string}
     * @memberof ReqSubDeviceBO
     */
    type?: number | string

    /**
     * 用户uuid
     * @type {string}
     * @memberof ReqSubDeviceBO
     */
    uuid?: string

}


/**
* 三级设备请求类
* @export
* @interface ReqThreeDeviceBO
*/
export interface ReqThreeDeviceBO {
    
    /**
     * 端点
     * @type {string}
     * @memberof ReqThreeDeviceBO
     */
    endpoint: string

    /**
     * 设备id
     * @type {string}
     * @memberof ReqThreeDeviceBO
     */
    iotId: string

    /**
     * 子设备id
     * @type {string}
     * @memberof ReqThreeDeviceBO
     */
    subIotId: string

}


/**
* 删除设备故障入参
* @export
* @interface ReqUpdateBreakdownBo
*/
export interface ReqUpdateBreakdownBo {
    
    /**
     * 故障代码
     * @type {string}
     * @memberof ReqUpdateBreakdownBo
     */
    code?: string

    /**
     * 故障内容
     * @type {string}
     * @memberof ReqUpdateBreakdownBo
     */
    content?: string

    /**
     * 设备故障id
     * @type {number | string}
     * @memberof ReqUpdateBreakdownBo
     */
    id?: number | string

    /**
     * 操作人名称
     * @type {string}
     * @memberof ReqUpdateBreakdownBo
     */
    operateUserName?: string

}


/**
* 
* @export
* @interface ReqUserBindDeviceBO
*/
export interface ReqUserBindDeviceBO {
    
    /**
     * 
     * @type {string}
     * @memberof ReqUserBindDeviceBO
     */
    categoryKey?: string

    /**
     * 
     * @type {string}
     * @memberof ReqUserBindDeviceBO
     */
    categoryName?: string

    /**
     * 
     * @type {string}
     * @memberof ReqUserBindDeviceBO
     */
    createDate?: string

    /**
     * 
     * @type {string}
     * @memberof ReqUserBindDeviceBO
     */
    deviceName?: string

    /**
     * 
     * @type {string}
     * @memberof ReqUserBindDeviceBO
     */
    deviceSecret?: string

    /**
     * 
     * @type {number | string}
     * @memberof ReqUserBindDeviceBO
     */
    factoryId?: number | string

    /**
     * 
     * @type {string}
     * @memberof ReqUserBindDeviceBO
     */
    firmwareVersion?: string

    /**
     * 
     * @type {number | string}
     * @memberof ReqUserBindDeviceBO
     */
    homeId?: number | string

    /**
     * 
     * @type {string}
     * @memberof ReqUserBindDeviceBO
     */
    homeName?: string

    /**
     * 
     * @type {string}
     * @memberof ReqUserBindDeviceBO
     */
    iotId?: string

    /**
     * 
     * @type {string}
     * @memberof ReqUserBindDeviceBO
     */
    netAddress?: string

    /**
     * 
     * @type {number | string}
     * @memberof ReqUserBindDeviceBO
     */
    netType?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof ReqUserBindDeviceBO
     */
    nodeType?: number | string

    /**
     * 
     * @type {string}
     * @memberof ReqUserBindDeviceBO
     */
    password?: string

    /**
     * 
     * @type {string}
     * @memberof ReqUserBindDeviceBO
     */
    productKey?: string

    /**
     * 
     * @type {string}
     * @memberof ReqUserBindDeviceBO
     */
    secretKey?: string

    /**
     * 
     * @type {string}
     * @memberof ReqUserBindDeviceBO
     */
    updateDate?: string

    /**
     * 
     * @type {string}
     * @memberof ReqUserBindDeviceBO
     */
    uuid?: string

}


/**
* 用户环境数据请求类
* @export
* @interface ReqUserEnvironmentDataBO
*/
export interface ReqUserEnvironmentDataBO {
    
    /**
     * 用户环境参数字符串
     * @type {string}
     * @memberof ReqUserEnvironmentDataBO
     */
    environmentData: string

    /**
     * 家庭id
     * @type {number | string}
     * @memberof ReqUserEnvironmentDataBO
     */
    homeId: number | string

    /**
     * 环境数据主键id 新增不传，修改必传
     * @type {number | string}
     * @memberof ReqUserEnvironmentDataBO
     */
    id?: number | string

    /**
     * 用户id
     * @type {string}
     * @memberof ReqUserEnvironmentDataBO
     */
    uuid: string

}


/**
* 用户切换家入参
* @export
* @interface ReqUserHomeBo
*/
export interface ReqUserHomeBo {
    
    /**
     * 用户当前家id
     * @type {number | string}
     * @memberof ReqUserHomeBo
     */
    homeId?: number | string

    /**
     * 用户uuid
     * @type {string}
     * @memberof ReqUserHomeBo
     */
    uuid?: string

}


/**
* 
* @export
* @interface ReqWisdomSavingBO
*/
export interface ReqWisdomSavingBO {
    
    /**
     * 节能状态 1节能，2 正常模式
     * @type {number | string}
     * @memberof ReqWisdomSavingBO
     */
    energySaving: number | string

    /**
     * 网关id
     * @type {string}
     * @memberof ReqWisdomSavingBO
     */
    iotId: string

    /**
     * 子设备id
     * @type {string}
     * @memberof ReqWisdomSavingBO
     */
    subIotId: string

    /**
     * 用户id
     * @type {string}
     * @memberof ReqWisdomSavingBO
     */
    uuid?: string

}


/**
* 活动中心返回类,boss后台下拉框使用
* @export
* @interface RespActivityBO
*/
export interface RespActivityBO {
    
    /**
     * 活动id
     * @type {number | string}
     * @memberof RespActivityBO
     */
    id?: number | string

    /**
     * 活动标题
     * @type {string}
     * @memberof RespActivityBO
     */
    title?: string

}


/**
* 活动中心返回类
* @export
* @interface RespActivityCenterBO
*/
export interface RespActivityCenterBO {
    
    /**
     * 创建时间
     * @type {string}
     * @memberof RespActivityCenterBO
     */
    createTime?: string

    /**
     * 是否删除 0删除 1未删除
     * @type {number | string}
     * @memberof RespActivityCenterBO
     */
    deleted?: number | string

    /**
     * 活动详情
     * @type {string}
     * @memberof RespActivityCenterBO
     */
    detail?: string

    /**
     * 详情地址
     * @type {string}
     * @memberof RespActivityCenterBO
     */
    detailUrl?: string

    /**
     * 生效时间
     * @type {string}
     * @memberof RespActivityCenterBO
     */
    effectiveTime?: string

    /**
     * 是否生效 0未生效 1已生效
     * @type {string}
     * @memberof RespActivityCenterBO
     */
    effectived?: string

    /**
     * 热度
     * @type {number | string}
     * @memberof RespActivityCenterBO
     */
    heat?: number | string

    /**
     * 活动id
     * @type {number | string}
     * @memberof RespActivityCenterBO
     */
    id?: number | string

    /**
     * 活动图片
     * @type {string}
     * @memberof RespActivityCenterBO
     */
    picture?: string

    /**
     * 是否展示在轮播页 0 展示 1不展示
     * @type {number | string}
     * @memberof RespActivityCenterBO
     */
    showed?: number | string

    /**
     * (闪屏页跳转使用)状态,1=正常显示 0=活动结束页面
     * @type {number | string}
     * @memberof RespActivityCenterBO
     */
    status?: number | string

    /**
     * 活动标题
     * @type {string}
     * @memberof RespActivityCenterBO
     */
    title?: string

    /**
     * 修改时间
     * @type {string}
     * @memberof RespActivityCenterBO
     */
    updateTime?: string

}


/**
* 返回地址
* @export
* @interface RespAddressBO
*/
export interface RespAddressBO {
    
    /**
     * 默认地址
     * @type {number | string}
     * @memberof RespAddressBO
     */
    defaultFlag?: number | string

    /**
     * 详细地址
     * @type {string}
     * @memberof RespAddressBO
     */
    detailAddress?: string

    /**
     * 主键id
     * @type {number | string}
     * @memberof RespAddressBO
     */
    id?: number | string

    /**
     * 联系人
     * @type {string}
     * @memberof RespAddressBO
     */
    name?: string

    /**
     * 联系电话
     * @type {string}
     * @memberof RespAddressBO
     */
    phone?: string

    /**
     * 所在地区
     * @type {string}
     * @memberof RespAddressBO
     */
    region?: string

    /**
     * 用户id
     * @type {string}
     * @memberof RespAddressBO
     */
    uuid?: string

}


/**
* 商家活动列表数据
* @export
* @interface RespAppShopActivityBO
*/
export interface RespAppShopActivityBO {
    
    /**
     * 活动名称
     * @type {string}
     * @memberof RespAppShopActivityBO
     */
    activityName?: string

    /**
     * 市
     * @type {string}
     * @memberof RespAppShopActivityBO
     */
    cityName?: string

    /**
     * 区
     * @type {string}
     * @memberof RespAppShopActivityBO
     */
    countryName?: string

    /**
     * 结束时间-字符串,格式yyyy/MM/dd
     * @type {string}
     * @memberof RespAppShopActivityBO
     */
    endTimeString?: string

    /**
     * 热度
     * @type {number | string}
     * @memberof RespAppShopActivityBO
     */
    heat?: number | string

    /**
     * 数据id
     * @type {number | string}
     * @memberof RespAppShopActivityBO
     */
    id?: number | string

    /**
     * 海报图片地址
     * @type {string}
     * @memberof RespAppShopActivityBO
     */
    poster?: string

    /**
     * 省
     * @type {string}
     * @memberof RespAppShopActivityBO
     */
    provinceName?: string

    /**
     * 地址
     * @type {string}
     * @memberof RespAppShopActivityBO
     */
    shopAddress?: string

    /**
     * 商户的用户id,用户查询商户联系信息
     * @type {number | string}
     * @memberof RespAppShopActivityBO
     */
    shopUuid?: number | string

    /**
     * 开始时间-字符串,格式yyyy/MM/dd
     * @type {string}
     * @memberof RespAppShopActivityBO
     */
    startTimeString?: string

}


/**
* app版本信息返回类
* @export
* @interface RespAppVersionBO
*/
export interface RespAppVersionBO {
    
    /**
     * app版本号
     * @type {string}
     * @memberof RespAppVersionBO
     */
    appVersion?: string

    /**
     * 版本更新内容
     * @type {string}
     * @memberof RespAppVersionBO
     */
    content?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof RespAppVersionBO
     */
    createTime?: string

    /**
     * 是否强制更新 0 非强制 1 强制
     * @type {number | string}
     * @memberof RespAppVersionBO
     */
    isForced?: number | string

    /**
     * 是否需要更新 0 需要 1 不需要
     * @type {number | string}
     * @memberof RespAppVersionBO
     */
    isUpdate?: number | string

    /**
     * 手机系统平台类型  1：android  2：ios
     * @type {number | string}
     * @memberof RespAppVersionBO
     */
    phoneType?: number | string

    /**
     * 修改时间
     * @type {string}
     * @memberof RespAppVersionBO
     */
    updateTime?: string

    /**
     * 版本地址
     * @type {string}
     * @memberof RespAppVersionBO
     */
    versionAddress?: string

}


/**
* 舒适百科分页查询返回参数
* @export
* @interface RespArticlePageBo
*/
export interface RespArticlePageBo {
    
    /**
     * 创建时间
     * @type {string}
     * @memberof RespArticlePageBo
     */
    createTime?: string

    /**
     * 生效时间
     * @type {string}
     * @memberof RespArticlePageBo
     */
    effectiveTime?: string

    /**
     * 序号
     * @type {number | string}
     * @memberof RespArticlePageBo
     */
    id?: number | string

    /**
     * 状态,1=已生效 0=未生效
     * @type {number | string}
     * @memberof RespArticlePageBo
     */
    status?: number | string

    /**
     * 标题
     * @type {string}
     * @memberof RespArticlePageBo
     */
    title?: string

}


/**
* 绑定返回类
* @export
* @interface RespBindBO
*/
export interface RespBindBO {
    
    /**
     * 家id
     * @type {number | string}
     * @memberof RespBindBO
     */
    homeId?: number | string

    /**
     * 是否需要新建家 true 要新建，false, 不需要
     * @type {boolean}
     * @memberof RespBindBO
     */
    isNew?: boolean

}


/**
* 
* @export
* @interface RespBoilerBO
*/
export interface RespBoilerBO {
    
    /**
     * 锅炉类型 1采暖与生活热水两用 2仅供采暖系统
     * @type {number | string}
     * @memberof RespBoilerBO
     */
    boilerType?: number | string

    /**
     * 设备id
     * @type {string}
     * @memberof RespBoilerBO
     */
    iotId?: string

    /**
     * 子设备id
     * @type {string}
     * @memberof RespBoilerBO
     */
    subIotId?: string

}


/**
* 
* @export
* @interface RespBoilerLinkageSwitchBO
*/
export interface RespBoilerLinkageSwitchBO {
    
    /**
     * 设备id
     * @type {string}
     * @memberof RespBoilerLinkageSwitchBO
     */
    iotId?: string

    /**
     * 温控阀联动自动开关 1.开启，0.未开启
     * @type {number | string}
     * @memberof RespBoilerLinkageSwitchBO
     */
    linkageSwitch?: number | string

    /**
     * 子设备id
     * @type {string}
     * @memberof RespBoilerLinkageSwitchBO
     */
    subIotId?: string

    /**
     * 设备类型
     * @type {string}
     * @memberof RespBoilerLinkageSwitchBO
     */
    type?: string

}


/**
* 设备故障返回数据
* @export
* @interface RespBreakdownBo
*/
export interface RespBreakdownBo {
    
    /**
     * 品牌
     * @type {string}
     * @memberof RespBreakdownBo
     */
    brandName?: string

    /**
     * 品类
     * @type {string}
     * @memberof RespBreakdownBo
     */
    categoryName?: string

    /**
     * 故障代码
     * @type {string}
     * @memberof RespBreakdownBo
     */
    code?: string

    /**
     * 故障内容
     * @type {string}
     * @memberof RespBreakdownBo
     */
    content?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof RespBreakdownBo
     */
    createTime?: string

    /**
     * 序号
     * @type {number | string}
     * @memberof RespBreakdownBo
     */
    id?: number | string

    /**
     * 来源
     * @type {number | string}
     * @memberof RespBreakdownBo
     */
    source?: number | string

}


/**
* 
* @export
* @interface RespComfortHumidBO
*/
export interface RespComfortHumidBO {
    
    /**
     * 是否可以开启独立除湿 true 可以  false 不可以
     * @type {boolean}
     * @memberof RespComfortHumidBO
     */
    status?: boolean

}


/**
* 舒适度场景运行时间报表数据
* @export
* @interface RespComfortReportBo
*/
export interface RespComfortReportBo {
    
    /**
     * 报表数据
     * @type {Array<RespComfortRunStatBO>}
     * @memberof RespComfortReportBo
     */
    comfortRunStats?: Array<RespComfortRunStatBO>

    /**
     * 总时长
     * @type {number | string}
     * @memberof RespComfortReportBo
     */
    totalRunHours?: number | string

}


/**
* 
* @export
* @interface RespComfortRoomBO
*/
export interface RespComfortRoomBO {
    
    /**
     * 房间下舒适度场景列表
     * @type {Array<RespComfortRoomSceneBO>}
     * @memberof RespComfortRoomBO
     */
    comfortRoomList?: Array<RespComfortRoomSceneBO>

}


/**
* 
* @export
* @interface RespComfortRoomSceneBO
*/
export interface RespComfortRoomSceneBO {
    
    /**
     * 执行动作
     * @type {string}
     * @memberof RespComfortRoomSceneBO
     */
    actionData?: string

    /**
     * 加温度值
     * @type {number | string}
     * @memberof RespComfortRoomSceneBO
     */
    addTemp?: number | string

    /**
     * 舒适度场景 1.智能调温 2.自动打开 3.自动关闭 4.制热 5.恒温恒湿
     * @type {number | string}
     * @memberof RespComfortRoomSceneBO
     */
    comfortType?: number | string

    /**
     * 条件数据
     * @type {string}
     * @memberof RespComfortRoomSceneBO
     */
    conditionData?: string

    /**
     * 1.生效，0.不生效 格式:1,1,1,1,1,1,1
     * @type {string}
     * @memberof RespComfortRoomSceneBO
     */
    effectDay?: string

    /**
     * 生效结束时间 HH:mm:ss
     * @type {string}
     * @memberof RespComfortRoomSceneBO
     */
    effectEndTime?: string

    /**
     * 生效开始时间 HH:mm:ss
     * @type {string}
     * @memberof RespComfortRoomSceneBO
     */
    effectStartTime?: string

    /**
     * 生效状态 1.生效，2.不生效
     * @type {number | string}
     * @memberof RespComfortRoomSceneBO
     */
    effectTimeState?: number | string

    /**
     * 家id
     * @type {number | string}
     * @memberof RespComfortRoomSceneBO
     */
    homeId?: number | string

    /**
     * 场景id
     * @type {number | string}
     * @memberof RespComfortRoomSceneBO
     */
    id?: number | string

    /**
     * 极限湿度
     * @type {number | string}
     * @memberof RespComfortRoomSceneBO
     */
    limitHumidity?: number | string

    /**
     * 房间id
     * @type {number | string}
     * @memberof RespComfortRoomSceneBO
     */
    roomId?: number | string

    /**
     * 启用类型 1.生效，2.不生效
     * @type {number | string}
     * @memberof RespComfortRoomSceneBO
     */
    startState?: number | string

    /**
     * 目标湿度
     * @type {number | string}
     * @memberof RespComfortRoomSceneBO
     */
    targetHumidity?: number | string

    /**
     * 目标温度
     * @type {number | string}
     * @memberof RespComfortRoomSceneBO
     */
    targetTemperature?: number | string

}


/**
* 舒适度场景运行时间报表
* @export
* @interface RespComfortRunStatBO
*/
export interface RespComfortRunStatBO {
    
    /**
     * 类型名称
     * @type {string}
     * @memberof RespComfortRunStatBO
     */
    comfortName?: string

    /**
     * 单个类型报表
     * @type {Array<RespComfortStatBO>}
     * @memberof RespComfortRunStatBO
     */
    comfortReports?: Array<RespComfortStatBO>

    /**
     * 总运行时间
     * @type {number | string}
     * @memberof RespComfortRunStatBO
     */
    totalTime?: number | string

}


/**
* 舒适度场景统计返回参数
* @export
* @interface RespComfortStatBO
*/
export interface RespComfortStatBO {
    
    /**
     * 日期
     * @type {string}
     * @memberof RespComfortStatBO
     */
    dateTime: string

    /**
     * 值
     * @type {string}
     * @memberof RespComfortStatBO
     */
    value: string

}


/**
* 单条舒适百科详情
* @export
* @interface RespComfyEncyclopediaBO
*/
export interface RespComfyEncyclopediaBO {
    
    /**
     * 文章id
     * @type {number | string}
     * @memberof RespComfyEncyclopediaBO
     */
    articleId?: number | string

    /**
     * 文章内容
     * @type {string}
     * @memberof RespComfyEncyclopediaBO
     */
    body?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof RespComfyEncyclopediaBO
     */
    createTime?: string

    /**
     * 生效时间
     * @type {string}
     * @memberof RespComfyEncyclopediaBO
     */
    effectiveTime?: string

    /**
     * 热度
     * @type {number | string}
     * @memberof RespComfyEncyclopediaBO
     */
    heat?: number | string

    /**
     * 主键id
     * @type {number | string}
     * @memberof RespComfyEncyclopediaBO
     */
    id?: number | string

    /**
     * 文章图片
     * @type {string}
     * @memberof RespComfyEncyclopediaBO
     */
    picture?: string

    /**
     * 文章标题
     * @type {string}
     * @memberof RespComfyEncyclopediaBO
     */
    title?: string

    /**
     * 修改时间
     * @type {string}
     * @memberof RespComfyEncyclopediaBO
     */
    updatetime?: string

}


/**
* 商户联系信息
* @export
* @interface RespContactInfoBO
*/
export interface RespContactInfoBO {
    
    /**
     * 头像
     * @type {string}
     * @memberof RespContactInfoBO
     */
    avatarUrl?: string

    /**
     * 昵称
     * @type {string}
     * @memberof RespContactInfoBO
     */
    nickName?: string

    /**
     * 手机号
     * @type {string}
     * @memberof RespContactInfoBO
     */
    phone?: string

}


/**
* 客服电话记录返回类
* @export
* @interface RespCustomerServicePhoneDataBO
*/
export interface RespCustomerServicePhoneDataBO {
    
    /**
     * 呼叫时间
     * @type {string}
     * @memberof RespCustomerServicePhoneDataBO
     */
    callTime?: string

    /**
     * 注册时间
     * @type {string}
     * @memberof RespCustomerServicePhoneDataBO
     */
    createTime?: string

    /**
     * 设备数
     * @type {number | string}
     * @memberof RespCustomerServicePhoneDataBO
     */
    deviceCount?: number | string

    /**
     * 家庭列表
     * @type {Array<HomePO>}
     * @memberof RespCustomerServicePhoneDataBO
     */
    homes?: Array<HomePO>

    /**
     * 昵称
     * @type {string}
     * @memberof RespCustomerServicePhoneDataBO
     */
    nick?: string

    /**
     * 手机号
     * @type {string}
     * @memberof RespCustomerServicePhoneDataBO
     */
    phone?: string

    /**
     * 手机归属地
     * @type {string}
     * @memberof RespCustomerServicePhoneDataBO
     */
    phoneAddress?: string

    /**
     * 平台
     * @type {string}
     * @memberof RespCustomerServicePhoneDataBO
     */
    phoneType?: string

}


/**
* 
* @export
* @interface RespDeviceBO
*/
export interface RespDeviceBO {
    
    /**
     * 
     * @type {string}
     * @memberof RespDeviceBO
     */
    categoryKey?: string

    /**
     * 
     * @type {string}
     * @memberof RespDeviceBO
     */
    categoryName?: string

    /**
     * 
     * @type {string}
     * @memberof RespDeviceBO
     */
    createDate?: string

    /**
     * 
     * @type {number | string}
     * @memberof RespDeviceBO
     */
    deviceChannel?: number | string

    /**
     * 
     * @type {string}
     * @memberof RespDeviceBO
     */
    deviceName?: string

    /**
     * 
     * @type {string}
     * @memberof RespDeviceBO
     */
    deviceSecret?: string

    /**
     * 
     * @type {number | string}
     * @memberof RespDeviceBO
     */
    factoryId?: number | string

    /**
     * 
     * @type {string}
     * @memberof RespDeviceBO
     */
    firmwareVersion?: string

    /**
     * 
     * @type {number | string}
     * @memberof RespDeviceBO
     */
    id?: number | string

    /**
     * 
     * @type {string}
     * @memberof RespDeviceBO
     */
    iotId?: string

    /**
     * 
     * @type {string}
     * @memberof RespDeviceBO
     */
    netAddress?: string

    /**
     * 
     * @type {number | string}
     * @memberof RespDeviceBO
     */
    netType?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof RespDeviceBO
     */
    nodeType?: number | string

    /**
     * 
     * @type {string}
     * @memberof RespDeviceBO
     */
    password?: string

    /**
     * 
     * @type {string}
     * @memberof RespDeviceBO
     */
    productKey?: string

    /**
     * 
     * @type {string}
     * @memberof RespDeviceBO
     */
    updateDate?: string

}


/**
* 
* @export
* @interface RespDeviceCategoryBO
*/
export interface RespDeviceCategoryBO {
    
    /**
     * 主键id
     * @type {number | string}
     * @memberof RespDeviceCategoryBO
     */
    id?: number | string

    /**
     * 设备类目名称
     * @type {string}
     * @memberof RespDeviceCategoryBO
     */
    name?: string

}


/**
* 
* @export
* @interface RespDeviceCountBO
*/
export interface RespDeviceCountBO {
    
    /**
     * 设备总数
     * @type {number | string}
     * @memberof RespDeviceCountBO
     */
    count?: number | string

    /**
     * 设备总配网失败率
     * @type {string}
     * @memberof RespDeviceCountBO
     */
    deviceNetworkCount?: string

    /**
     * 在线设备数
     * @type {number | string}
     * @memberof RespDeviceCountBO
     */
    onlineCount?: number | string

    /**
     * 设备总运行时长
     * @type {string}
     * @memberof RespDeviceCountBO
     */
    runTimeCount?: string

}


/**
* 
* @export
* @interface RespDeviceDetailsBO
*/
export interface RespDeviceDetailsBO {
    
    /**
     * 入网时间
     * @type {string}
     * @memberof RespDeviceDetailsBO
     */
    createTime?: string

    /**
     * 设备等级 1.一级设备，2.二级设备
     * @type {number | string}
     * @memberof RespDeviceDetailsBO
     */
    deviceClass?: number | string

    /**
     * 网关版本号
     * @type {string}
     * @memberof RespDeviceDetailsBO
     */
    firmwareVersion?: string

    /**
     * 家id
     * @type {number | string}
     * @memberof RespDeviceDetailsBO
     */
    homeId?: number | string

    /**
     * 网关号
     * @type {string}
     * @memberof RespDeviceDetailsBO
     */
    iotId?: string

    /**
     * 离线时间
     * @type {string}
     * @memberof RespDeviceDetailsBO
     */
    offlineTime?: string

    /**
     * 手机号
     * @type {string}
     * @memberof RespDeviceDetailsBO
     */
    phone?: string

    /**
     * 设备状态
     * @type {string}
     * @memberof RespDeviceDetailsBO
     */
    status?: string

    /**
     * 设备id
     * @type {string}
     * @memberof RespDeviceDetailsBO
     */
    subIotId?: string

    /**
     * 设备种类
     * @type {string}
     * @memberof RespDeviceDetailsBO
     */
    typeName?: string

}


/**
* 
* @export
* @interface RespDeviceDictBO
*/
export interface RespDeviceDictBO {
    
    /**
     * 创建时间
     * @type {string}
     * @memberof RespDeviceDictBO
     */
    createTime?: string

    /**
     * 设备名称
     * @type {string}
     * @memberof RespDeviceDictBO
     */
    deviceName?: string

    /**
     * 厂家id
     * @type {number | string}
     * @memberof RespDeviceDictBO
     */
    factoryId?: number | string

    /**
     * 主键id
     * @type {number | string}
     * @memberof RespDeviceDictBO
     */
    id?: number | string

    /**
     * 图片地址
     * @type {string}
     * @memberof RespDeviceDictBO
     */
    image?: string

    /**
     * 节点类型0:设备,1:网关
     * @type {number | string}
     * @memberof RespDeviceDictBO
     */
    nodeType?: number | string

    /**
     * 产品key
     * @type {string}
     * @memberof RespDeviceDictBO
     */
    productKey?: string

    /**
     * 种类 0：全部 1:智能网关 3：开关面板 4：智能传感器类 5:智能插座 6:窗帘控制 7:空调控制 8:智能家电 9:智能音箱 10:采暖控制 11:新风控制
     * @type {number | string}
     * @memberof RespDeviceDictBO
     */
    type?: number | string

    /**
     * 修改时间
     * @type {string}
     * @memberof RespDeviceDictBO
     */
    updateTime?: string

    /**
     * 设备版本号
     * @type {string}
     * @memberof RespDeviceDictBO
     */
    version?: string

}


/**
* 
* @export
* @interface RespDeviceDictGroupBO
*/
export interface RespDeviceDictGroupBO {
    
    /**
     * 设备字典列表分组
     * @type {Array<RespDeviceDictBO>}
     * @memberof RespDeviceDictGroupBO
     */
    deviceDictBOsgroup?: Array<RespDeviceDictBO>

    /**
     * 设备种类
     * @type {number | string}
     * @memberof RespDeviceDictGroupBO
     */
    type?: number | string

    /**
     * 设备种类名称
     * @type {string}
     * @memberof RespDeviceDictGroupBO
     */
    typeName?: string

}


/**
* 
* @export
* @interface RespDeviceDistribution
*/
export interface RespDeviceDistribution {
    
    /**
     * 
     * @type {string}
     * @memberof RespDeviceDistribution
     */
    deviceType?: string

    /**
     * 
     * @type {number | string}
     * @memberof RespDeviceDistribution
     */
    onlineCount?: number | string

}


/**
* 
* @export
* @interface RespDeviceDownlinePushBO
*/
export interface RespDeviceDownlinePushBO {
    
    /**
     * 主键id
     * @type {number | string}
     * @memberof RespDeviceDownlinePushBO
     */
    id?: number | string

    /**
     * 设备id
     * @type {string}
     * @memberof RespDeviceDownlinePushBO
     */
    iotId?: string

    /**
     * 开关状态 1.开启 0.关闭
     * @type {number | string}
     * @memberof RespDeviceDownlinePushBO
     */
    status?: number | string

    /**
     * 子设备id
     * @type {string}
     * @memberof RespDeviceDownlinePushBO
     */
    subIotId?: string

}


/**
* 
* @export
* @interface RespDeviceInfoBO
*/
export interface RespDeviceInfoBO {
    
    /**
     * 
     * @type {number | string}
     * @memberof RespDeviceInfoBO
     */
    deviceChannel?: number | string

    /**
     * 
     * @type {string}
     * @memberof RespDeviceInfoBO
     */
    deviceName?: string

    /**
     * 
     * @type {string}
     * @memberof RespDeviceInfoBO
     */
    endpoint?: string

    /**
     * 
     * @type {number | string}
     * @memberof RespDeviceInfoBO
     */
    factoryId?: number | string

    /**
     * 
     * @type {string}
     * @memberof RespDeviceInfoBO
     */
    firmwareVersion?: string

    /**
     * 
     * @type {number | string}
     * @memberof RespDeviceInfoBO
     */
    homeId?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof RespDeviceInfoBO
     */
    id?: number | string

    /**
     * 
     * @type {string}
     * @memberof RespDeviceInfoBO
     */
    iotId?: string

    /**
     * 
     * @type {boolean}
     * @memberof RespDeviceInfoBO
     */
    isUpgrade?: boolean

    /**
     * 
     * @type {number | string}
     * @memberof RespDeviceInfoBO
     */
    nodeType?: number | string

    /**
     * 
     * @type {string}
     * @memberof RespDeviceInfoBO
     */
    password?: string

    /**
     * 
     * @type {string}
     * @memberof RespDeviceInfoBO
     */
    phone?: string

    /**
     * 
     * @type {number | string}
     * @memberof RespDeviceInfoBO
     */
    reactionType?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof RespDeviceInfoBO
     */
    roomId?: number | string

    /**
     * 
     * @type {string}
     * @memberof RespDeviceInfoBO
     */
    roomName?: string

    /**
     * 
     * @type {number | string}
     * @memberof RespDeviceInfoBO
     */
    sort?: number | string

    /**
     * 
     * @type {string}
     * @memberof RespDeviceInfoBO
     */
    state?: string

    /**
     * 
     * @type {string}
     * @memberof RespDeviceInfoBO
     */
    subIotId?: string

    /**
     * 
     * @type {string}
     * @memberof RespDeviceInfoBO
     */
    svcId?: string

    /**
     * 
     * @type {string}
     * @memberof RespDeviceInfoBO
     */
    type?: string

    /**
     * 
     * @type {string}
     * @memberof RespDeviceInfoBO
     */
    uuid?: string

}


/**
* 
* @export
* @interface RespDeviceLoginBO
*/
export interface RespDeviceLoginBO {
    
    /**
     * 创建时间
     * @type {string}
     * @memberof RespDeviceLoginBO
     */
    createTime?: string

    /**
     * 家id
     * @type {string}
     * @memberof RespDeviceLoginBO
     */
    homeId?: string

    /**
     * 家庭名称
     * @type {string}
     * @memberof RespDeviceLoginBO
     */
    homeName?: string

    /**
     * 设备ID
     * @type {string}
     * @memberof RespDeviceLoginBO
     */
    iotId?: string

    /**
     * 手机号
     * @type {string}
     * @memberof RespDeviceLoginBO
     */
    phone?: string

    /**
     * 设备上下线
     * @type {string}
     * @memberof RespDeviceLoginBO
     */
    status?: string

}


/**
* 
* @export
* @interface RespDeviceNameBO
*/
export interface RespDeviceNameBO {
    
    /**
     * 设备级别
     * @type {number | string}
     * @memberof RespDeviceNameBO
     */
    deviceClass?: number | string

    /**
     * 设备名称
     * @type {string}
     * @memberof RespDeviceNameBO
     */
    name?: string

    /**
     * 设备类型
     * @type {string}
     * @memberof RespDeviceNameBO
     */
    type?: string

}


/**
* 
* @export
* @interface RespDeviceSpecificDetailBO
*/
export interface RespDeviceSpecificDetailBO {
    
    /**
     * 创建时间
     * @type {string}
     * @memberof RespDeviceSpecificDetailBO
     */
    createTime?: string

    /**
     * 经销商
     * @type {string}
     * @memberof RespDeviceSpecificDetailBO
     */
    dealer?: string

    /**
     * 经销商电话
     * @type {string}
     * @memberof RespDeviceSpecificDetailBO
     */
    dealerPhone?: string

    /**
     * 
     * @type {Page«RespDeviceLoginBO»}
     * @memberof RespDeviceSpecificDetailBO
     */
    deviceLogins?: PageRespDeviceLoginBO

    /**
     * 设备状态
     * @type {string}
     * @memberof RespDeviceSpecificDetailBO
     */
    status?: string

    /**
     * 子设备ID
     * @type {string}
     * @memberof RespDeviceSpecificDetailBO
     */
    subIotId?: string

}


/**
* 
* @export
* @interface RespDeviceStatBO
*/
export interface RespDeviceStatBO {
    
    /**
     * 日期
     * @type {string}
     * @memberof RespDeviceStatBO
     */
    dateTime: string

    /**
     * 值
     * @type {string}
     * @memberof RespDeviceStatBO
     */
    value: string

}


/**
* 
* @export
* @interface RespDeviceTypeBO
*/
export interface RespDeviceTypeBO {
    
    /**
     * 设备种类
     * @type {number | string}
     * @memberof RespDeviceTypeBO
     */
    type?: number | string

    /**
     * 设备种类名称
     * @type {string}
     * @memberof RespDeviceTypeBO
     */
    typeName?: string

}


/**
* 
* @export
* @interface RespDevicesRunStatBO
*/
export interface RespDevicesRunStatBO {
    
    /**
     * 设备名称/模式
     * @type {string}
     * @memberof RespDevicesRunStatBO
     */
    deviceName?: string

    /**
     * 单个设备报表
     * @type {Array<RespDeviceStatBO>}
     * @memberof RespDevicesRunStatBO
     */
    deviceStatBOs?: Array<RespDeviceStatBO>

    /**
     * 总运行时间
     * @type {string}
     * @memberof RespDevicesRunStatBO
     */
    totalTime?: string

}


/**
* 
* @export
* @interface RespDevicesStatBO
*/
export interface RespDevicesStatBO {
    
    /**
     * 设备名称
     * @type {string}
     * @memberof RespDevicesStatBO
     */
    deviceName?: string

    /**
     * 单个设备报表
     * @type {Array<RespDeviceStatBO>}
     * @memberof RespDevicesStatBO
     */
    deviceStatBOs?: Array<RespDeviceStatBO>

}


/**
* 
* @export
* @interface RespDistributeNetworkGuideBO
*/
export interface RespDistributeNetworkGuideBO {
    
    /**
     * 
     * @type {string}
     * @memberof RespDistributeNetworkGuideBO
     */
    createTime?: string

    /**
     * 
     * @type {string}
     * @memberof RespDistributeNetworkGuideBO
     */
    description?: string

    /**
     * 
     * @type {string}
     * @memberof RespDistributeNetworkGuideBO
     */
    image?: string

    /**
     * 
     * @type {string}
     * @memberof RespDistributeNetworkGuideBO
     */
    productKey?: string

    /**
     * 
     * @type {number | string}
     * @memberof RespDistributeNetworkGuideBO
     */
    step?: number | string

    /**
     * 
     * @type {string}
     * @memberof RespDistributeNetworkGuideBO
     */
    updateTime?: string

}


/**
* 
* @export
* @interface RespElectricBO
*/
export interface RespElectricBO {
    
    /**
     * 
     * @type {Array<PeakValleyFee>}
     * @memberof RespElectricBO
     */
    electricLists?: Array<PeakValleyFee>

    /**
     * 
     * @type {number | string}
     * @memberof RespElectricBO
     */
    electricType?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof RespElectricBO
     */
    fixPrice?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof RespElectricBO
     */
    id?: number | string

    /**
     * 
     * @type {string}
     * @memberof RespElectricBO
     */
    subIotId?: string

}


/**
* 
* @export
* @interface RespEnvironmentBO
*/
export interface RespEnvironmentBO {
    
    /**
     * 环境传感器id
     * @type {string}
     * @memberof RespEnvironmentBO
     */
    environmentIotId?: string

    /**
     * 环境传感器子设备id
     * @type {string}
     * @memberof RespEnvironmentBO
     */
    environmentSubIotId?: string

}


/**
* 
* @export
* @interface RespEnvironmentData
*/
export interface RespEnvironmentData {
    
    /**
     * 
     * @type {string}
     * @memberof RespEnvironmentData
     */
    comfort?: string

    /**
     * 
     * @type {number | string}
     * @memberof RespEnvironmentData
     */
    humidity?: number | string

    /**
     * 
     * @type {string}
     * @memberof RespEnvironmentData
     */
    humidityComfort?: string

    /**
     * 
     * @type {number | string}
     * @memberof RespEnvironmentData
     */
    pm?: number | string

    /**
     * 
     * @type {string}
     * @memberof RespEnvironmentData
     */
    pmComfort?: string

    /**
     * 
     * @type {number | string}
     * @memberof RespEnvironmentData
     */
    temperature?: number | string

    /**
     * 
     * @type {string}
     * @memberof RespEnvironmentData
     */
    temperatureComfort?: string

}


/**
* 
* @export
* @interface RespFactoryKeyAndMqttBO
*/
export interface RespFactoryKeyAndMqttBO {
    
    /**
     * 
     * @type {string}
     * @memberof RespFactoryKeyAndMqttBO
     */
    accessKey?: string

    /**
     * 
     * @type {string}
     * @memberof RespFactoryKeyAndMqttBO
     */
    address?: string

    /**
     * 
     * @type {string}
     * @memberof RespFactoryKeyAndMqttBO
     */
    cacheTime?: string

    /**
     * 
     * @type {string}
     * @memberof RespFactoryKeyAndMqttBO
     */
    mqttPwd?: string

    /**
     * 
     * @type {string}
     * @memberof RespFactoryKeyAndMqttBO
     */
    mqttUser?: string

    /**
     * 
     * @type {string}
     * @memberof RespFactoryKeyAndMqttBO
     */
    port?: string

    /**
     * 
     * @type {string}
     * @memberof RespFactoryKeyAndMqttBO
     */
    protocol?: string

}


/**
* 
* @export
* @interface RespFirmwareVersionBO
*/
export interface RespFirmwareVersionBO {
    
    /**
     * 
     * @type {number | string}
     * @memberof RespFirmwareVersionBO
     */
    factoryId?: number | string

    /**
     * 
     * @type {string}
     * @memberof RespFirmwareVersionBO
     */
    firmwareVersion?: string

    /**
     * 
     * @type {number | string}
     * @memberof RespFirmwareVersionBO
     */
    id?: number | string

    /**
     * 
     * @type {string}
     * @memberof RespFirmwareVersionBO
     */
    path?: string

}


/**
* APP首页聚合信息
* @export
* @interface RespFirstPageBO
*/
export interface RespFirstPageBO {
    
    /**
     * 用户当前家设备列表
     * @type {Array<RespDeviceInfoBO>}
     * @memberof RespFirstPageBO
     */
    homeDeviceList?: Array<RespDeviceInfoBO>

    /**
     * 用户当前家的房间列表
     * @type {Array<RespRoomBO>}
     * @memberof RespFirstPageBO
     */
    roomList?: Array<RespRoomBO>

    /**
     * 用户当前家的环境信息
     * @type {UserEnvironmentDataPO}
     * @memberof RespFirstPageBO
     */
    userEnvironmentData?: UserEnvironmentDataPO

    /**
     * 用户当前城市的天气信息
     * @type {RespWeatherBo}
     * @memberof RespFirstPageBO
     */
    weatherInfo?: RespWeatherBo

}


/**
* 
* @export
* @interface RespFloorHeatBO
*/
export interface RespFloorHeatBO {
    
    /**
     * 
     * @type {Array<FloorProgramm>}
     * @memberof RespFloorHeatBO
     */
    custom1List?: Array<FloorProgramm>

    /**
     * 
     * @type {string}
     * @memberof RespFloorHeatBO
     */
    custom1Name?: string

    /**
     * 
     * @type {Array<FloorProgramm>}
     * @memberof RespFloorHeatBO
     */
    custom2List?: Array<FloorProgramm>

    /**
     * 
     * @type {string}
     * @memberof RespFloorHeatBO
     */
    custom2Name?: string

    /**
     * 
     * @type {number | string}
     * @memberof RespFloorHeatBO
     */
    energySaving?: number | string

    /**
     * 
     * @type {Array<RespFloorHeatCalendarBO>}
     * @memberof RespFloorHeatBO
     */
    floorHeatCalendarBOs?: Array<RespFloorHeatCalendarBO>

    /**
     * 
     * @type {Array<FloorProgramm>}
     * @memberof RespFloorHeatBO
     */
    holidayList?: Array<FloorProgramm>

    /**
     * 
     * @type {Array<FloorProgramm>}
     * @memberof RespFloorHeatBO
     */
    workDayList?: Array<FloorProgramm>

}


/**
* 
* @export
* @interface RespFloorHeatCalendarBO
*/
export interface RespFloorHeatCalendarBO {
    
    /**
     * 
     * @type {string}
     * @memberof RespFloorHeatCalendarBO
     */
    effectDays?: string

    /**
     * 
     * @type {string}
     * @memberof RespFloorHeatCalendarBO
     */
    yyyymm?: string

}


/**
* 
* @export
* @interface RespGmDeviceInfo
*/
export interface RespGmDeviceInfo {
    
    /**
     * 
     * @type {number | string}
     * @memberof RespGmDeviceInfo
     */
    co2?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof RespGmDeviceInfo
     */
    energySaving?: number | string

    /**
     * 
     * @type {string}
     * @memberof RespGmDeviceInfo
     */
    heat?: string

    /**
     * 
     * @type {number | string}
     * @memberof RespGmDeviceInfo
     */
    humidity?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof RespGmDeviceInfo
     */
    light?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof RespGmDeviceInfo
     */
    lock?: number | string

    /**
     * 
     * @type {string}
     * @memberof RespGmDeviceInfo
     */
    mode?: string

    /**
     * 
     * @type {number | string}
     * @memberof RespGmDeviceInfo
     */
    pm2_5?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof RespGmDeviceInfo
     */
    power?: number | string

    /**
     * 
     * @type {string}
     * @memberof RespGmDeviceInfo
     */
    qrcode?: string

    /**
     * 
     * @type {number | string}
     * @memberof RespGmDeviceInfo
     */
    temperature?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof RespGmDeviceInfo
     */
    volume?: number | string

}


/**
* 年度采暖报告
* @export
* @interface RespHeatYearReportBO
*/
export interface RespHeatYearReportBO {
    
    /**
     * 第三页-设备相关报告,为空则不展示
     * @type {DeviceReport}
     * @memberof RespHeatYearReportBO
     */
    deviceReport?: DeviceReport

    /**
     * 第一页-加入日期
     * @type {string}
     * @memberof RespHeatYearReportBO
     */
    joinDate?: string

    /**
     * 第一页-加入天数
     * @type {number | string}
     * @memberof RespHeatYearReportBO
     */
    joinDays?: number | string

    /**
     * 第一页-消息
     * @type {string}
     * @memberof RespHeatYearReportBO
     */
    joinMessage?: string

    /**
     * 第四页-勋章信息
     * @type {RespMedalBO}
     * @memberof RespHeatYearReportBO
     */
    medal?: RespMedalBO

    /**
     * 第一页-昵称
     * @type {string}
     * @memberof RespHeatYearReportBO
     */
    nickName?: string

    /**
     * 第二页-消息
     * @type {string}
     * @memberof RespHeatYearReportBO
     */
    openMessage?: string

    /**
     * 第二页-打开次数
     * @type {number | string}
     * @memberof RespHeatYearReportBO
     */
    openTimes?: number | string

    /**
     * 第五页-年度生活关键字,比如: 品质生活
     * @type {string}
     * @memberof RespHeatYearReportBO
     */
    yearKeyword?: string

}


/**
* 帮助中心设备类
* @export
* @interface RespHelpCenterDeviceBO
*/
export interface RespHelpCenterDeviceBO {
    
    /**
     * 设备名称
     * @type {string}
     * @memberof RespHelpCenterDeviceBO
     */
    deviceName?: string

    /**
     * 设备id
     * @type {string}
     * @memberof RespHelpCenterDeviceBO
     */
    iotId?: string

    /**
     * 问题类型id
     * @type {number | string}
     * @memberof RespHelpCenterDeviceBO
     */
    questionId?: number | string

    /**
     * 子设备id
     * @type {string}
     * @memberof RespHelpCenterDeviceBO
     */
    subIotId?: string

    /**
     * 设备类型
     * @type {string}
     * @memberof RespHelpCenterDeviceBO
     */
    type?: string

}


/**
* 导入返回类
* @export
* @interface RespHelpCenterImportBO
*/
export interface RespHelpCenterImportBO {
    
    /**
     * 失败条数
     * @type {number | string}
     * @memberof RespHelpCenterImportBO
     */
    failCount?: number | string

    /**
     * 成功条数
     * @type {number | string}
     * @memberof RespHelpCenterImportBO
     */
    successCount?: number | string

}


/**
* 家信息返回类
* @export
* @interface RespHomeBO
*/
export interface RespHomeBO {
    
    /**
     * 城市名称
     * @type {string}
     * @memberof RespHomeBO
     */
    cityName?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof RespHomeBO
     */
    createTime?: string

    /**
     * 删除标识：0未删除，1删除
     * @type {number | string}
     * @memberof RespHomeBO
     */
    deleted?: number | string

    /**
     * 设备数量
     * @type {number | string}
     * @memberof RespHomeBO
     */
    deviceCount?: number | string

    /**
     * 房屋id
     * @type {number | string}
     * @memberof RespHomeBO
     */
    homeId?: number | string

    /**
     * 房屋位置
     * @type {string}
     * @memberof RespHomeBO
     */
    homeLocation?: string

    /**
     * 房屋名称
     * @type {string}
     * @memberof RespHomeBO
     */
    homeName?: string

    /**
     * 主键id
     * @type {number | string}
     * @memberof RespHomeBO
     */
    id?: number | string

    /**
     * 经纬度
     * @type {string}
     * @memberof RespHomeBO
     */
    longitudeLatitude?: string

    /**
     * 模式
     * @type {number | string}
     * @memberof RespHomeBO
     */
    modeType?: number | string

    /**
     * 角色： 0 管理员 ，1普通成员
     * @type {number | string}
     * @memberof RespHomeBO
     */
    role?: number | string

    /**
     * 修改时间
     * @type {string}
     * @memberof RespHomeBO
     */
    updateTime?: string

    /**
     * 用户id
     * @type {string}
     * @memberof RespHomeBO
     */
    uuid?: string

}


/**
* 
* @export
* @interface RespHomeDetailBO
*/
export interface RespHomeDetailBO {
    
    /**
     * 
     * @type {number | string}
     * @memberof RespHomeDetailBO
     */
    familyPopulation?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof RespHomeDetailBO
     */
    floor?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof RespHomeDetailBO
     */
    glassLayer?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof RespHomeDetailBO
     */
    homeId?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof RespHomeDetailBO
     */
    id?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof RespHomeDetailBO
     */
    insulationLayer?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof RespHomeDetailBO
     */
    size?: number | string

}


/**
* 
* @export
* @interface RespHomeIdBO
*/
export interface RespHomeIdBO {
    
    /**
     * 
     * @type {string}
     * @memberof RespHomeIdBO
     */
    createTime?: string

    /**
     * 
     * @type {number | string}
     * @memberof RespHomeIdBO
     */
    homeId?: number | string

}


/**
* 
* @export
* @interface RespHomeMangeBO
*/
export interface RespHomeMangeBO {
    
    /**
     * 地址
     * @type {string}
     * @memberof RespHomeMangeBO
     */
    address?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof RespHomeMangeBO
     */
    createTime?: string

    /**
     * 设备数
     * @type {number | string}
     * @memberof RespHomeMangeBO
     */
    deviceCount?: number | string

    /**
     * 家庭ID
     * @type {number | string}
     * @memberof RespHomeMangeBO
     */
    homeId?: number | string

    /**
     * 家庭名称
     * @type {string}
     * @memberof RespHomeMangeBO
     */
    homeName?: string

    /**
     * 
     * @type {string}
     * @memberof RespHomeMangeBO
     */
    linkIotId?: string

    /**
     * 成员数
     * @type {number | string}
     * @memberof RespHomeMangeBO
     */
    memberCount?: number | string

    /**
     * 管理员手机号
     * @type {string}
     * @memberof RespHomeMangeBO
     */
    phone?: string

    /**
     * 房间数
     * @type {number | string}
     * @memberof RespHomeMangeBO
     */
    roomCount?: number | string

    /**
     * 物联网关id
     * @type {string}
     * @memberof RespHomeMangeBO
     */
    wuLianIotId?: string

}


/**
* 
* @export
* @interface RespHomeUserBO
*/
export interface RespHomeUserBO {
    
    /**
     * 家庭名称
     * @type {string}
     * @memberof RespHomeUserBO
     */
    homeName?: string

    /**
     * 手机号
     * @type {string}
     * @memberof RespHomeUserBO
     */
    phone?: string

}


/**
* 家庭卫士返回数据
* @export
* @interface RespHouseGuardsBo
*/
export interface RespHouseGuardsBo {
    
    /**
     * 用户是否修改过初始密码
     * @type {boolean}
     * @memberof RespHouseGuardsBo
     */
    isChangedPassword?: boolean

    /**
     * 用户是否在最近30天内多端登录
     * @type {boolean}
     * @memberof RespHouseGuardsBo
     */
    isMultiLogin?: boolean

    /**
     * 登录日志,如果isMultiLogin=true,则展示此日志
     * @type {Array<LoginLog>}
     * @memberof RespHouseGuardsBo
     */
    loginLogs?: Array<LoginLog>

}


/**
* 
* @export
* @interface RespIAirBo
*/
export interface RespIAirBo {
    
    /**
     * 智能空气开关,1=开启 0=关闭
     * @type {number | string}
     * @memberof RespIAirBo
     */
    airSwitch?: number | string

    /**
     * 环境传感器设备名称
     * @type {string}
     * @memberof RespIAirBo
     */
    envDeviceName?: string

    /**
     * 环境传感器设备id
     * @type {string}
     * @memberof RespIAirBo
     */
    envIotId?: string

    /**
     * 环境传感器子设备id
     * @type {string}
     * @memberof RespIAirBo
     */
    envSubIotId?: string

}


/**
* 
* @export
* @interface RespIAirItemBo
*/
export interface RespIAirItemBo {
    
    /**
     * 
     * @type {string}
     * @memberof RespIAirItemBo
     */
    airDeviceName?: string

    /**
     * 
     * @type {string}
     * @memberof RespIAirItemBo
     */
    airIotId?: string

    /**
     * 
     * @type {string}
     * @memberof RespIAirItemBo
     */
    airSubIotId?: string

    /**
     * 
     * @type {string}
     * @memberof RespIAirItemBo
     */
    envDeviceName?: string

    /**
     * 
     * @type {string}
     * @memberof RespIAirItemBo
     */
    envDeviceType?: string

    /**
     * 
     * @type {string}
     * @memberof RespIAirItemBo
     */
    envIotId?: string

    /**
     * 
     * @type {string}
     * @memberof RespIAirItemBo
     */
    envSubIotId?: string

}


/**
* 智能玩法详情
* @export
* @interface RespIPlayDetailBo
*/
export interface RespIPlayDetailBo {
    
    /**
     * 内容
     * @type {string}
     * @memberof RespIPlayDetailBo
     */
    content?: string

    /**
     * 生效时间
     * @type {string}
     * @memberof RespIPlayDetailBo
     */
    effectiveTime?: string

    /**
     * 热度
     * @type {number | string}
     * @memberof RespIPlayDetailBo
     */
    heat?: number | string

    /**
     * 图片
     * @type {string}
     * @memberof RespIPlayDetailBo
     */
    iconUrl?: string

    /**
     * 序号
     * @type {number | string}
     * @memberof RespIPlayDetailBo
     */
    id?: number | string

    /**
     * 标题
     * @type {string}
     * @memberof RespIPlayDetailBo
     */
    title?: string

}


/**
* 智能玩法分页查询返回参数
* @export
* @interface RespIPlayPageBo
*/
export interface RespIPlayPageBo {
    
    /**
     * 创建时间
     * @type {string}
     * @memberof RespIPlayPageBo
     */
    createTime?: string

    /**
     * 生效时间
     * @type {string}
     * @memberof RespIPlayPageBo
     */
    effectiveTime?: string

    /**
     * 序号
     * @type {number | string}
     * @memberof RespIPlayPageBo
     */
    id?: number | string

    /**
     * 状态:1=已生效 0=未生效
     * @type {number | string}
     * @memberof RespIPlayPageBo
     */
    status?: number | string

    /**
     * 标题
     * @type {string}
     * @memberof RespIPlayPageBo
     */
    title?: string

}


/**
* 设备导入结果
* @export
* @interface RespImportResult
*/
export interface RespImportResult {
    
    /**
     * 导入总数,等于去掉导入的重复数据后的总数
     * @type {number | string}
     * @memberof RespImportResult
     */
    allCount?: number | string

    /**
     * 导入失败设备
     * @type {Array<ReqIotDeviceBO>}
     * @memberof RespImportResult
     */
    failDevices?: Array<ReqIotDeviceBO>

    /**
     * 导入成功数
     * @type {number | string}
     * @memberof RespImportResult
     */
    successCount?: number | string

    /**
     * 导入成功设备
     * @type {Array<ReqIotDeviceBO>}
     * @memberof RespImportResult
     */
    successDevices?: Array<ReqIotDeviceBO>

}


/**
* 勋章信息
* @export
* @interface RespMedalBO
*/
export interface RespMedalBO {
    
    /**
     * 勋章总数
     * @type {number | string}
     * @memberof RespMedalBO
     */
    medalCount?: number | string

    /**
     * 勋章获取详情
     * @type {MedalDTO}
     * @memberof RespMedalBO
     */
    medalDTO?: MedalDTO

    /**
     * 排名
     * @type {number | string}
     * @memberof RespMedalBO
     */
    ranking?: number | string

}


/**
* 
* @export
* @interface RespOutboundBO
*/
export interface RespOutboundBO {
    
    /**
     * 出库数量
     * @type {number | string}
     * @memberof RespOutboundBO
     */
    amount?: number | string

    /**
     * 经销商
     * @type {string}
     * @memberof RespOutboundBO
     */
    dealer?: string

    /**
     * 经销商电话
     * @type {string}
     * @memberof RespOutboundBO
     */
    dealerPhone?: string

    /**
     * 设备类目
     * @type {string}
     * @memberof RespOutboundBO
     */
    deviceCategory?: string

    /**
     * 设备状态 1.在线,0.离线 2.不统计
     * @type {number | string}
     * @memberof RespOutboundBO
     */
    deviceStatus?: number | string

    /**
     * 设备类型
     * @type {string}
     * @memberof RespOutboundBO
     */
    deviceType?: string

    /**
     * 主键id
     * @type {number | string}
     * @memberof RespOutboundBO
     */
    id?: number | string

    /**
     * 设备id
     * @type {string}
     * @memberof RespOutboundBO
     */
    iotId?: string

    /**
     * 操作人
     * @type {string}
     * @memberof RespOutboundBO
     */
    operateId?: string

    /**
     * 出库时间
     * @type {string}
     * @memberof RespOutboundBO
     */
    outboundTime?: string

    /**
     * 出库类型
     * @type {string}
     * @memberof RespOutboundBO
     */
    outboundType?: string

}


/**
* 
* @export
* @interface RespOutboundImportBO
*/
export interface RespOutboundImportBO {
    
    /**
     * 
     * @type {number | string}
     * @memberof RespOutboundImportBO
     */
    count?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof RespOutboundImportBO
     */
    failCount?: number | string

    /**
     * 
     * @type {Array<ReqOutboundExcelBO>}
     * @memberof RespOutboundImportBO
     */
    failList?: Array<ReqOutboundExcelBO>

    /**
     * 
     * @type {number | string}
     * @memberof RespOutboundImportBO
     */
    successCount?: number | string

}


/**
* 弹窗广告boss后台详情信息
* @export
* @interface RespPopUpDetailBO
*/
export interface RespPopUpDetailBO {
    
    /**
     * 活动id
     * @type {number | string}
     * @memberof RespPopUpDetailBO
     */
    activityId?: number | string

    /**
     * 活动名称
     * @type {string}
     * @memberof RespPopUpDetailBO
     */
    activityName?: string

    /**
     * 弹窗广告id
     * @type {number | string}
     * @memberof RespPopUpDetailBO
     */
    id?: number | string

    /**
     * 图片
     * @type {string}
     * @memberof RespPopUpDetailBO
     */
    picture?: string

    /**
     * 跳转类型,1=活动 2=链接
     * @type {number | string}
     * @memberof RespPopUpDetailBO
     */
    redirectType?: number | string

    /**
     * 跳转链接
     * @type {string}
     * @memberof RespPopUpDetailBO
     */
    redirectUrl?: string

    /**
     * 标题
     * @type {string}
     * @memberof RespPopUpDetailBO
     */
    title?: string

}


/**
* boss后台首页弹窗分页查询返回数据
* @export
* @interface RespPopUpPageBO
*/
export interface RespPopUpPageBO {
    
    /**
     * 创建时间
     * @type {string}
     * @memberof RespPopUpPageBO
     */
    createTime?: string

    /**
     * 弹窗数据id
     * @type {number | string}
     * @memberof RespPopUpPageBO
     */
    id?: number | string

    /**
     * 生效状态,1=生效 0=不生效
     * @type {number | string}
     * @memberof RespPopUpPageBO
     */
    status?: number | string

    /**
     * 标题
     * @type {string}
     * @memberof RespPopUpPageBO
     */
    title?: string

}


/**
* 消息推送详情
* @export
* @interface RespPushDetailBo
*/
export interface RespPushDetailBo {
    
    /**
     * 消息通知的内容
     * @type {string}
     * @memberof RespPushDetailBo
     */
    content?: string

    /**
     * 序号
     * @type {number | string}
     * @memberof RespPushDetailBo
     */
    id?: number | string

    /**
     * 推送时间
     * @type {string}
     * @memberof RespPushDetailBo
     */
    pushTime?: string

    /**
     * 点击消息跳转类型 1=应用 2=应用内页面 3=h5页面
     * @type {number | string}
     * @memberof RespPushDetailBo
     */
    redirectType?: number | string

    /**
     * 跳转路径
     * @type {string}
     * @memberof RespPushDetailBo
     */
    redirectUrl?: string

    /**
     * 目标用户 1=所有用户 2=有效家庭的管理员
     * @type {number | string}
     * @memberof RespPushDetailBo
     */
    target?: number | string

    /**
     * 消息主题
     * @type {string}
     * @memberof RespPushDetailBo
     */
    theme?: string

}


/**
* 设备是否开启推送
* @export
* @interface RespPushDeviceBO
*/
export interface RespPushDeviceBO {
    
    /**
     * 网关id
     * @type {string}
     * @memberof RespPushDeviceBO
     */
    iotId?: string

    /**
     * 开关状态 1.开启 0.关闭
     * @type {number | string}
     * @memberof RespPushDeviceBO
     */
    status?: number | string

    /**
     * 子设备id
     * @type {string}
     * @memberof RespPushDeviceBO
     */
    subIotId?: string

}


/**
* 推送免打扰返回类
* @export
* @interface RespPushDndBO
*/
export interface RespPushDndBO {
    
    /**
     * 免打扰结束时间 格式 HH:mm
     * @type {string}
     * @memberof RespPushDndBO
     */
    endTime?: string

    /**
     * 免打扰开始时间 格式 HH:mm
     * @type {string}
     * @memberof RespPushDndBO
     */
    startTime?: string

    /**
     * 启用状态 0启用 1未启用
     * @type {string}
     * @memberof RespPushDndBO
     */
    state?: string

    /**
     * 用户id
     * @type {string}
     * @memberof RespPushDndBO
     */
    uuid?: string

}


/**
* 消息推送分页查询返回数据
* @export
* @interface RespPushMessagePageBo
*/
export interface RespPushMessagePageBo {
    
    /**
     * 创建时间
     * @type {string}
     * @memberof RespPushMessagePageBo
     */
    createTime?: string

    /**
     * 序号
     * @type {number | string}
     * @memberof RespPushMessagePageBo
     */
    id?: number | string

    /**
     * 推送数
     * @type {number | string}
     * @memberof RespPushMessagePageBo
     */
    pushCount?: number | string

    /**
     * 推送时间
     * @type {string}
     * @memberof RespPushMessagePageBo
     */
    pushTime?: string

    /**
     * 送达数
     * @type {number | string}
     * @memberof RespPushMessagePageBo
     */
    receivedCount?: number | string

    /**
     * 推送状态 0=待推送 1=已推送
     * @type {number | string}
     * @memberof RespPushMessagePageBo
     */
    status?: number | string

    /**
     * 目标用户 1=所有用户 2=有效家庭的管理员
     * @type {number | string}
     * @memberof RespPushMessagePageBo
     */
    target?: number | string

    /**
     * 消息主题
     * @type {string}
     * @memberof RespPushMessagePageBo
     */
    theme?: string

}


/**
* 单条推送效果
* @export
* @interface RespPushStatisticsBo
*/
export interface RespPushStatisticsBo {
    
    /**
     * 点击后跳转,前端直接展示
     * @type {string}
     * @memberof RespPushStatisticsBo
     */
    clickRedirect?: string

    /**
     * 消息通知的内容
     * @type {string}
     * @memberof RespPushStatisticsBo
     */
    content?: string

    /**
     * 通知在设备上被清除的数目
     * @type {number | string}
     * @memberof RespPushStatisticsBo
     */
    deletedCount?: number | string

    /**
     * 通知在设备上被点击的数目
     * @type {number | string}
     * @memberof RespPushStatisticsBo
     */
    openedCount?: number | string

    /**
     * 通知在设备上被点击的数目百分比
     * @type {number | string}
     * @memberof RespPushStatisticsBo
     */
    openedPercent?: number | string

    /**
     * 目标用户数
     * @type {number | string}
     * @memberof RespPushStatisticsBo
     */
    pushCount?: number | string

    /**
     * 推送时间
     * @type {string}
     * @memberof RespPushStatisticsBo
     */
    pushTime?: string

    /**
     * 实际送达到设备的数目
     * @type {number | string}
     * @memberof RespPushStatisticsBo
     */
    receivedCount?: number | string

    /**
     * 实际送达到设备的数目百分比
     * @type {number | string}
     * @memberof RespPushStatisticsBo
     */
    receivedPercent?: number | string

    /**
     * 点击消息跳转类型 1=应用 2=应用内页面 3=h5页面
     * @type {number | string}
     * @memberof RespPushStatisticsBo
     */
    redirectType?: number | string

    /**
     * 跳转路径
     * @type {string}
     * @memberof RespPushStatisticsBo
     */
    redirectUrl?: string

    /**
     * 目标用户 1=所有用户 2=有效家庭的管理员
     * @type {number | string}
     * @memberof RespPushStatisticsBo
     */
    target?: number | string

    /**
     * 消息主题
     * @type {string}
     * @memberof RespPushStatisticsBo
     */
    theme?: string

}


/**
* 帮助中心问题详情
* @export
* @interface RespQuestionAnswerBO
*/
export interface RespQuestionAnswerBO {
    
    /**
     * 问题答案
     * @type {string}
     * @memberof RespQuestionAnswerBO
     */
    answer?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof RespQuestionAnswerBO
     */
    createTime?: string

    /**
     * 主键id
     * @type {number | string}
     * @memberof RespQuestionAnswerBO
     */
    id?: number | string

    /**
     * 问题title
     * @type {string}
     * @memberof RespQuestionAnswerBO
     */
    question?: string

    /**
     * 问题类目描述
     * @type {string}
     * @memberof RespQuestionAnswerBO
     */
    questionDescription?: string

    /**
     * 问题类型id
     * @type {number | string}
     * @memberof RespQuestionAnswerBO
     */
    questionId?: number | string

    /**
     * 设备类型
     * @type {string}
     * @memberof RespQuestionAnswerBO
     */
    type?: string

    /**
     * 修改时间
     * @type {string}
     * @memberof RespQuestionAnswerBO
     */
    updateTime?: string

}


/**
* 帮助中心类目返回类
* @export
* @interface RespQuestionTypeBO
*/
export interface RespQuestionTypeBO {
    
    /**
     * 创建时间
     * @type {string}
     * @memberof RespQuestionTypeBO
     */
    createTime?: string

    /**
     * 问题类目描述
     * @type {string}
     * @memberof RespQuestionTypeBO
     */
    questionDescription?: string

    /**
     * 问题类目icon
     * @type {string}
     * @memberof RespQuestionTypeBO
     */
    questionIcon?: string

    /**
     * 问题类目id
     * @type {number | string}
     * @memberof RespQuestionTypeBO
     */
    questionId?: number | string

    /**
     * 子类目 全部设备和智能音箱有
     * @type {Array<RespHelpCenterDeviceBO>}
     * @memberof RespQuestionTypeBO
     */
    respdeviceBOList?: Array<RespHelpCenterDeviceBO>

    /**
     * 修改时间
     * @type {string}
     * @memberof RespQuestionTypeBO
     */
    updateTime?: string

}


/**
* 
* @export
* @interface RespRemind
*/
export interface RespRemind {
    
    /**
     * 已激活设备-小程序展示
     * @type {string}
     * @memberof RespRemind
     */
    activeDevices?: string

    /**
     * 代理商
     * @type {string}
     * @memberof RespRemind
     */
    agentCompanyName?: string

    /**
     * 代理商手机号
     * @type {string}
     * @memberof RespRemind
     */
    agentPhone?: string

    /**
     * 批次号
     * @type {string}
     * @memberof RespRemind
     */
    batchNo?: string

    /**
     * 业主手机号
     * @type {string}
     * @memberof RespRemind
     */
    phone?: string

    /**
     * 服务提醒信息列表
     * @type {Array<string>}
     * @memberof RespRemind
     */
    serviceReminds?: Array<string>

    /**
     * 日期
     * @type {string}
     * @memberof RespRemind
     */
    time?: string

}


/**
* 
* @export
* @interface RespRoomBO
*/
export interface RespRoomBO {
    
    /**
     * 
     * @type {number | string}
     * @memberof RespRoomBO
     */
    bigSwitch?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof RespRoomBO
     */
    deviceCount?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof RespRoomBO
     */
    homeId?: number | string

    /**
     * 
     * @type {string}
     * @memberof RespRoomBO
     */
    roomIcon?: string

    /**
     * 
     * @type {number | string}
     * @memberof RespRoomBO
     */
    roomId?: number | string

    /**
     * 
     * @type {string}
     * @memberof RespRoomBO
     */
    roomName?: string

    /**
     * 
     * @type {number | string}
     * @memberof RespRoomBO
     */
    roomSize?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof RespRoomBO
     */
    window?: number | string

}


/**
* 
* @export
* @interface RespRoomDetailBO
*/
export interface RespRoomDetailBO {
    
    /**
     * 智能调温大开关 0 未启用 1 启用
     * @type {number | string}
     * @memberof RespRoomDetailBO
     */
    bigSwitch?: number | string

    /**
     * 模式 1制冷 4制热
     * @type {number | string}
     * @memberof RespRoomDetailBO
     */
    comfortType?: number | string

    /**
     * 设备数量
     * @type {number | string}
     * @memberof RespRoomDetailBO
     */
    deviceCount?: number | string

    /**
     * 房间内设备
     * @type {Array<RespRoomdeviceBO>}
     * @memberof RespRoomDetailBO
     */
    devices?: Array<RespRoomdeviceBO>

    /**
     * 房间id
     * @type {number | string}
     * @memberof RespRoomDetailBO
     */
    roomId?: number | string

    /**
     * 房间名称
     * @type {string}
     * @memberof RespRoomDetailBO
     */
    roomName?: string

    /**
     * 房间面积
     * @type {number | string}
     * @memberof RespRoomDetailBO
     */
    roomSize?: number | string

    /**
     * 目标湿度
     * @type {number | string}
     * @memberof RespRoomDetailBO
     */
    targetHumidity?: number | string

    /**
     * 目标温度
     * @type {number | string}
     * @memberof RespRoomDetailBO
     */
    targetTemperature?: number | string

    /**
     * 是否有落地窗  0 无 ，1有
     * @type {number | string}
     * @memberof RespRoomDetailBO
     */
    window?: number | string

}


/**
* 
* @export
* @interface RespRoomIconBO
*/
export interface RespRoomIconBO {
    
    /**
     * 
     * @type {string}
     * @memberof RespRoomIconBO
     */
    createTime?: string

    /**
     * 
     * @type {string}
     * @memberof RespRoomIconBO
     */
    iconImage?: string

    /**
     * 
     * @type {string}
     * @memberof RespRoomIconBO
     */
    iconName?: string

    /**
     * 
     * @type {number | string}
     * @memberof RespRoomIconBO
     */
    id?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof RespRoomIconBO
     */
    type?: number | string

    /**
     * 
     * @type {string}
     * @memberof RespRoomIconBO
     */
    updateTime?: string

}


/**
* 
* @export
* @interface RespRoomdeviceBO
*/
export interface RespRoomdeviceBO {
    
    /**
     * 经销商
     * @type {string}
     * @memberof RespRoomdeviceBO
     */
    dealer?: string

    /**
     * 经销商电话
     * @type {string}
     * @memberof RespRoomdeviceBO
     */
    dealerPhone?: string

    /**
     * 该类型设备数量
     * @type {number | string}
     * @memberof RespRoomdeviceBO
     */
    deviceCount?: number | string

    /**
     * 该类型对应设备名称
     * @type {string}
     * @memberof RespRoomdeviceBO
     */
    deviceName?: string

    /**
     * 设备id
     * @type {string}
     * @memberof RespRoomdeviceBO
     */
    iotId?: string

    /**
     * 设备状态 0离线 1在线
     * @type {string}
     * @memberof RespRoomdeviceBO
     */
    state?: string

}


/**
* 
* @export
* @interface RespSceneInfoBO
*/
export interface RespSceneInfoBO {
    
    /**
     * 
     * @type {number | string}
     * @memberof RespSceneInfoBO
     */
    homeId?: number | string

    /**
     * 
     * @type {string}
     * @memberof RespSceneInfoBO
     */
    homeName?: string

    /**
     * 
     * @type {number | string}
     * @memberof RespSceneInfoBO
     */
    id?: number | string

    /**
     * 
     * @type {string}
     * @memberof RespSceneInfoBO
     */
    sceneIcon?: string

    /**
     * 
     * @type {string}
     * @memberof RespSceneInfoBO
     */
    sceneName?: string

}


/**
* 服务订单返回类
* @export
* @interface RespServiceOrderBo
*/
export interface RespServiceOrderBo {
    
    /**
     * 创建时间
     * @type {string}
     * @memberof RespServiceOrderBo
     */
    createTime?: string

    /**
     * 联系人地址
     * @type {string}
     * @memberof RespServiceOrderBo
     */
    customerAddress?: string

    /**
     * 联系人
     * @type {string}
     * @memberof RespServiceOrderBo
     */
    customerName?: string

    /**
     * 联系电话
     * @type {string}
     * @memberof RespServiceOrderBo
     */
    customerPhone?: string

    /**
     * 操作人id
     * @type {string}
     * @memberof RespServiceOrderBo
     */
    operator?: string

    /**
     * 照片地址 多个以 ','隔开
     * @type {string}
     * @memberof RespServiceOrderBo
     */
    pictureUrl?: string

    /**
     * 故障产品
     * @type {string}
     * @memberof RespServiceOrderBo
     */
    product?: string

    /**
     * 备注
     * @type {string}
     * @memberof RespServiceOrderBo
     */
    remark?: string

    /**
     * 服务单号
     * @type {string}
     * @memberof RespServiceOrderBo
     */
    serviceNo?: string

    /**
     * 服务时间
     * @type {string}
     * @memberof RespServiceOrderBo
     */
    serviceTime?: string

    /**
     * 服务单类型 1：预约维修，2：清洗保养
     * @type {number | string}
     * @memberof RespServiceOrderBo
     */
    serviceType?: number | string

}


/**
* 
* @export
* @interface RespSpeciesBO
*/
export interface RespSpeciesBO {
    
    /**
     * 设备类型名称
     * @type {string}
     * @memberof RespSpeciesBO
     */
    name?: string

    /**
     * 设备类型
     * @type {string}
     * @memberof RespSpeciesBO
     */
    type?: string

}


/**
* 活动返回信息
* @export
* @interface RespSplashAppBo
*/
export interface RespSplashAppBo {
    
    /**
     * 活动id
     * @type {number | string}
     * @memberof RespSplashAppBo
     */
    activityId?: number | string

    /**
     * 活动的状态,1=正常 0=非正常,活动已经结束或者活动被删除
     * @type {number | string}
     * @memberof RespSplashAppBo
     */
    activityStatus?: number | string

    /**
     * 此记录的唯一id
     * @type {number | string}
     * @memberof RespSplashAppBo
     */
    id?: number | string

    /**
     * 跳转的链接
     * @type {string}
     * @memberof RespSplashAppBo
     */
    linkUrl?: string

    /**
     * 图片
     * @type {string}
     * @memberof RespSplashAppBo
     */
    picture?: string

    /**
     * 跳转类型,1=活动页 2=指定链接
     * @type {number | string}
     * @memberof RespSplashAppBo
     */
    redirectType?: number | string

}


/**
* 闪屏详情
* @export
* @interface RespSplashDetailBO
*/
export interface RespSplashDetailBO {
    
    /**
     * 活动id
     * @type {number | string}
     * @memberof RespSplashDetailBO
     */
    activityId?: number | string

    /**
     * 活动名称
     * @type {string}
     * @memberof RespSplashDetailBO
     */
    activityName?: string

    /**
     * 序号
     * @type {number | string}
     * @memberof RespSplashDetailBO
     */
    id?: number | string

    /**
     * 图片
     * @type {string}
     * @memberof RespSplashDetailBO
     */
    picture?: string

    /**
     * 标题
     * @type {string}
     * @memberof RespSplashDetailBO
     */
    title?: string

}


/**
* 闪屏页boss后台分页查询数据
* @export
* @interface RespSplashScreenPageBo
*/
export interface RespSplashScreenPageBo {
    
    /**
     * 活动id,为空则表示无关联活动
     * @type {number | string}
     * @memberof RespSplashScreenPageBo
     */
    activityId?: number | string

    /**
     * 关联活动状态,1=生效 0=未生效
     * @type {number | string}
     * @memberof RespSplashScreenPageBo
     */
    activityStatus?: number | string

    /**
     * 创建时间
     * @type {string}
     * @memberof RespSplashScreenPageBo
     */
    createTime?: string

    /**
     * 序号
     * @type {number | string}
     * @memberof RespSplashScreenPageBo
     */
    id?: number | string

    /**
     * 闪屏页状态,1=生效 0=未生效
     * @type {number | string}
     * @memberof RespSplashScreenPageBo
     */
    status?: number | string

    /**
     * 标题
     * @type {string}
     * @memberof RespSplashScreenPageBo
     */
    title?: string

}


/**
* 
* @export
* @interface RespStatBO
*/
export interface RespStatBO {
    
    /**
     * 
     * @type {string}
     * @memberof RespStatBO
     */
    dateTime?: string

    /**
     * 
     * @type {number | string}
     * @memberof RespStatBO
     */
    outValue?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof RespStatBO
     */
    value?: number | string

}


/**
* 子设备返回类
* @export
* @interface RespSubDeviceBO
*/
export interface RespSubDeviceBO {
    
    /**
     * 
     * @type {string}
     * @memberof RespSubDeviceBO
     */
    createTime?: string

    /**
     * 关机时间  分钟
     * @type {number | string}
     * @memberof RespSubDeviceBO
     */
    delayCloseTime?: number | string

    /**
     * 开机时间  分钟
     * @type {number | string}
     * @memberof RespSubDeviceBO
     */
    delayOpenTime?: number | string

    /**
     * 设备名称
     * @type {string}
     * @memberof RespSubDeviceBO
     */
    deviceName?: string

    /**
     * 端点
     * @type {string}
     * @memberof RespSubDeviceBO
     */
    endpoint?: string

    /**
     * 厂商id
     * @type {number | string}
     * @memberof RespSubDeviceBO
     */
    factoryId?: number | string

    /**
     * id
     * @type {number | string}
     * @memberof RespSubDeviceBO
     */
    id?: number | string

    /**
     * 设备id
     * @type {string}
     * @memberof RespSubDeviceBO
     */
    iotId?: string

    /**
     * 最长开启时间
     * @type {string}
     * @memberof RespSubDeviceBO
     */
    maxOpenTime?: string

    /**
     * 房间id
     * @type {number | string}
     * @memberof RespSubDeviceBO
     */
    roomId?: number | string

    /**
     * 房间名称
     * @type {string}
     * @memberof RespSubDeviceBO
     */
    roomName?: string

    /**
     * 子设备id
     * @type {string}
     * @memberof RespSubDeviceBO
     */
    subIotId?: string

    /**
     * 设备类型
     * @type {string}
     * @memberof RespSubDeviceBO
     */
    type?: string

    /**
     * 
     * @type {string}
     * @memberof RespSubDeviceBO
     */
    updateTime?: string

}


/**
* 设备运行数据
* @export
* @interface RespSubDeviceDataBO
*/
export interface RespSubDeviceDataBO {
    
    /**
     * 室内湿度
     * @type {string}
     * @memberof RespSubDeviceDataBO
     */
    humidity?: string

    /**
     * 开关 0关闭 1打开
     * @type {string}
     * @memberof RespSubDeviceDataBO
     */
    openClose?: string

    /**
     * 室内pm
     * @type {string}
     * @memberof RespSubDeviceDataBO
     */
    pm?: string

    /**
     * 房间名称
     * @type {string}
     * @memberof RespSubDeviceDataBO
     */
    roomName?: string

    /**
     * 在线状态 1在线 0离线
     * @type {string}
     * @memberof RespSubDeviceDataBO
     */
    status?: string

    /**
     * 设定温度
     * @type {string}
     * @memberof RespSubDeviceDataBO
     */
    temperature?: string

    /**
     * 室内温度
     * @type {string}
     * @memberof RespSubDeviceDataBO
     */
    temperature_inner?: string

    /**
     * 风速 1低速 2中速 3高速
     * @type {string}
     * @memberof RespSubDeviceDataBO
     */
    windSpeed?: string

    /**
     * 工作模式 1-空调制冷 2-地暖制热 3-空调制热 4-双制热 5-空调通风
     * @type {string}
     * @memberof RespSubDeviceDataBO
     */
    workMode?: string

}


/**
* 
* @export
* @interface RespSvcIdBo
*/
export interface RespSvcIdBo {
    
    /**
     * 
     * @type {string}
     * @memberof RespSvcIdBo
     */
    svcId?: string

}


/**
* 告警时长统计类
* @export
* @interface RespTimeStatistics
*/
export interface RespTimeStatistics {
    
    /**
     * 离线设备分类数量，key为设备类型，value为数量
     * @type {object}
     * @memberof RespTimeStatistics
     */
    countMap?: object

    /**
     * 离线时长：30分钟内数量
     * @type {number | string}
     * @memberof RespTimeStatistics
     */
    innerThirtyCount?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof RespTimeStatistics
     */
    ninetyToOneHundredAndTwentyCount?: number | string

    /**
     * 离线时长：超120分钟数量
     * @type {number | string}
     * @memberof RespTimeStatistics
     */
    overOneHundredAndTwentyCount?: number | string

    /**
     * 离线时长：60-90分钟内数量
     * @type {number | string}
     * @memberof RespTimeStatistics
     */
    sixtyToNinetyCount?: number | string

    /**
     * 离线时长：30-60分钟内数量
     * @type {number | string}
     * @memberof RespTimeStatistics
     */
    thirtyToSixtyCount?: number | string

}


/**
* 
* @export
* @interface RespTypeBo
*/
export interface RespTypeBo {
    
    /**
     * 
     * @type {string}
     * @memberof RespTypeBo
     */
    type?: string

}


/**
* 
* @export
* @interface RespUserBO
*/
export interface RespUserBO {
    
    /**
     * 
     * @type {string}
     * @memberof RespUserBO
     */
    avatar?: string

    /**
     * 
     * @type {string}
     * @memberof RespUserBO
     */
    homeName?: string

    /**
     * 
     * @type {number | string}
     * @memberof RespUserBO
     */
    id?: number | string

    /**
     * 
     * @type {string}
     * @memberof RespUserBO
     */
    nick?: string

    /**
     * 
     * @type {string}
     * @memberof RespUserBO
     */
    phone?: string

    /**
     * 
     * @type {string}
     * @memberof RespUserBO
     */
    role?: string

    /**
     * 
     * @type {string}
     * @memberof RespUserBO
     */
    uuid?: string

}


/**
* 用户换肤返回类
* @export
* @interface RespUserChangeSinBO
*/
export interface RespUserChangeSinBO {
    
    /**
     * android皮肤包路径
     * @type {string}
     * @memberof RespUserChangeSinBO
     */
    androidSkinPath?: string

    /**
     * ios皮肤包路径
     * @type {string}
     * @memberof RespUserChangeSinBO
     */
    iosSkinPath?: string

    /**
     * 皮肤包名称
     * @type {string}
     * @memberof RespUserChangeSinBO
     */
    skinPackageName?: string

    /**
     * 用户id
     * @type {string}
     * @memberof RespUserChangeSinBO
     */
    uuid?: string

}


/**
* 用户喜爱设置-返回数据
* @export
* @interface RespUserFavBo
*/
export interface RespUserFavBo {
    
    /**
     * 类型,1=温度,2=模式,3=新风机风速,9=空调风速
     * @type {number | string}
     * @memberof RespUserFavBo
     */
    favType?: number | string

    /**
     * 次数
     * @type {number | string}
     * @memberof RespUserFavBo
     */
    times?: number | string

    /**
     * 度数、模式值或者风速值
     * @type {string}
     * @memberof RespUserFavBo
     */
    value?: string

}


/**
* 
* @export
* @interface RespUserStatisticsBO
*/
export interface RespUserStatisticsBO {
    
    /**
     * 
     * @type {Array<RespDeviceDistribution>}
     * @memberof RespUserStatisticsBO
     */
    deviceDistribution?: Array<RespDeviceDistribution>

    /**
     * 
     * @type {number | string}
     * @memberof RespUserStatisticsBO
     */
    homeMembers?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof RespUserStatisticsBO
     */
    homes?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof RespUserStatisticsBO
     */
    onlineCount?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof RespUserStatisticsBO
     */
    outBoundCount?: number | string

}


/**
* 天气
* @export
* @interface RespWeatherBo
*/
export interface RespWeatherBo {
    
    /**
     * cond_code,如: 104
     * @type {number | string}
     * @memberof RespWeatherBo
     */
    condCode?: number | string

    /**
     * cond_txt,如: 阴
     * @type {string}
     * @memberof RespWeatherBo
     */
    condTxt?: string

    /**
     * 湿度
     * @type {number | string}
     * @memberof RespWeatherBo
     */
    hum?: number | string

    /**
     * 湿度描述,潮湿等
     * @type {string}
     * @memberof RespWeatherBo
     */
    humDesc?: string

    /**
     * pm2.5值
     * @type {number | string}
     * @memberof RespWeatherBo
     */
    pm?: number | string

    /**
     * pm描述,优、良等等
     * @type {string}
     * @memberof RespWeatherBo
     */
    pmDesc?: string

    /**
     * 温度
     * @type {number | string}
     * @memberof RespWeatherBo
     */
    tmp?: number | string

    /**
     * 温度描述,微暖等
     * @type {string}
     * @memberof RespWeatherBo
     */
    tmpDesc?: string

}


/**
* 
* @export
* @interface RespWisdomCalendarBO
*/
export interface RespWisdomCalendarBO {
    
    /**
     * 
     * @type {string}
     * @memberof RespWisdomCalendarBO
     */
    calendarValue?: string

    /**
     * 
     * @type {string}
     * @memberof RespWisdomCalendarBO
     */
    date?: string

    /**
     * 
     * @type {string}
     * @memberof RespWisdomCalendarBO
     */
    iotId?: string

    /**
     * 
     * @type {string}
     * @memberof RespWisdomCalendarBO
     */
    subIotId?: string

}


/**
* 智慧模式返回类
* @export
* @interface RespWisdomModeBO
*/
export interface RespWisdomModeBO {
    
    /**
     * 自定义日期1智慧模式设置
     * @type {string}
     * @memberof RespWisdomModeBO
     */
    custom1List?: string

    /**
     * 自定义日期1名称
     * @type {string}
     * @memberof RespWisdomModeBO
     */
    custom1Name?: string

    /**
     * 自定义日期2智慧模式设置
     * @type {string}
     * @memberof RespWisdomModeBO
     */
    custom2List?: string

    /**
     * 自定义日期2名称
     * @type {string}
     * @memberof RespWisdomModeBO
     */
    custom2Name?: string

    /**
     * 休息日智慧模式
     * @type {string}
     * @memberof RespWisdomModeBO
     */
    holidayList?: string

    /**
     * 设备id
     * @type {string}
     * @memberof RespWisdomModeBO
     */
    iotId?: string

    /**
     * 是否开启预升温(1=开启,0=关闭)
     * @type {number | string}
     * @memberof RespWisdomModeBO
     */
    preTempSwitch?: number | string

    /**
     * 子设备id
     * @type {string}
     * @memberof RespWisdomModeBO
     */
    subIotId?: string

    /**
     * 工作日智慧模式
     * @type {string}
     * @memberof RespWisdomModeBO
     */
    workdayList?: string

}


/**
* 年度采暖报告
* @export
* @interface RespYearReportBO
*/
export interface RespYearReportBO {
    
    /**
     * 首页是否已经弹过框了,弹过了不必再弹,1=是 0=否  暂时不使用此字段
     * @type {number | string}
     * @memberof RespYearReportBO
     */
    isPoped?: number | string

    /**
     * 年度报告的数据,为空则不展示年度报告
     * @type {RespHeatYearReportBO}
     * @memberof RespYearReportBO
     */
    yearReportData?: RespHeatYearReportBO

}


/**
* 用户点击弹框事件BO
* @export
* @interface ResqClickBounceBO
*/
export interface ResqClickBounceBO {
    
    /**
     * 点击类型
     * @type {string}
     * @memberof ResqClickBounceBO
     */
    clickType?: string

    /**
     * 保养状态,1=已保养 0=尚未保养
     * @type {number | string}
     * @memberof ResqClickBounceBO
     */
    maintainStatus?: number | string

    /**
     * 总运行时间
     * @type {string}
     * @memberof ResqClickBounceBO
     */
    totalHours?: string

}


/**
* 
* @export
* @interface SceneInfoPO
*/
export interface SceneInfoPO {
    
    /**
     * 
     * @type {string}
     * @memberof SceneInfoPO
     */
    actionData?: string

    /**
     * 
     * @type {string}
     * @memberof SceneInfoPO
     */
    conditionData?: string

    /**
     * 
     * @type {number | string}
     * @memberof SceneInfoPO
     */
    conditionLogic?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof SceneInfoPO
     */
    conditionResult?: number | string

    /**
     * 
     * @type {string}
     * @memberof SceneInfoPO
     */
    createTime?: string

    /**
     * 
     * @type {string}
     * @memberof SceneInfoPO
     */
    effectDay?: string

    /**
     * 
     * @type {string}
     * @memberof SceneInfoPO
     */
    effectEndTime?: string

    /**
     * 
     * @type {string}
     * @memberof SceneInfoPO
     */
    effectStartTime?: string

    /**
     * 
     * @type {number | string}
     * @memberof SceneInfoPO
     */
    effectTimeState?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof SceneInfoPO
     */
    executeType?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof SceneInfoPO
     */
    homeId?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof SceneInfoPO
     */
    id?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof SceneInfoPO
     */
    isDisplay?: number | string

    /**
     * 
     * @type {string}
     * @memberof SceneInfoPO
     */
    phone?: string

    /**
     * 
     * @type {string}
     * @memberof SceneInfoPO
     */
    sceneIcon?: string

    /**
     * 
     * @type {string}
     * @memberof SceneInfoPO
     */
    sceneName?: string

    /**
     * 
     * @type {number | string}
     * @memberof SceneInfoPO
     */
    sceneType?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof SceneInfoPO
     */
    startState?: number | string

    /**
     * 
     * @type {string}
     * @memberof SceneInfoPO
     */
    updateTime?: string

    /**
     * 
     * @type {string}
     * @memberof SceneInfoPO
     */
    uuid?: string

}


/**
* 
* @export
* @interface Sort
*/
export interface Sort {
    
    /**
     * 
     * @type {boolean}
     * @memberof Sort
     */
    empty?: boolean

    /**
     * 
     * @type {boolean}
     * @memberof Sort
     */
    sorted?: boolean

    /**
     * 
     * @type {boolean}
     * @memberof Sort
     */
    unsorted?: boolean

}


/**
* 
* @export
* @interface SubDevicePO
*/
export interface SubDevicePO {
    
    /**
     * 
     * @type {string}
     * @memberof SubDevicePO
     */
    createTime?: string

    /**
     * 
     * @type {string}
     * @memberof SubDevicePO
     */
    deviceName?: string

    /**
     * 
     * @type {number | string}
     * @memberof SubDevicePO
     */
    excepted?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof SubDevicePO
     */
    id?: number | string

    /**
     * 
     * @type {string}
     * @memberof SubDevicePO
     */
    iotId?: string

    /**
     * 
     * @type {number | string}
     * @memberof SubDevicePO
     */
    sort?: number | string

    /**
     * 
     * @type {string}
     * @memberof SubDevicePO
     */
    subIotId?: string

    /**
     * 
     * @type {string}
     * @memberof SubDevicePO
     */
    type?: string

    /**
     * 
     * @type {string}
     * @memberof SubDevicePO
     */
    updateTime?: string

}


/**
* 
* @export
* @interface ThreeDevicePO
*/
export interface ThreeDevicePO {
    
    /**
     * 
     * @type {string}
     * @memberof ThreeDevicePO
     */
    createTime?: string

    /**
     * 
     * @type {string}
     * @memberof ThreeDevicePO
     */
    deviceName?: string

    /**
     * 
     * @type {string}
     * @memberof ThreeDevicePO
     */
    endpoint?: string

    /**
     * 
     * @type {number | string}
     * @memberof ThreeDevicePO
     */
    id?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof ThreeDevicePO
     */
    sort?: number | string

    /**
     * 
     * @type {string}
     * @memberof ThreeDevicePO
     */
    subIotId?: string

    /**
     * 
     * @type {string}
     * @memberof ThreeDevicePO
     */
    svcId?: string

    /**
     * 
     * @type {string}
     * @memberof ThreeDevicePO
     */
    type?: string

    /**
     * 
     * @type {string}
     * @memberof ThreeDevicePO
     */
    updateTime?: string

}


/**
* 
* @export
* @interface UpgradeDetailResponse
*/
export interface UpgradeDetailResponse {
    
    /**
     * 完成升级数量
     * @type {number | string}
     * @memberof UpgradeDetailResponse
     */
    completeUpgrade?: number | string

    /**
     * 设备型号对应的上传id
     * @type {string}
     * @memberof UpgradeDetailResponse
     */
    factorySecretId?: string

    /**
     * 未完成升级数量
     * @type {number | string}
     * @memberof UpgradeDetailResponse
     */
    incompleteUpgrade?: number | string

    /**
     * 1通用 0定向
     * @type {number | string}
     * @memberof UpgradeDetailResponse
     */
    isCommon?: number | string

    /**
     * 备注
     * @type {string}
     * @memberof UpgradeDetailResponse
     */
    remark?: string

    /**
     * 设备型号-编码
     * @type {string}
     * @memberof UpgradeDetailResponse
     */
    type?: string

    /**
     * 设备型号
     * @type {string}
     * @memberof UpgradeDetailResponse
     */
    typeName?: string

    /**
     * 版本号
     * @type {string}
     * @memberof UpgradeDetailResponse
     */
    version?: string

}


/**
* 
* @export
* @interface UpgradeDetailsResponse
*/
export interface UpgradeDetailsResponse {
    
    /**
     * 导入时间
     * @type {string}
     * @memberof UpgradeDetailsResponse
     */
    createTime?: string

    /**
     * id
     * @type {number | string}
     * @memberof UpgradeDetailsResponse
     */
    id?: number | string

    /**
     * 设备Id
     * @type {string}
     * @memberof UpgradeDetailsResponse
     */
    iotId?: string

    /**
     * 版本号
     * @type {string}
     * @memberof UpgradeDetailsResponse
     */
    version?: string

}


/**
* 
* @export
* @interface UpgradeRequest
*/
export interface UpgradeRequest {
    
    /**
     * 通用 1 ，定向 0
     * @type {number | string}
     * @memberof UpgradeRequest
     */
    isCommon?: number | string

    /**
     * 操作人
     * @type {string}
     * @memberof UpgradeRequest
     */
    operator?: string

    /**
     * 操作人手机号（用来验证权限）
     * @type {string}
     * @memberof UpgradeRequest
     */
    phone?: string

    /**
     * 备注
     * @type {string}
     * @memberof UpgradeRequest
     */
    remark?: string

    /**
     * 设备型号
     * @type {string}
     * @memberof UpgradeRequest
     */
    type?: string

    /**
     * 版本号
     * @type {string}
     * @memberof UpgradeRequest
     */
    version?: string

}


/**
* 
* @export
* @interface UpgradeResponse
*/
export interface UpgradeResponse {
    
    /**
     * 创建时间
     * @type {string}
     * @memberof UpgradeResponse
     */
    createTime?: string

    /**
     * id
     * @type {number | string}
     * @memberof UpgradeResponse
     */
    id?: number | string

    /**
     * 备注
     * @type {string}
     * @memberof UpgradeResponse
     */
    remark?: string

    /**
     * 设备型号
     * @type {string}
     * @memberof UpgradeResponse
     */
    type?: string

    /**
     * 版本号
     * @type {string}
     * @memberof UpgradeResponse
     */
    version?: string

}


/**
* 
* @export
* @interface UpgradeTypeResponse
*/
export interface UpgradeTypeResponse {
    
    /**
     * 上传目录id
     * @type {string}
     * @memberof UpgradeTypeResponse
     */
    factorySecretId?: string

    /**
     * 设备型号-编码
     * @type {string}
     * @memberof UpgradeTypeResponse
     */
    typeCode?: string

    /**
     * 设备型号
     * @type {string}
     * @memberof UpgradeTypeResponse
     */
    typeName?: string

}


/**
* 
* @export
* @interface UploadData
*/
export interface UploadData {
    
    /**
     * 
     * @type {string}
     * @memberof UploadData
     */
    iotId?: string

}


/**
* 
* @export
* @interface UserEnvironmentDataPO
*/
export interface UserEnvironmentDataPO {
    
    /**
     * 
     * @type {string}
     * @memberof UserEnvironmentDataPO
     */
    createTime?: string

    /**
     * 
     * @type {string}
     * @memberof UserEnvironmentDataPO
     */
    environmentData?: string

    /**
     * 
     * @type {number | string}
     * @memberof UserEnvironmentDataPO
     */
    homeId?: number | string

    /**
     * 
     * @type {number | string}
     * @memberof UserEnvironmentDataPO
     */
    id?: number | string

    /**
     * 
     * @type {string}
     * @memberof UserEnvironmentDataPO
     */
    updateTime?: string

    /**
     * 
     * @type {string}
     * @memberof UserEnvironmentDataPO
     */
    uuid?: string

}

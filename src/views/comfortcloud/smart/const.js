// 项目类型key值
export const PROJECT_TYPE_KEY = {
    // 氟机空调集控系统
    FLUORINE_AIR: '1',
    // 水机空调集控系统
    WATER_AIR: '2',
    // 计费系统 -- 智能空开
    BILLING_SYSTEM: '3',
    // 计费系统 -- 智能电表
    BILLING_SYSTEM_ELECTRICITY_METER: '4',
    // 计费系统 -- 热量表
    BILLING_SYSTEM_HEAT_METER: '5',
    // 计费系统 -- 时间型
    BILLING_SYSTEM_TIME: '6',
    // 计费系统 -- 分体空调
    BILLING_SYSTEM_FT_AIR: '7',
    // 计费系统 -- 计量插座
    BILLING_SYSTEM_SOCKET: '8',
    // 节能系统
    ENERGY_SAVING_SYSTEM: '11',
    // 分体空调集控系统
    FT_AIR: '12'
}
/** 集控系统 */
// export const PROJECT_TYPE_OPTIONS = new Map([
//     ['1', '氟机空调集控系统'],
//     ['2', '水机空调集控系统'],
//     ['12', '分体空调集控系统'],
//     ['13', '普通开关照明集控系统'],
//     ['14', '调光面板照明集控系统'],
//     ['15', '窗帘集控系统'],
//     ['16', '插座集控系统'],
//     ['17', '环境检测系统'],
//     ['18', '门禁系统'],
//     ['3', '计费系统'],
//     ['11', '节能系统']
// ])

// export const FEE_TYPE_OPTIONS = new Map([
//     ['1', '智能电表'],
//     ['0', '智能空开'],
//     ['2', '热量表'],
//     ['3', '时间型'],
//     ['4', '分体空调']
//     // ['5', '计量插座']
// ])

// 是否是通用升级
export const DEVICE_UPGRADE_IS_COMMON_KEY = {
    YES: '1',
    NO: '0'
}

// 品牌名称
export const BRAND_OPTIONS = [
    { label: '海康', value: 'hikVision', subValue: ['video'], config: '{"key": "", "secret": "", "brandName": "海康", "accessAddress": ""}' },
    { label: '正泰', value: 'techsel', subValue: ['management'], config: '{"loginName": "", "passward": "", "domain": "", "accessAddress": ""}' }
]

// 子系统类型
export const SUB_SYSTEM_TYPE_OPTIONS = [
    { label: '视频监控', value: 'video', parentValue: 'hikVision' },
    { label: '综合能源管理', value: 'management', parentValue: 'techsel' }
]

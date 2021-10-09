// 项目类型key值
export const PROJECT_TYPE_KEY = {
    // 氟机空调集控系统
    FLUORINE_AIR: '1',
    // 水机空调集控系统
    WATER_AIR: '2',
    // 计费系统
    BILLING_SYSTEM: '3',
    // 节能系统
    ENERGY_SAVING_SYSTEM: '11'
}

export const PROJECT_TYPE_OPTIONS = new Map([
    ['1', '氟机空调集控系统'],
    ['2', '水机空调集控系统'],
    ['3', '计费系统'],
    ['11', '节能系统']
])

export const FEE_TYPE_OPTIONS = new Map([
    ['1', '热量表'],
    ['2', '智能电表'],
    ['3', '智能空开']
])
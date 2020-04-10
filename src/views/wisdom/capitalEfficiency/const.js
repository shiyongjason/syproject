export const CAPITAL_EFFICIENCY_TABLE = [
    { label: 'MIS编码', prop: 'companyShortName' },
    { label: '平台公司', prop: 'misCode' },
    { label: '分部', prop: 'subsectionName' },
    { label: '资金周转次数', prop: 'cityName' },
    { label: '销售金额', prop: 'onlineTime' },
    { label: '资金占用总计', prop: 'incremental' },
    { label: '资金敞口占用', prop: 'targetDate' },
    { label: '资金借款占用', prop: 'performanceTarget', formatters: 'money' },
    { label: '资金分授信占用', prop: 'sprintTarget', formatters: 'money' },
    { label: '好享家注资占用', prop: 'updateUser' },
    { label: '实控人注资占用', prop: 'updateTime' },
    { label: '备注', prop: 'remark' }
]

export const ONLINESTATUS = [
    { key: '', value: '全部' },
    { key: 1, value: '未淘汰' },
    { key: 0, value: '淘汰' }
]

export const HOSJOYINJECTION = [
    { key: '', value: '全部' },
    { key: 1, value: '已注资' },
    { key: 0, value: '未注资' }
]

export const FINANCIALSUPPORT = [
    { key: '', value: '全部' },
    { key: 1, value: '有支持' },
    { key: 0, value: '无支持' }
]
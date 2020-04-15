export const CAPITAL_EFFICIENCY_TABLE = [
    { label: 'MIS编码', prop: 'misCode' },
    { label: '平台公司', prop: 'loanCompanyName', width: 100 },
    { label: '分部', prop: 'subsectionName' },
    { label: '资金周转次数', prop: 'turnoverCount' },
    { label: '销售金额', prop: 'saleAmount', formatters: 'money', width: 150 },
    { label: '资金占用总计', prop: 'totalOccupy', formatters: 'money', width: 150 },
    { label: '资金敞口占用', prop: 'openOccupy', formatters: 'money', width: 150 },
    { label: '资金借款占用', prop: 'flowLoanOccupy', formatters: 'money', width: 150 },
    { label: '资金分授信占用', prop: 'subCreditOccupy', formatters: 'money', width: 150 },
    { label: '好享家注资占用', prop: 'hosjoyCapitalOccupy', formatters: 'money', width: 150 },
    { label: '实控人注资占用', prop: 'controllerCapitalOccupy', formatters: 'money', width: 150 },
    { label: '备注', prop: 'remark', width: 150 }
]

export const ONLINESTATUS = [
    { key: '', value: '全部' },
    { key: 1, value: '淘汰' },
    { key: 2, value: '未淘汰' }
]

export const HOSJOYINJECTION = [
    { key: '', value: '全部' },
    { key: 1, value: '已注资' },
    { key: 2, value: '未注资' }
]

export const FINANCIALSUPPORT = [
    { key: '', value: '全部' },
    { key: 1, value: '有支持' },
    { key: 2, value: '无支持' }
]
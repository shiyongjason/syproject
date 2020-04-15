// 申报列表
export const bankLabel = [
    { label: '平台公司名称', prop: 'status' },
    { label: '申报月份', prop: 'status' },
    { label: '申报状态', prop: 'status' }
]

// 已申报资金计划
export const hasDeclareLabel = [
    { label: '申报月份', prop: 'status' },
    { label: '平台公司名称', prop: 'status' },
    { label: '创建时间', prop: 'status' },
    { label: '资金支持类型', prop: 'status' }
]
// 资金计划汇总表
export const summarySheet = [
    {
        prop: 'subsectionName',
        label: '分部',
        width: '100',
        fixed: true
    },
    {
        label: '销售',
        children: [
            {
                prop: 'salesIncomeIncludingTax',
                label: '2020年责任状目标',
                width: '150',
                displayAs: 'money'
            },
            {
                prop: 'salesIncomeIncludingTax',
                label: '2020年4月责任状目标',
                width: '150',
                displayAs: 'money'
            },
            {
                prop: 'salesIncomeIncludingTax',
                label: '2020年4月实际销售',
                width: '150',
                displayAs: 'money'
            },
            {
                prop: 'salesIncomeIncludingTax',
                label: '2020年4月预计销售',
                width: '150',
                displayAs: 'money'
            }
        ]
    },
    {
        label: '资金用款',
        children: [
            {
                prop: 'salesIncomeIncludingTax',
                label: '在款余额',
                width: '150',
                displayAs: 'money'
            },
            {
                prop: 'salesIncomeIncludingTax',
                label: '逾期额',
                width: '150',
                displayAs: 'money'
            },
            {
                prop: 'salesIncomeIncludingTax',
                label: '2020年4月预计还款',
                width: '150',
                displayAs: 'money'
            },
            {
                prop: 'salesIncomeIncludingTax',
                label: '2020年4月实际用款',
                width: '150',
                displayAs: 'money'
            },
            {
                prop: 'salesIncomeIncludingTax',
                label: '2020年4月预计用款',
                width: '150',
                displayAs: 'money'
            }
        ]
    },
    {
        label: '分析',
        children: [
            {
                prop: 'salesIncomeIncludingTax',
                label: '2020年4月销售同比',
                width: '150',
                displayAs: 'money'
            },
            {
                prop: 'salesIncomeIncludingTax',
                label: '2020年4月用款同比',
                width: '150',
                displayAs: 'money'
            },
            {
                prop: 'salesIncomeIncludingTax',
                label: '逾期率=（逾期额/在款余额）',
                width: '150',
                displayAs: 'money'
            }
        ]
    }
]

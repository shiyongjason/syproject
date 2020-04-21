// 申报列表
export const bankLabel = [
    { label: '平台公司名称', prop: 'companyName' },
    { label: '申报月份', prop: 'applyMonth' },
    { label: '申报状态', prop: 'applyType' }
]

// 已申报资金计划
export const hasDeclareLabel = [
    { label: '申报月份', prop: 'applyMonth' },
    { label: '平台公司名称', prop: 'companyName' },
    { label: '创建时间', prop: 'createTime', formatters: 'dateTime' },
    { label: '资金支持类型', prop: 'fundTypeName' }
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
                prop: 'annualCommitment',
                label: '2020年责任状目标',
                width: '150',
                displayAs: 'money'
            },
            {
                prop: 'currentMonthCommitment',
                label: '2020年4月责任状目标',
                width: '150',
                displayAs: 'money'
            },
            {
                prop: 'lastYearMonthUsed',
                label: '2020年4月实际销售',
                width: '150',
                displayAs: 'money'
            },
            {
                prop: 'currentMonthPresale',
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
                prop: 'totalBalanceOnway',
                label: '在款余额',
                width: '150',
                displayAs: 'money'
            },
            {
                prop: 'totalOverdue',
                label: '逾期额',
                width: '150',
                displayAs: 'money'
            },
            {
                prop: 'preRepaymentCurrentMonth',
                label: '2020年4月预计还款',
                width: '150',
                displayAs: 'money'
            },
            {
                prop: 'lastYearMonthUsed',
                label: '去年实际用款',
                width: '150',
                displayAs: 'money'
            },
            {
                prop: 'preBorrowCurrentMonth',
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
                prop: 'salePercentCurrent',
                label: '2020年4月销售同比',
                width: '150'
            },
            {
                prop: 'usedPercentCurrent',
                label: '2020年4月用款同比',
                width: '150'
            },
            {
                prop: 'overduePercent',
                label: '逾期率=（逾期额/在款余额）',
                width: '150'
            }
        ]
    }
]

export const approveRole = [
    {
        key: 'SUBREGION_APPLY', // 区域
        index: 0
    },
    {
        key: 'JDgroup-SegmentFinance', // 分财
        index: 1
    },
    {
        key: 'jindiaofz', // 分总
        index: 2
    },
    {
        key: 'jindiaodqz', // 区域
        index: 3
    }
]

export const approvalListLabel = [
    { label: '流程编号', prop: 'planNo' },
    { label: '申报月份', prop: 'applyMonth' },
    { label: '平台公司名称', prop: 'companyName' },
    { label: '创建时间', prop: 'createTime', formatters: 'dateTime' },
    { label: '资金支持类型', prop: 'fundTypeName' }
]
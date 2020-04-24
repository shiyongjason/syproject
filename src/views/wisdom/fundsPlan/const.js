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
export const summarySheet = function (targetYear, targetMonth) {
    return [
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
                    label: `${targetYear}年责任状目标`,
                    width: '150',
                    displayAs: 'money'
                },
                {
                    prop: 'currentMonthCommitment',
                    label: `${targetYear}年${targetMonth}月责任状目标`,
                    width: '150',
                    displayAs: 'money'
                },
                {
                    prop: 'lastYearMonthUsed',
                    label: `${targetYear}年${targetMonth}月实际销售`,
                    width: '150',
                    displayAs: 'money'
                },
                {
                    prop: 'currentMonthPresale',
                    label: `${targetYear}年${targetMonth}月预计销售`,
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
                    label: `${targetYear}年${targetMonth}月预计还款`,
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
                    label: `${targetYear}年${targetMonth}月预计用款`,
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
                    label: `${targetYear}年${targetMonth}月销售同比`,
                    width: '150'
                },
                {
                    prop: 'usedPercentCurrent',
                    label: `${targetYear}年${targetMonth}月用款同比`,
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
}

export const approveRole = [
    {
        key: 'SUBREGION_APPLY', // 区域
        index: 0,
        currentNode: '区域申报 已办',
        nextNode: '分部财务审批 待办',
        ref: 'branchFinancial'
    },
    {
        key: 'JDgroup-SegmentFinance', // 分财
        index: 1,
        currentNode: '分部财务审批 已办',
        nextNode: '分部总经理审批 待办',
        ref: 'branchManager'
    },
    {
        key: 'jindiaofz', // 分总
        index: 2,
        currentNode: '分部总经理审批 已办',
        nextNode: '大区总经理审批 待办',
        ref: 'regionalManager'
    },
    {
        key: 'jindiaodqz', // 大区
        index: 3,
        currentNode: '分部总经理审批 已办',
        nextNode: '审批通过',
        ref: '-'
    }
]

export const approvalListLabel = [
    { label: '流程编号', prop: 'planId' },
    { label: '申报月份', prop: 'applyMonth' },
    { label: '平台公司名称', prop: 'companyName' },
    { label: '创建时间', prop: 'createTime', formatters: 'dateTime' },
    { label: '资金支持类型', prop: 'fundTypeName' }
]

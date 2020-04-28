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
            prop: 'organizationName',
            slot: 'organizationName',
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
                    displayAs: 'fundMoney',
                    align: 'right'
                },
                {
                    prop: 'currentMonthCommitment',
                    label: `${targetYear}年${targetMonth}月责任状目标`,
                    width: '150',
                    displayAs: 'fundMoney',
                    align: 'right'
                },
                {
                    prop: 'lastYearActualSales',
                    label: `${targetYear - 1}年${targetMonth}月实际销售`,
                    width: '150',
                    displayAs: 'fundMoney',
                    align: 'right'
                },
                {
                    prop: 'estimateSales',
                    label: `${targetYear}年${targetMonth}月预计销售1111`,
                    width: '150',
                    displayAs: 'fundMoney',
                    align: 'right'
                }
            ]
        },
        {
            label: '资金用款',
            children: [
                {
                    prop: 'loanBalance',
                    label: '在贷余额',
                    width: '150',
                    displayAs: 'fundMoney',
                    align: 'right'
                },
                {
                    prop: 'totalOverdue',
                    label: '逾期额',
                    width: '150',
                    displayAs: 'fundMoney',
                    align: 'right'
                },
                {
                    prop: 'estimateRepayment',
                    label: `${targetYear}年${targetMonth}月预计还款`,
                    width: '150',
                    displayAs: 'fundMoney',
                    align: 'right'
                },
                {
                    prop: 'lastYearActualUse',
                    label: '去年实际用款',
                    width: '150',
                    displayAs: 'fundMoney',
                    align: 'right'
                },
                {
                    prop: 'preBorrowCurrentMonth',
                    label: `${targetYear}年${targetMonth}月预计用款`,
                    width: '150',
                    displayAs: 'fundMoney',
                    align: 'right'
                }
            ]
        },
        {
            label: '分析',
            children: [
                {
                    prop: 'salePercentCurrent',
                    label: `${targetYear}年${targetMonth}月销售同比`,
                    align: 'right',
                    className: 'wisdom-total-background',
                    width: '150'
                },
                {
                    prop: 'usedPercentCurrent',
                    label: `${targetYear}年${targetMonth}月用款同比`,
                    align: 'right',
                    className: 'wisdom-total-background',
                    width: '150'
                },
                {
                    prop: 'overduePercent',
                    label: '逾期率=（逾期额/在款余额）',
                    align: 'right',
                    className: 'wisdom-total-background',
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

export const approvalListHasDoneLabel = [
    { label: '流程编号', prop: 'planId' },
    { label: '申报月份', prop: 'applyMonth' },
    { label: '平台公司名称', prop: 'companyName' },
    { label: '创建时间', prop: 'createTime', formatters: 'dateTime' },
    { label: '审批节点', prop: 'approveRoleName' },
    { label: '资金支持类型', prop: 'fundTypeName' }
]

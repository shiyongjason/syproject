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
export const summarySheet = function (targetYear, targetMonth, isF) {
    return [
        {
            prop: 'organizationName',
            label: isF ? '分部' : '平台公司',
            width: '100',
            showOverflowTooltip: true,
            slot: 'organizationName',
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
                    label: `${targetYear}年${targetMonth}月预计销售`,
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
                    label: `${targetYear - 1}年${targetMonth}月实际用款`,
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
                    label: '逾期率=（逾期额/在贷余额）',
                    align: 'right',
                    className: 'wisdom-total-background',
                    width: '200'
                }
            ]
        }
    ]
}
// 平台公司计划分析
export const platformPlan = function (targetYear, targetMonth) {
    return [
        {
            prop: 'misCode',
            label: '公司编码',
            width: '100',
            fixed: true
        },
        {
            prop: 'organizationName',
            slot: 'organizationName',
            showOverflowTooltip: true,
            label: '平台公司',
            width: '100',
            fixed: true
        },
        {
            prop: 'subRegionName',
            showOverflowTooltip: true,
            label: '区域',
            width: '100',
            fixed: true
        },
        {
            prop: 'subsectionName',
            showOverflowTooltip: true,
            label: '分部',
            width: '100',
            fixed: true
        },
        {
            prop: 'regionName',
            label: '大区',
            showOverflowTooltip: true,
            width: '100',
            fixed: true,
            children: [
                {
                    prop: 'regionName',
                    label: `-`,
                    width: '100',
                    children: [
                        {
                            prop: 'regionName',
                            width: '100',
                            label: `合计`
                        }
                    ]
                }
            ]
        },
        {
            label: '销售',
            children: [
                {
                    prop: 'annualCommitment',
                    label: `${targetYear}年责任状目标`,
                    displayAs: 'fundMoney',
                    align: 'right',
                    children: [
                        {
                            prop: 'annualCommitment',
                            width: '150',
                            label: `-`
                        }
                    ]
                },
                {
                    prop: 'currentMonthCommitment',
                    label: `${targetYear}年${targetMonth}月责任状目标`,
                    displayAs: 'fundMoney',
                    align: 'right',
                    children: [
                        {
                            prop: 'currentMonthCommitment',
                            width: '150',
                            label: `-`
                        }
                    ]
                },
                {
                    prop: 'lastYearActualSales',
                    label: `${targetYear - 1}年${targetMonth}月实际销售`,
                    width: '150',
                    displayAs: 'fundMoney',
                    align: 'right',
                    children: [
                        {
                            prop: 'lastYearActualSales',
                            width: '150',
                            label: `-`
                        }
                    ]
                },
                {
                    prop: 'estimateSales',
                    label: `${targetYear}年${targetMonth}月预计销售`,
                    width: '150',
                    displayAs: 'fundMoney',
                    align: 'right',
                    children: [
                        {
                            prop: 'estimateSales',
                            width: '150',
                            label: `-`
                        }
                    ]
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
                    align: 'right',
                    children: [
                        {
                            prop: 'loanBalance',
                            width: '150',
                            label: `-`
                        }
                    ]
                },
                {
                    prop: 'totalOverdue',
                    label: '逾期额',
                    width: '150',
                    displayAs: 'fundMoney',
                    align: 'right',
                    children: [
                        {
                            prop: 'totalOverdue',
                            width: '150',
                            label: `-`
                        }
                    ]
                },
                {
                    prop: 'estimateRepayment',
                    label: `${targetYear}年${targetMonth}月预计还款`,
                    displayAs: 'fundMoney',
                    align: 'right',
                    children: [
                        {
                            prop: 'estimateRepayment',
                            width: '150',
                            label: `-`
                        }
                    ]
                },
                {
                    prop: 'lastYearActualUse',
                    label: `${targetYear - 1}年${targetMonth}月实际用款`,
                    displayAs: 'fundMoney',
                    align: 'right',
                    children: [
                        {
                            prop: 'lastYearActualUse',
                            width: '150',
                            label: `-`
                        }
                    ]
                },
                {
                    prop: 'preBorrowCurrentMonth',
                    label: `${targetYear}年${targetMonth}月预计用款`,
                    displayAs: 'fundMoney',
                    align: 'right',
                    children: [
                        {
                            prop: 'preBorrowCurrentMonth',
                            width: '150',
                            label: `-`
                        }
                    ]
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
                    children: [
                        {
                            prop: 'salePercentCurrent',
                            width: '150',
                            label: `-`
                        }
                    ]
                },
                {
                    prop: 'usedPercentCurrent',
                    label: `${targetYear}年${targetMonth}月用款同比`,
                    align: 'right',
                    children: [
                        {
                            prop: 'usedPercentCurrent',
                            width: '150',
                            label: `-`
                        }
                    ]
                },
                {
                    prop: 'overduePercent',
                    label: '逾期率=（逾期额/在贷余额）',
                    align: 'right',
                    children: [
                        {
                            prop: 'overduePercent',
                            width: '220',
                            label: `-`
                        }
                    ]
                }
            ]
        }
    ]
}
// 资金计划审批额度
export const planApproval = function (targetYear) {
    return [
        {
            prop: 'misCode',
            label: '公司编码',
            width: '100',
            fixed: true,
            children: [
                {
                    prop: 'misCode',
                    label: `-`
                }
            ]
        },
        {
            prop: 'companyName',
            label: '平台公司名称',
            width: '100',
            fixed: true,
            children: [
                {
                    prop: 'companyName',
                    label: `-`
                }
            ]
        },
        {
            prop: 'subsectionName',
            label: '分部',
            width: '100',
            fixed: true,
            children: [
                {
                    prop: 'subsectionName',
                    label: `-`
                }
            ]
        },
        {
            prop: 'regionName',
            label: '大区',
            width: '100',
            fixed: true,
            children: [
                {
                    prop: 'regionName',
                    label: `合计`
                }
            ]
        },
        {
            prop: 'januaryValue',
            label: '1月',
            width: '100',
            children: [
                {
                    prop: 'januaryValue',
                    label: `-`
                }
            ]
        },
        {
            prop: 'februaryValue',
            label: '2月',
            children: [
                {
                    prop: 'februaryValue',
                    label: `-`
                }
            ]
        },
        {
            prop: 'marchValue',
            label: '3月',
            width: '100',
            children: [
                {
                    prop: 'marchValue',
                    label: `-`
                }
            ]
        },
        {
            prop: 'aprilValue',
            label: '4月',
            width: '100',
            children: [
                {
                    prop: 'aprilValue',
                    label: `-`
                }
            ]
        },
        {
            prop: 'mayValue',
            label: '5月',
            width: '100',
            children: [
                {
                    prop: 'mayValue',
                    label: `-`
                }
            ]
        },
        {
            prop: 'juneValue',
            label: '6月',
            width: '100',
            children: [
                {
                    prop: 'juneValue',
                    label: `-`
                }
            ]
        },
        {
            prop: 'julyValue',
            label: '7月',
            width: '100',
            children: [
                {
                    prop: 'julyValue',
                    label: `-`
                }
            ]
        },
        {
            prop: 'augustValue',
            label: '8月',
            width: '100',
            children: [
                {
                    prop: 'augustValue',
                    label: `-`
                }
            ]
        },
        {
            prop: 'septemberValue',
            label: '9月',
            width: '100',
            children: [
                {
                    prop: 'septemberValue',
                    label: `-`
                }
            ]
        },
        {
            prop: 'octoberValue',
            label: '10月',
            width: '100',
            children: [
                {
                    prop: 'octoberValue',
                    label: `-`
                }
            ]
        },
        {
            prop: 'novemberValue',
            label: '11月',
            width: '100',
            children: [
                {
                    prop: 'novemberValue',
                    label: `-`
                }
            ]
        },
        {
            prop: 'decemberValue',
            label: '12月',
            width: '100',
            children: [
                {
                    prop: 'decemberValue',
                    label: `-`
                }
            ]
        },
        {
            prop: 'totalAnnual',
            label: '合计',
            width: '100',
            children: [
                {
                    prop: 'totalAnnual',
                    label: `-`
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
export const planCreditLabel = [
    {
        label: '公司编码',
        prop: 'misCode',
        children: [
            {
                label: '-',
                prop: 'misCode'
            }
        ]
    },
    {
        label: '公司名称',
        prop: 'companyName',
        children: [
            {
                label: '-',
                prop: 'companyName'
            }
        ]
    },
    {
        label: '分部',
        prop: 'subsectionName',
        children: [
            {
                label: '-',
                prop: 'subsectionName'
            }
        ]
    },
    {
        label: '大区',
        prop: 'regionName',
        children: [
            {
                label: '合计',
                prop: 'regionName'
            }
        ]
    },
    {
        label: '本年累计销售达成额',
        prop: 'annualTotalSale',
        children: [
            {
                label: '-',
                prop: 'annualTotalSale'
            }
        ]
    },
    {
        label: '本年累计销售达成率',
        prop: 'annualTotalProfitAchieveRate',
        children: [
            {
                label: '-',
                prop: 'annualTotalProfitAchieveRate'
            }
        ]
    },
    {
        label: '本年累计利润达成额',
        prop: 'annualTotalProfit',
        children: [
            {
                label: '-',
                prop: 'annualTotalProfit'
            }
        ]
    },
    {
        label: '本年累计利润达成率',
        prop: 'annualTotalSaleAchieveRate',
        children: [
            {
                label: '-',
                prop: 'annualTotalSaleAchieveRate'
            }
        ]
    },
    {
        label: '本年累计放款额',
        prop: 'annualTotalLoan',
        children: [
            {
                label: '-',
                prop: 'annualTotalLoan'
            }
        ]
    },
    {
        label: '累计资金支持效率比',
        prop: 'annualTotalEffectiveRate',
        children: [
            {
                label: '-',
                prop: 'annualTotalEffectiveRate'
            }
        ]
    },
    {
        label: '当月申报用款额',
        prop: 'currentApplyFund',
        children: [
            {
                label: '-',
                prop: 'currentApplyFund'
            }
        ]
    },
    {
        label: '当月审批用款额',
        prop: 'currentApproveFund',
        children: [
            {
                label: '-',
                prop: 'currentApproveFund'
            }
        ]
    },
    {
        label: '本月实际放款额',
        prop: 'currentActualLoan',
        children: [
            {
                label: '-',
                prop: 'currentActualLoan'
            }
        ]
    },
    {
        label: '本月剩余应还本金',
        prop: 'currentRemainingRepayment',
        children: [
            {
                label: '-',
                prop: 'currentRemainingRepayment'
            }
        ]
    },
    {
        label: '在贷余额',
        prop: 'totalUnpaidAmount',
        children: [
            {
                label: '-',
                prop: 'totalUnpaidAmount'
            }
        ]
    },
    {
        label: '剩余逾期',
        prop: 'totalRemainingOverdue',
        children: [
            {
                label: '-',
                prop: 'totalRemainingOverdue'
            }
        ]
    },
    {
        label: '存量逾期',
        prop: 'totalRemainingOverdueExist',
        children: [
            {
                label: '-',
                prop: 'totalRemainingOverdueExist'
            }
        ]
    },
    {
        label: '增量逾期',
        prop: 'totalRemainingOverdueIncrement',
        children: [
            {
                label: '-',
                prop: 'totalRemainingOverdueIncrement'
            }
        ]
    },
    {
        label: '本月逾期发生额',
        prop: 'currentOverdueAmount',
        children: [
            {
                label: '-',
                prop: 'currentOverdueAmount'
            }
        ]
    }
]
export const approvalListHasDoneLabel = [
    { label: '流程编号', prop: 'planId' },
    { label: '申报月份', prop: 'applyMonth' },
    { label: '平台公司名称', prop: 'companyName' },
    { label: '创建时间', prop: 'createTime', formatters: 'dateTime' },
    { label: '审批节点', prop: 'approveRoleName' },
    { label: '资金支持类型', prop: 'fundTypeName' }
]

export const repaidToDetailTable = [
    { label: '台账编号', prop: 'standingBookNo' },
    { label: '还款时间', width: '100', prop: 'endTime' },
    { label: '待还款金额（万元）', width: '150', prop: 'currentBalance', displayAs: 'fundMoney' },
    { label: '资金类型', prop: 'accountTypeName' },
    { label: '借款期限', prop: 'loanDate' }
]

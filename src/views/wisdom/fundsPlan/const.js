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
export const summarySheet = function (targetYear, targetMonth, isF, isHideCompanyCounts) {
    return [
        {
            prop: 'organizationName',
            label: isF ? '分部' : '平台公司',
            minWidth: '100',
            showOverflowTooltip: true,
            slot: 'organizationName',
            fixed: true
        },
        {
            label: '申报公司数',
            selfSettingHidden: isHideCompanyCounts,
            children: [
                {
                    prop: 'companyCounts',
                    label: '总平台数',
                    minWidth: '150',
                    align: 'center'
                },
                {
                    prop: 'declareCounts',
                    label: '已申报家数',
                    minWidth: '150',
                    align: 'center'
                }
            ]
        },
        {
            label: '销售',
            children: [
                {
                    prop: 'annualCommitment',
                    label: `${targetYear}年责任状目标`,
                    minWidth: '150',
                    displayAs: 'fundMoney',
                    align: 'right'
                },
                {
                    prop: 'currentMonthCommitment',
                    label: `${targetYear}年${targetMonth}月责任状目标`,
                    minWidth: '150',
                    displayAs: 'fundMoney',
                    align: 'right'
                },
                {
                    prop: 'lastYearActualSales',
                    label: `${targetYear - 1}年${targetMonth}月实际销售`,
                    minWidth: '150',
                    displayAs: 'fundMoney',
                    align: 'right'
                },
                {
                    prop: 'estimateSales',
                    label: `${targetYear}年${targetMonth}月预计销售`,
                    minWidth: '150',
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
                    minWidth: '150',
                    displayAs: 'fundMoney',
                    align: 'right'
                },
                {
                    prop: 'totalOverdue',
                    label: '逾期余额',
                    minWidth: '150',
                    displayAs: 'fundMoney',
                    align: 'right'
                },
                {
                    prop: 'estimateRepayment',
                    label: `${targetYear}年${targetMonth}月预计还款`,
                    minWidth: '150',
                    displayAs: 'fundMoney',
                    align: 'right'
                },
                {
                    prop: 'lastYearActualUse',
                    label: `${targetYear - 1}年${targetMonth}月实际用款`,
                    minWidth: '150',
                    displayAs: 'fundMoney',
                    align: 'right'
                },
                {
                    prop: 'preBorrowCurrentMonth',
                    label: `${targetYear}年${targetMonth}月预计用款`,
                    minWidth: '150',
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
                    minWidth: '150'
                },
                {
                    prop: 'usedPercentCurrent',
                    label: `${targetYear}年${targetMonth}月用款同比`,
                    align: 'right',
                    className: 'wisdom-total-background',
                    minWidth: '150'
                },
                {
                    prop: 'overduePercent',
                    label: '逾期率=（逾期余额/在贷余额）',
                    align: 'right',
                    className: 'wisdom-total-background',
                    minWidth: '200'
                }
            ]
        },
        {
            label: '审批金额',
            children: [
                {
                    prop: 'subsectionManagerApproveAmount',
                    label: '分总审批金额',
                    align: 'right',
                    displayAs: 'fundMoney',
                    minWidth: '100'
                },
                {
                    prop: 'regionManagerApproveAmount',
                    label: '大区总审批金额',
                    align: 'right',
                    displayAs: 'fundMoney',
                    minWidth: '120'
                }
            ]
        }
    ]
}
// 平台公司计划分析
export const platformPlan = function (targetYear, targetMonth, fn) {
    return [
        {
            prop: 'misCode',
            label: '公司编码',
            minWidth: '100',
            fixed: true
        },
        {
            prop: 'organizationName',
            slot: 'organizationName',
            showOverflowTooltip: true,
            label: '平台公司',
            minWidth: '150',
            fixed: true
        },
        {
            prop: 'subRegionName',
            showOverflowTooltip: true,
            label: '区域',
            minWidth: '100',
            fixed: true
        },
        {
            prop: 'subsectionName',
            showOverflowTooltip: true,
            label: '分部',
            minWidth: '100',
            fixed: true
        },
        {
            prop: 'regionName',
            label: '',
            showOverflowTooltip: true,
            minWidth: '120',
            fixed: true,
            children: [
                {
                    prop: 'regionName',
                    label: `大区`,
                    minWidth: '120',
                    children: [
                        {
                            prop: 'regionName',
                            minWidth: '120',
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
                    align: 'center',
                    isHidden: true,
                    children: [
                        {
                            prop: 'annualCommitment',
                            minWidth: '150',
                            displayAs: 'fundMoney',
                            label: `-`
                        }
                    ]
                },
                {
                    prop: 'currentMonthCommitment',
                    label: `${targetYear}年${targetMonth}月责任状目标`,
                    displayAs: 'fundMoney',
                    align: 'center',
                    children: [
                        {
                            prop: 'currentMonthCommitment',
                            displayAs: 'fundMoney',
                            minWidth: '150',
                            label: `-`
                        }
                    ]
                },
                {
                    prop: 'lastYearActualSales',
                    label: `${targetYear - 1}年${targetMonth}月实际销售`,
                    width: '150',
                    displayAs: 'fundMoney',
                    align: 'center',
                    children: [
                        {
                            prop: 'lastYearActualSales',
                            displayAs: 'fundMoney',
                            minWidth: '150',
                            label: `-`
                        }
                    ]
                },
                {
                    prop: 'estimateSales',
                    label: `${targetYear}年${targetMonth}月预计销售`,
                    width: '150',
                    displayAs: 'fundMoney',
                    align: 'center',
                    children: [
                        {
                            prop: 'estimateSales',
                            displayAs: 'fundMoney',
                            minWidth: '150',
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
                    minWidth: '150',
                    displayAs: 'fundMoney',
                    align: 'center',
                    children: [
                        {
                            prop: 'loanBalance',
                            displayAs: 'fundMoney',
                            minWidth: '150',
                            align: 'center',
                            label: `-`
                        }
                    ]
                },
                {
                    prop: 'totalOverdue',
                    label: '逾期余额',
                    minWidth: '150',
                    displayAs: 'fundMoney',
                    align: 'center',
                    children: [
                        {
                            prop: 'totalOverdue',
                            displayAs: 'fundMoney',
                            align: 'center',
                            minWidth: '150',
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
                            displayAs: 'fundMoney',
                            minWidth: '150',
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
                            displayAs: 'fundMoney',
                            minWidth: '150',
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
                            displayAs: 'fundMoney',
                            minWidth: '150',
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
                            minWidth: '150',
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
                            minWidth: '150',
                            label: `-`
                        }
                    ]
                },
                {
                    prop: 'overduePercent',
                    label: '逾期率=（逾期余额/在贷余额）',
                    align: 'right',
                    children: [
                        {
                            prop: 'overduePercent',
                            minWidth: '220',
                            label: `-`
                        }
                    ]
                }
            ]
        },
        {
            label: '区域申报内容',
            children: [
                {
                    label: '资金支持类型',
                    prop: 'subRegionFundType',
                    width: '100',
                    children: [
                        {
                            prop: 'subRegionFundType',
                            align: 'center',
                            minWidth: '100',
                            label: `-`
                        }
                    ]
                },
                {
                    label: '区域人员意见',
                    prop: 'subRegionRemark',
                    width: 150,
                    children: [
                        {
                            prop: 'subRegionRemark',
                            align: 'center',
                            minWidth: '150',
                            render: (h, scope) => {
                                return h('div', {
                                    domProps: {
                                        innerHTML: `
                                              <a>${scope.row.subRegionRemark ? scope.row.subRegionRemark : '-'}</a>
                                              `
                                    },
                                    style: {
                                        color: '#FF7A45',
                                        cursor: 'pointer',
                                        width: '100%',
                                        overflow: 'hidden',
                                        display: '-webkit-box',
                                        WebkitBoxOrient: 'vertical',
                                        webkitLineClamp: 2
                                    },
                                    on: {
                                        'click': function () {
                                            fn(scope.row.subRegionRemark, '区域人员意见')
                                        }
                                    }
                                })
                            }
                        }
                    ]
                }
            ]
        },
        {
            label: '分财核定结果',
            children: [
                {
                    label: '健康度指标',
                    prop: 'subsectionFinanceHealthPercentage',
                    minWidth: '100',
                    children: [
                        {
                            prop: 'subsectionFinanceHealthPercentage',
                            align: 'center',
                            minWidth: '100'
                        }
                    ]
                },
                {
                    label: '分财意见',
                    prop: 'subsectionFinanceRemark',
                    minWidth: 150,
                    children: [
                        {
                            prop: 'subsectionFinanceRemark',
                            displayAs: 'fundMoney',
                            align: 'center',
                            width: '150',
                            render: (h, scope) => {
                                return h('div', {
                                    domProps: {
                                        innerHTML: `
                                              <a>${scope.row.subsectionFinanceRemark ? scope.row.subsectionFinanceRemark : '-'}</a>
                                              `
                                    },
                                    style: {
                                        color: '#FF7A45',
                                        cursor: 'pointer',
                                        width: '100%',
                                        overflow: 'hidden',
                                        display: '-webkit-box',
                                        WebkitBoxOrient: 'vertical',
                                        webkitLineClamp: 2
                                    },
                                    on: {
                                        'click': function () {
                                            fn(scope.row.subsectionFinanceRemark, '分财意见')
                                        }
                                    }
                                })
                            }
                        }
                    ]
                }
            ]
        },
        {
            label: '分总审批结果',
            children: [
                {
                    label: '分总审批金额',
                    prop: 'subsectionManagerApproveAmount',
                    minWidth: '100',
                    children: [
                        {
                            prop: 'subsectionManagerApproveAmount',
                            align: 'center',
                            displayAs: 'fundMoney',
                            width: '120',
                            label: `-`
                        }
                    ]
                },
                {
                    label: '分总意见',
                    prop: 'subsectionManagerRemark',
                    minWidth: 150,
                    children: [
                        {
                            prop: 'subsectionManagerRemark',
                            align: 'center',
                            minWidth: '150',
                            render: (h, scope) => {
                                return h('div', {
                                    domProps: {
                                        innerHTML: `
                                              <a>${scope.row.subsectionManagerRemark ? scope.row.subsectionManagerRemark : '-'}</a>
                                              `
                                    },
                                    style: {
                                        color: '#FF7A45',
                                        cursor: 'pointer',
                                        width: '100%',
                                        overflow: 'hidden',
                                        display: '-webkit-box',
                                        WebkitBoxOrient: 'vertical',
                                        webkitLineClamp: 2
                                    },
                                    on: {
                                        'click': function () {
                                            fn(scope.row.subsectionManagerRemark, '分总意见')
                                        }
                                    }
                                })
                            }
                        }
                    ]
                }
            ]
        },
        {
            label: '大区总审批结果',
            children: [
                {
                    label: '大区总审批金额',
                    prop: 'regionManagerApproveAmount',
                    minWidth: '120',
                    children: [
                        {
                            prop: 'regionManagerApproveAmount',
                            align: 'center',
                            minWidth: '120',
                            displayAs: 'fundMoney'
                        }
                    ]
                },
                {
                    label: '大区总意见',
                    prop: 'regionManagerRemark',
                    minWidth: 150,
                    children: [
                        {
                            prop: 'regionManagerRemark',
                            align: 'center',
                            minWidth: '150',
                            render: (h, scope) => {
                                return h('div', {
                                    domProps: {
                                        innerHTML: `
                                              <a>${scope.row.regionManagerRemark ? scope.row.regionManagerRemark : '-'}</a>
                                              `
                                    },
                                    style: {
                                        color: '#FF7A45',
                                        cursor: 'pointer',
                                        width: '100%',
                                        overflow: 'hidden',
                                        display: '-webkit-box',
                                        WebkitBoxOrient: 'vertical',
                                        webkitLineClamp: 2
                                    },
                                    on: {
                                        'click': function () {
                                            fn(scope.row.regionManagerRemark, '大区总意见')
                                        }
                                    }
                                })
                            }
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
            fixed: true
        },
        {
            prop: 'companyName',
            label: '平台公司名称',
            width: '100',
            fixed: true
        },
        {
            prop: 'subsectionName',
            label: '分部',
            width: '100',
            fixed: true
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
export const planCreditLabel = function (tabCheck, hosAuthCheck) {
    return [
        {
            label: '公司编码',
            prop: 'misCode',
            isHidden: tabCheck,
            width: 100,
            fixed: true
        },
        {
            label: '公司名称',
            prop: 'companyName',
            isHidden: tabCheck,
            width: 120,
            fixed: true
        },
        {
            label: '区域',
            prop: 'subRegionName',
            isHidden: tabCheck,
            width: 150,
            fixed: true
        },
        {
            label: '分部',
            prop: 'subsectionName',
            width: 120,
            fixed: true
        },
        {
            label: '大区',
            prop: 'regionName',
            width: 120,
            fixed: true,
            children: [
                {
                    label: '合计',
                    width: 120,
                    fixed: true,
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
                    width: 150,
                    isUseCommonRenderHeader: true,
                    showOverflowTooltip: true,
                    prop: 'annualTotalSale'
                }
            ]
        },
        {
            label: '本年累计销售达成率',
            prop: 'annualTotalSaleAchieveRate',
            children: [
                {
                    label: '-',
                    width: 150,
                    isUseCommonRenderHeader: true,
                    showOverflowTooltip: true,
                    prop: 'annualTotalSaleAchieveRate'
                }
            ]
        },
        {
            label: '本年累计利润达成额',
            prop: 'annualTotalProfit',
            children: [
                {
                    label: '-',
                    width: 150,
                    isUseCommonRenderHeader: true,
                    showOverflowTooltip: true,
                    prop: 'annualTotalProfit'
                }
            ]
        },
        {
            label: '本年累计利润达成率',
            prop: 'annualTotalProfitAchieveRate',
            children: [
                {
                    label: '-',
                    width: 150,
                    isUseCommonRenderHeader: true,
                    showOverflowTooltip: true,
                    prop: 'annualTotalProfitAchieveRate'
                }
            ]
        },
        {
            label: '本年累计放款额',
            prop: 'annualTotalLoan',
            children: [
                {
                    label: '-',
                    width: 150,
                    isUseCommonRenderHeader: true,
                    showOverflowTooltip: true,
                    prop: 'annualTotalLoan'
                }
            ]
        },
        {
            label: '累计资金支持效率比',
            prop: 'annualTotalEffectiveRate',
            width: 150,
            children: [
                {
                    label: '-',
                    width: 150,
                    isUseCommonRenderHeader: true,
                    showOverflowTooltip: true,
                    prop: 'annualTotalEffectiveRate'
                }
            ]
        },
        {
            label: '当月申报用款额',
            prop: 'currentApplyFund',
            width: 150,
            children: [
                {
                    label: '-',
                    width: 150,
                    isUseCommonRenderHeader: true,
                    showOverflowTooltip: true,
                    prop: 'currentApplyFund'
                }
            ]
        },
        {
            label: '当月审批用款额',
            isHidden: hosAuthCheck,
            prop: 'currentApproveFund',
            children: [
                {
                    label: '-',
                    width: 150,
                    isUseCommonRenderHeader: true,
                    showOverflowTooltip: true,
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
                    width: 120,
                    isUseCommonRenderHeader: true,
                    showOverflowTooltip: true,
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
                    width: 120,
                    isUseCommonRenderHeader: true,
                    showOverflowTooltip: true,
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
                    width: 120,
                    isUseCommonRenderHeader: true,
                    showOverflowTooltip: true,
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
                    width: 120,
                    isUseCommonRenderHeader: true,
                    showOverflowTooltip: true,
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
                    width: 120,
                    isUseCommonRenderHeader: true,
                    showOverflowTooltip: true,
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
                    width: 120,
                    isUseCommonRenderHeader: true,
                    showOverflowTooltip: true,
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
                    width: 120,
                    isUseCommonRenderHeader: true,
                    showOverflowTooltip: true,
                    prop: 'currentOverdueAmount'
                }
            ]
        }
    ]
}
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

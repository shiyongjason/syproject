// 分部逾期汇总表
export const branchSummarySheet = function () {
    return [
        { prop: 'subsectionName', label: '分部', showOverflowTooltip: true, fixed: true },
        { prop: 'regionName', label: '大区', showOverflowTooltip: true, fixed: true },
        { prop: 'stockOverdue', label: '存量逾期', showOverflowTooltip: true },
        {
            label: '存量逾期-2020年度还款计划',
            children: [
                {
                    prop: 'stockJanuaryRepayment',
                    label: '1月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    className: 'repaymentStyle'
                },
                {
                    prop: 'stockFebruaryRepayment',
                    label: '2月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    className: 'repaymentStyle'
                },
                {
                    prop: 'stockMarchRepayment',
                    label: '3月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    className: 'repaymentStyle'
                },
                {
                    prop: 'stockAprilRepayment',
                    label: '4月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    className: 'repaymentStyle'
                },
                {
                    prop: 'stockMayRepayment',
                    label: '5月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    className: 'repaymentStyle'
                },
                {
                    prop: 'stockJuneRepayment',
                    label: '6月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    className: 'repaymentStyle'
                },
                {
                    prop: 'stockJulyRepayment',
                    label: '7月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    className: 'repaymentStyle'
                },
                {
                    prop: 'stockAugustRepayment',
                    label: '8月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    className: 'repaymentStyle'
                },
                {
                    prop: 'stockSeptemberRepayment',
                    label: '9月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    className: 'repaymentStyle'
                },
                {
                    prop: 'stockOctoberRepayment',
                    label: '10月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    className: 'repaymentStyle'
                },
                {
                    prop: 'stockNovemberRepayment',
                    label: '11月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    className: 'repaymentStyle'
                },
                {
                    prop: 'stockDecemberRepayment',
                    label: '12月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    className: 'repaymentStyle'
                },
                {
                    prop: 'stockTotal',
                    label: '合计',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    className: 'repaymentStyle'
                },
                {
                    prop: 'stockPlanProportion',
                    label: '计划率',
                    width: '150',
                    showOverflowTooltip: true
                },
                {
                    prop: 'stockNoRepaymentPlanAmount',
                    label: '无计划金额',
                    width: '150',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                }
            ]
        },
        { prop: 'incrementOverdue', label: '增量逾期', showOverflowTooltip: true },
        {
            label: '增量逾期-2020年度还款计划',
            children: [
                {
                    prop: 'incrementJanuaryRepayment',
                    label: '1月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    className: 'repaymentStyle'
                },
                {
                    prop: 'incrementFebruaryRepayment',
                    label: '2月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    className: 'repaymentStyle'
                },
                {
                    prop: 'incrementMarchRepayment',
                    label: '3月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    className: 'repaymentStyle'
                },
                {
                    prop: 'incrementAprilRepayment',
                    label: '4月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    className: 'repaymentStyle'
                },
                {
                    prop: 'incrementMayRepayment',
                    label: '5月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    className: 'repaymentStyle'
                },
                {
                    prop: 'incrementJuneRepayment',
                    label: '6月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    className: 'repaymentStyle'
                },
                {
                    prop: 'incrementJulyRepayment',
                    label: '7月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    className: 'repaymentStyle'
                },
                {
                    prop: 'incrementAugustRepayment',
                    label: '8月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    className: 'repaymentStyle'
                },
                {
                    prop: 'incrementSeptemberRepayment',
                    label: '9月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    className: 'repaymentStyle'
                },
                {
                    prop: 'incrementOctoberRepayment',
                    label: '10月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    className: 'repaymentStyle'
                },
                {
                    prop: 'incrementNovemberRepayment',
                    label: '11月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    className: 'repaymentStyle'
                },
                {
                    prop: 'incrementDecemberRepayment',
                    label: '12月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    className: 'repaymentStyle'
                },
                {
                    prop: 'incrementTotal',
                    label: '合计',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    className: 'repaymentStyle'
                },
                {
                    prop: 'incrementProportion',
                    label: '计划率',
                    width: '150',
                    showOverflowTooltip: true
                },
                {
                    prop: 'incrementNoRepaymentPlanAmount',
                    label: '无计划金额',
                    width: '150',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                }
            ]
        }
    ]
}
// 平台公司逾期汇总表
export const platformSummarySheet = [
    {
        prop: 'misCode',
        label: '公司编码',
        showOverflowTooltip: true,
        fixed: true,
        children: [
            {
                prop: 'misCode',
                label: '合计'
            }
        ]
    },
    {
        prop: 'loanCompanyName',
        label: '公司名称',
        showOverflowTooltip: true,
        fixed: true,
        children: [
            {
                prop: 'loanCompanyName',
                label: '-'
            }
        ]
    },
    {
        prop: 'subsectionName',
        label: '分部',
        showOverflowTooltip: true,
        fixed: true,
        children: [
            {
                prop: 'subsectionName',
                label: '-'
            }
        ]
    },
    {
        prop: 'regionName',
        label: '大区',
        showOverflowTooltip: true,
        fixed: true,
        children: [
            {
                prop: 'regionName',
                label: '-'
            }
        ]
    },
    {
        label: '销售',
        children: [
            {
                prop: 'lastYearSales',
                label: '19年',
                width: '100',
                displayAs: 'fundMoney',
                showOverflowTooltip: true,
                children: [
                    {
                        prop: 'lastYearSales',
                        label: '-'
                    }
                ]
            },
            {
                prop: 'currentSales',
                label: '20年',
                width: '100',
                displayAs: 'fundMoney',
                showOverflowTooltip: true,
                children: [
                    {
                        prop: 'currentSales',
                        label: '-'
                    }
                ]
            }
        ]
    },
    {
        prop: 'arrearsCount',
        label: '欠款笔数',
        showOverflowTooltip: true,
        children: [
            {
                prop: 'arrearsCount',
                label: '-'
            }
        ]
    },
    {
        prop: 'capitalAmount',
        label: '剩余欠款',
        showOverflowTooltip: true,
        children: [
            {
                prop: 'capitalAmount',
                label: '-'
            }
        ]
    },
    {
        label: '2020年度还款计划',
        children: [
            {
                prop: 'januaryRepayment',
                label: '1月',
                width: '100',
                displayAs: 'fundMoney',
                showOverflowTooltip: true,
                className: 'repaymentStyle',
                children: [
                    {
                        prop: 'januaryRepayment',
                        label: '-'
                    }
                ]
            },
            {
                prop: 'februaryRepayment',
                label: '2月',
                width: '100',
                displayAs: 'fundMoney',
                showOverflowTooltip: true,
                className: 'repaymentStyle',
                children: [
                    {
                        prop: 'februaryRepayment',
                        label: '-'
                    }
                ]
            },
            {
                prop: 'marchRepayment',
                label: '3月',
                width: '100',
                displayAs: 'fundMoney',
                showOverflowTooltip: true,
                className: 'repaymentStyle',
                children: [
                    {
                        prop: 'marchRepayment',
                        label: '-'
                    }
                ]
            },
            {
                prop: 'aprilRepayment',
                label: '4月',
                width: '100',
                displayAs: 'fundMoney',
                showOverflowTooltip: true,
                className: 'repaymentStyle',
                children: [
                    {
                        prop: 'aprilRepayment',
                        label: '-'
                    }
                ]
            },
            {
                prop: 'mayRepayment',
                label: '5月',
                width: '100',
                displayAs: 'fundMoney',
                showOverflowTooltip: true,
                className: 'repaymentStyle',
                children: [
                    {
                        prop: 'mayRepayment',
                        label: '-'
                    }
                ]
            },
            {
                prop: 'juneRepayment',
                label: '6月',
                width: '100',
                displayAs: 'fundMoney',
                showOverflowTooltip: true,
                className: 'repaymentStyle',
                children: [
                    {
                        prop: 'juneRepayment',
                        label: '-'
                    }
                ]
            },
            {
                prop: 'julyRepayment',
                label: '7月',
                width: '100',
                displayAs: 'fundMoney',
                showOverflowTooltip: true,
                className: 'repaymentStyle',
                children: [
                    {
                        prop: 'julyRepayment',
                        label: '-'
                    }
                ]
            },
            {
                prop: 'augustRepayment',
                label: '8月',
                width: '100',
                displayAs: 'fundMoney',
                showOverflowTooltip: true,
                className: 'repaymentStyle',
                children: [
                    {
                        prop: 'augustRepayment',
                        label: '-'
                    }
                ]
            },
            {
                prop: 'septemberRepayment',
                label: '9月',
                width: '100',
                displayAs: 'fundMoney',
                showOverflowTooltip: true,
                className: 'repaymentStyle',
                children: [
                    {
                        prop: 'septemberRepayment',
                        label: '-'
                    }
                ]
            },
            {
                prop: 'octoberRepayment',
                label: '10月',
                width: '100',
                displayAs: 'fundMoney',
                showOverflowTooltip: true,
                className: 'repaymentStyle',
                children: [
                    {
                        prop: 'octoberRepayment',
                        label: '-'
                    }
                ]
            },
            {
                prop: 'novemberRepayment',
                label: '11月',
                width: '100',
                displayAs: 'fundMoney',
                showOverflowTooltip: true,
                className: 'repaymentStyle',
                children: [
                    {
                        prop: 'novemberRepayment',
                        label: '-'
                    }
                ]
            },
            {
                prop: 'decemberRepayment',
                label: '12月',
                width: '100',
                displayAs: 'fundMoney',
                showOverflowTooltip: true,
                className: 'repaymentStyle',
                children: [
                    {
                        prop: 'decemberRepayment',
                        label: '-'
                    }
                ]
            },
            {
                prop: 'total',
                label: '合计',
                width: '100',
                displayAs: 'fundMoney',
                showOverflowTooltip: true,
                className: 'repaymentStyle',
                children: [
                    {
                        prop: 'total',
                        label: '-'
                    }
                ]
            }
        ]
    },
    {
        prop: 'planProportion',
        label: '计划还款占比',
        showOverflowTooltip: true,
        children: [
            {
                prop: 'planProportion',
                label: '-'
            }
        ]
    },
    {
        prop: 'noRepaymentPlanAmount',
        label: '无计划金额',
        showOverflowTooltip: true,
        children: [
            {
                prop: 'noRepaymentPlanAmount',
                label: '-'
            }
        ]
    }
]
// 逾期增量明细表
export const overdueDetailTable = [
    {
        prop: 'standingBookNo',
        label: '借款编号',
        fixed: true,
        showOverflowTooltip: true,
        children: [
            {
                prop: 'standingBookNo',
                label: '合计'
            }
        ]
    },
    {
        prop: 'misCode',
        label: '公司编码',
        fixed: true,
        showOverflowTooltip: true,
        children: [
            {
                prop: 'misCode',
                label: '-'
            }
        ]
    },
    {
        prop: 'loanCompanyName',
        label: '公司名称',
        fixed: true,
        showOverflowTooltip: true,

        children: [
            {
                prop: 'loanCompanyName',
                label: '-'
            }
        ]
    },
    {
        prop: 'subsectionName',
        label: '分部',
        fixed: true,
        showOverflowTooltip: true,
        children: [
            {
                prop: 'subsectionName',
                label: '-'
            }
        ]
    },
    {
        prop: 'regionName',
        label: '大区',
        fixed: true,
        showOverflowTooltip: true,
        children: [
            {
                prop: 'regionName',
                label: '-'
            }
        ]
    },
    {
        prop: 'loanAmount',
        label: '借款金额',
        showOverflowTooltip: true,
        children: [
            {
                prop: 'loanAmount',
                label: '合计'
            }
        ]
    },
    {
        prop: 'payTime',
        label: '合同到期日',
        showOverflowTooltip: true,
        children: [
            {
                prop: 'payTime',
                label: '-'
            }
        ]
    },
    {
        prop: 'capitalAmount',
        label: '应还本金',
        showOverflowTooltip: true,
        children: [
            {
                prop: 'capitalAmount',
                label: '合计'
            }
        ]
    },
    {
        prop: 'overdueTime',
        label: '宽限期到期日',
        showOverflowTooltip: true,
        children: [
            {
                prop: 'overdueTime',
                label: '-'
            }
        ]
    },
    {
        prop: 'actualPayTime',
        label: '实际还款日',
        showOverflowTooltip: true,
        children: [
            {
                prop: 'actualPayTime',
                label: '-'
            }
        ]
    },
    {
        prop: 'amountPaid',
        label: '已还本金',
        showOverflowTooltip: true,
        children: [
            {
                prop: 'amountPaid',
                label: '合计'
            }
        ]
    },
    {
        prop: 'overdueTotal',
        label: '当前逾期合计',
        showOverflowTooltip: true,
        children: [
            {
                prop: 'overdueTotal',
                label: '合计'
            }
        ]
    },
    {
        label: '2020年度还款计划',
        children: [
            {
                prop: 'januaryRepayment',
                label: '1月',
                width: '100',
                displayAs: 'fundMoney',
                showOverflowTooltip: true,
                className: 'repaymentStyle',
                children: [
                    {
                        prop: 'januaryRepayment',
                        label: '-'
                    }
                ]
            },
            {
                prop: 'februaryRepayment',
                label: '2月',
                width: '100',
                displayAs: 'fundMoney',
                showOverflowTooltip: true,
                className: 'repaymentStyle',
                children: [
                    {
                        prop: 'februaryRepayment',
                        label: '-'
                    }
                ]
            },
            {
                prop: 'marchRepayment',
                label: '3月',
                width: '100',
                displayAs: 'fundMoney',
                showOverflowTooltip: true,
                className: 'repaymentStyle',
                children: [
                    {
                        prop: 'marchRepayment',
                        label: '-'
                    }
                ]
            },
            {
                prop: 'aprilRepayment',
                label: '4月',
                width: '100',
                displayAs: 'fundMoney',
                showOverflowTooltip: true,
                className: 'repaymentStyle',
                children: [
                    {
                        prop: 'aprilRepayment',
                        label: '-'
                    }
                ]
            },
            {
                prop: 'mayRepayment',
                label: '5月',
                width: '100',
                displayAs: 'fundMoney',
                showOverflowTooltip: true,
                className: 'repaymentStyle',
                children: [
                    {
                        prop: 'mayRepayment',
                        label: '-'
                    }
                ]
            },
            {
                prop: 'juneRepayment',
                label: '6月',
                width: '100',
                displayAs: 'fundMoney',
                showOverflowTooltip: true,
                className: 'repaymentStyle',
                children: [
                    {
                        prop: 'juneRepayment',
                        label: '-'
                    }
                ]
            },
            {
                prop: 'julyRepayment',
                label: '7月',
                width: '100',
                displayAs: 'fundMoney',
                showOverflowTooltip: true,
                className: 'repaymentStyle',
                children: [
                    {
                        prop: 'julyRepayment',
                        label: '-'
                    }
                ]
            },
            {
                prop: 'augustRepayment',
                label: '8月',
                width: '100',
                displayAs: 'fundMoney',
                showOverflowTooltip: true,
                className: 'repaymentStyle',
                children: [
                    {
                        prop: 'augustRepayment',
                        label: '-'
                    }
                ]
            },
            {
                prop: 'septemberRepayment',
                label: '9月',
                width: '100',
                displayAs: 'fundMoney',
                showOverflowTooltip: true,
                className: 'repaymentStyle',
                children: [
                    {
                        prop: 'septemberRepayment',
                        label: '-'
                    }
                ]
            },
            {
                prop: 'octoberRepayment',
                label: '10月',
                width: '100',
                displayAs: 'fundMoney',
                showOverflowTooltip: true,
                className: 'repaymentStyle',
                children: [
                    {
                        prop: 'octoberRepayment',
                        label: '-'
                    }
                ]
            },
            {
                prop: 'novemberRepayment',
                label: '11月',
                width: '100',
                displayAs: 'fundMoney',
                showOverflowTooltip: true,
                className: 'repaymentStyle',
                children: [
                    {
                        prop: 'novemberRepayment',
                        label: '-'
                    }
                ]
            },
            {
                prop: 'decemberRepayment',
                label: '12月',
                width: '100',
                displayAs: 'fundMoney',
                showOverflowTooltip: true,
                className: 'repaymentStyle',
                children: [
                    {
                        prop: 'decemberRepayment',
                        label: '-'
                    }
                ]
            },
            {
                prop: 'total',
                label: '合计',
                width: '100',
                displayAs: 'fundMoney',
                showOverflowTooltip: true,
                className: 'repaymentStyle',
                children: [
                    {
                        prop: 'total',
                        label: '合计'
                    }
                ]
            }
        ]
    },
    {
        prop: 'planProportion',
        label: '计划占比',
        showOverflowTooltip: true,
        children: [
            {
                prop: 'planProportion',
                label: '合计'
            }
        ]
    },
    {
        prop: 'noRepaymentPlanAmount',
        label: '无还款计划金额',
        displayAs: 'fundMoney',
        showOverflowTooltip: true,
        children: [
            {
                prop: 'noRepaymentPlanAmount',
                label: '合计'
            }
        ]
    }
]
// 还款计划
export const annualRepaymentPlan = {
    januaryRepayment: '0',
    februaryRepayment: '0',
    marchRepayment: '0',
    aprilRepayment: '0',
    mayRepayment: '0',
    juneRepayment: '0',
    julyRepayment: '0',
    augustRepayment: '0',
    septemberRepayment: '0',
    octoberRepayment: '0',
    novemberRepayment: '0',
    decemberRepayment: '0',
    total: '0'
}
// 如果为空后台返回为null，需要多一层判断（后台规范！！！！）
export const platformSummarySheetTotal = {
    annualRepaymentPlan: null,
    arrearsCount: null,
    capitalAmount: null,
    currentSales: null,
    lastYearSales: null,
    loanCompanyName: null,
    misCode: null,
    noRepaymentPlanAmount: null,
    planProportion: null,
    regionName: null,
    subsectionName: null
}

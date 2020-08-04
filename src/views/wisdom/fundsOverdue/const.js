// 分部逾期汇总表
export const branchSummarySheet = function () {
    return [
        { prop: 'subsectionName', label: '分部', showOverflowTooltip: true, fixed: true },
        { prop: 'regionName', label: '大区', showOverflowTooltip: true, fixed: true },
        { prop: 'stockOverdue', label: '存量逾期', showOverflowTooltip: true, displayAs: 'fundMoney' },
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
                showOverflowTooltip: true,
                children: [
                    {
                        prop: 'lastYearSales',
                        displayAs: 'fundMoney',
                        label: '-'
                    }
                ]
            },
            {
                prop: 'currentSales',
                label: '20年',
                width: '100',

                showOverflowTooltip: true,
                children: [
                    {
                        displayAs: 'fundMoney',
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
                displayAs: 'fundMoney',
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
                        displayAs: 'fundMoney',
                        prop: 'januaryRepayment',
                        label: '-'
                    }
                ]
            },
            {
                prop: 'februaryRepayment',
                label: '2月',
                width: '100',

                showOverflowTooltip: true,
                className: 'repaymentStyle',
                children: [
                    {
                        displayAs: 'fundMoney',
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
                        displayAs: 'fundMoney',
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
                        displayAs: 'fundMoney',
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
                        displayAs: 'fundMoney',
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
                        displayAs: 'fundMoney',
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
                        displayAs: 'fundMoney',
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
                        displayAs: 'fundMoney',
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
                        displayAs: 'fundMoney',
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
                        displayAs: 'fundMoney',
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
                        displayAs: 'fundMoney',
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
                        displayAs: 'fundMoney',
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
                        displayAs: 'fundMoney',
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
                displayAs: 'fundMoney',
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
// 回款跟踪
export const backMoneyTrack = [
    {
        prop: 'misCode',
        label: '公司编码',
        showOverflowTooltip: true,
        minWidth: 100,
        fixed: true,
        children: [
            {
                prop: 'misCode',
                minWidth: 100,
                label: '-'
            }
        ]
    },
    {
        prop: 'companyName',
        label: '平台公司',
        showOverflowTooltip: true,
        fixed: true,
        minWidth: 100,
        children: [
            {
                prop: 'companyName',
                minWidth: 100,
                label: '-'
            }
        ]
    },
    {
        prop: 'subsectionName',
        label: '分部',
        showOverflowTooltip: true,
        minWidth: 100,
        fixed: true,
        children: [
            {
                prop: 'subsectionName',
                minWidth: 100,
                label: '-'
            }
        ]
    },
    {
        prop: 'regionName',
        label: '大区',
        showOverflowTooltip: true,
        minWidth: 100,
        fixed: true,
        children: [
            {
                prop: 'regionName',
                minWidth: 100,
                label: '合计'
            }
        ]
    },
    {
        prop: 'normalRepaymentAmount',
        minWidth: 120,
        label: '正常应还金额',
        children: [
            {
                prop: 'normalRepaymentAmount',
                displayAs: 'fundMoneyHaveSpot',
                minWidth: 120,
                label: '-'
            }
        ]
    },
    {
        prop: 'overduePlanRepaymentAmount',
        minWidth: 150,
        label: '逾期计划应还款金额',
        children: [
            {
                prop: 'overduePlanRepaymentAmount',
                displayAs: 'fundMoneyHaveSpot',
                minWidth: 150,
                label: '-'
            }
        ]
    },
    {
        prop: 'repaymentAmountTotal',
        minWidth: 120,
        label: '应还金额合计',
        children: [
            {
                prop: 'repaymentAmountTotal',
                displayAs: 'fundMoneyHaveSpot',
                minWidth: 120,
                label: '-'
            }
        ]
    },
    {
        prop: 'takeBackNormalAmount',
        minWidth: 120,
        label: '收回正常金额',
        children: [
            {
                prop: 'takeBackNormalAmount',
                displayAs: 'fundMoneyHaveSpot',
                minWidth: 120,
                label: '-'
            }
        ]
    },
    {
        prop: 'takeBackPlanInsideOverdueAmount',
        minWidth: 150,
        label: '收回计划内逾期金额',
        children: [
            {
                prop: 'takeBackPlanInsideOverdueAmount',
                displayAs: 'fundMoneyHaveSpot',
                minWidth: 150,
                label: '-'
            }
        ]
    },
    {
        prop: 'receivedAmountTotal',
        minWidth: 120,
        label: '应收已收金额合计',
        children: [
            {
                prop: 'receivedAmountTotal',
                displayAs: 'fundMoneyHaveSpot',
                minWidth: 120,
                label: '-'
            }
        ]
    },
    {
        prop: 'uncollectedAmountTotal',
        minWidth: 120,
        label: '应收未收金额合计',
        children: [
            {
                prop: 'uncollectedAmountTotal',
                displayAs: 'fundMoneyHaveSpot',
                minWidth: 120,
                label: '-'
            }
        ]
    },
    {
        prop: 'takeBackPlanOuterOverdueAmount',
        minWidth: 150,
        label: '收回计划外逾期金额',
        children: [
            {
                prop: 'takeBackPlanOuterOverdueAmount',
                displayAs: 'fundMoneyHaveSpot',
                minWidth: 150,
                label: '-'
            }
        ]
    },
    {
        prop: 'prepaymentAmount',
        minWidth: 120,
        label: '提前还款金额',
        children: [
            {
                prop: 'prepaymentAmount',
                displayAs: 'fundMoneyHaveSpot',
                minWidth: 120,
                label: '-'
            }
        ]
    },
    {
        prop: 'currentActualTakeBackTotal',
        minWidth: 120,
        label: '当期实际收回合计',
        children: [
            {
                prop: 'currentActualTakeBackTotal',
                displayAs: 'fundMoneyHaveSpot',
                minWidth: 120,
                label: '-'
            }
        ]
    },
    {
        prop: 'rebateRate',
        minWidth: 120,
        label: '回款率（金额）',
        children: [
            {
                prop: 'rebateRate',
                minWidth: 120,
                label: '-'
            }
        ]
    },
    {
        prop: 'onTimeRate',
        minWidth: 120,
        label: '及时率（笔数）',
        children: [
            {
                prop: 'onTimeRate',
                minWidth: 120,
                label: '-'
            }
        ]
    }
]
// 回款跟踪合计
export const backMoneyTrackTotal = {
    normalRepaymentAmount: null,
    overduePlanRepaymentAmount: null,
    repaymentAmountTotal: null,
    takeBackNormalAmount: null,
    takeBackPlanInsideOverdueAmount: null,
    receivedAmountTotal: null,
    takeBackPlanOuterOverdueAmount: null,
    prepaymentAmount: null,
    currentActualTakeBackTotal: null,
    rebateRate: null,
    onTimeRate: null
}

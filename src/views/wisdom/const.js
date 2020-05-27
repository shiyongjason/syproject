export let tableLabel = [
    { prop: 'misCode', label: '公司编码', fixed: true, showOverflowTooltip: true },
    { prop: 'companyName', label: '全部', fixed: true, showOverflowTooltip: true },
    {
        label: 'XXXX年度销售承诺值',
        children: [
            {
                prop: 'januaryValue',
                label: '1月',
                width: '100',
                displayAs: 'fundMoney',
                showOverflowTooltip: true
            },
            {
                prop: 'februaryValue',
                label: '2月',
                width: '100',
                displayAs: 'fundMoney',
                showOverflowTooltip: true
            },
            {
                prop: 'marchValue',
                label: '3月',
                width: '100',
                displayAs: 'fundMoney',
                showOverflowTooltip: true
            },
            {
                prop: 'aprilValue',
                label: '4月',
                width: '100',
                displayAs: 'fundMoney',
                showOverflowTooltip: true
            },
            {
                prop: 'mayValue',
                label: '5月',
                width: '100',
                displayAs: 'fundMoney',
                showOverflowTooltip: true
            },
            {
                prop: 'juneValue',
                label: '6月',
                width: '100',
                displayAs: 'fundMoney',
                showOverflowTooltip: true
            },
            {
                prop: 'julyValue',
                label: '7月',
                width: '100',
                displayAs: 'fundMoney',
                showOverflowTooltip: true
            },
            {
                prop: 'augustValue',
                label: '8月',
                width: '100',
                displayAs: 'fundMoney',
                showOverflowTooltip: true
            },
            {
                prop: 'septemberValue',
                label: '9月',
                width: '100',
                displayAs: 'fundMoney',
                showOverflowTooltip: true
            },
            {
                prop: 'octoberValue',
                label: '10月',
                width: '100',
                displayAs: 'fundMoney',
                showOverflowTooltip: true
            },
            {
                prop: 'novemberValue',
                label: '11月',
                width: '100',
                displayAs: 'fundMoney',
                showOverflowTooltip: true
            },
            {
                prop: 'decemberValue',
                label: '12月',
                width: '100',
                displayAs: 'fundMoney',
                showOverflowTooltip: true
            },
            {
                prop: 'totalAnnual',
                label: '合计',
                width: '150',
                displayAs: 'fundMoney',
                showOverflowTooltip: true
            }
        ]
    }
]

// 履约值
export function preformTableLabel (queryDim) {
    return [
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
            prop: 'companyName',
            label: queryDim,
            fixed: true,
            width: 100,
            showOverflowTooltip: true,
            children: [
                {
                    prop: 'companyName',
                    label: '-',
                    children: [
                        {
                            prop: 'companyName',
                            label: '合计'
                        }
                    ]
                }
            ]
        },
        {
            label: 'XXXX年度履约值利润指标',
            children: [
                {
                    prop: 'januaryValue',
                    label: '1月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'januaryValue',
                            label: '-'
                        }
                    ]
                },
                {
                    prop: 'februaryValue',
                    label: '2月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'februaryValue',
                            label: '-'
                        }
                    ]
                },
                {
                    prop: 'marchValue',
                    label: '3月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'marchValue',
                            label: '-'
                        }
                    ]
                },
                {
                    prop: 'aprilValue',
                    label: '4月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'aprilValue',
                            label: '-'
                        }
                    ]
                },
                {
                    prop: 'mayValue',
                    label: '5月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'mayValue',
                            label: '-'
                        }
                    ]
                },
                {
                    prop: 'juneValue',
                    label: '6月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'juneValue',
                            label: '-'
                        }
                    ]
                },
                {
                    prop: 'julyValue',
                    label: '7月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'julyValue',
                            label: '-'
                        }
                    ]
                },
                {
                    prop: 'augustValue',
                    label: '8月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'augustValue',
                            label: '-'
                        }
                    ]
                },
                {
                    prop: 'septemberValue',
                    label: '9月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'septemberValue',
                            label: '-'
                        }
                    ]
                },
                {
                    prop: 'octoberValue',
                    label: '10月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'octoberValue',
                            label: '-'
                        }
                    ]
                },
                {
                    prop: 'novemberValue',
                    label: '11月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'novemberValue',
                            label: '-'
                        }
                    ]
                },
                {
                    prop: 'decemberValue',
                    label: '12月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'decemberValue',
                            label: '-'
                        }
                    ]
                },
                {
                    prop: 'totalAnnual',
                    label: '合计',
                    width: '150',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'totalAnnual',
                            label: '-'
                        }
                    ]
                }
            ]
        }
    ]
}

// 冲刺值
export function sprintTableLabel (queryDim) {
    return [
        {
            prop: 'misCode',
            label: '分部',
            fixed: true,
            showOverflowTooltip: true,
            children: [
                {
                    prop: 'misCode',
                    label: `-`
                }
            ]
        },
        {
            prop: 'companyName',
            label: queryDim,
            fixed: true,
            showOverflowTooltip: true,
            width: 100,
            children: [
                {
                    prop: 'companyName',
                    label: `全部`
                }
            ]
        },
        {
            label: 'XXXX年度冲刺值利润指标',
            children: [
                {
                    prop: 'januaryValue',
                    label: '1月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'misCode',
                            label: ``
                        }
                    ]
                },
                {
                    prop: 'februaryValue',
                    label: '2月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'misCode',
                            label: ``
                        }
                    ]
                },
                {
                    prop: 'marchValue',
                    label: '3月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'misCode',
                            label: ``
                        }
                    ]
                },
                {
                    prop: 'aprilValue',
                    label: '4月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'misCode',
                            label: ``
                        }
                    ]
                },
                {
                    prop: 'mayValue',
                    label: '5月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'misCode',
                            label: ``
                        }
                    ]
                },
                {
                    prop: 'juneValue',
                    label: '6月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'misCode',
                            label: ``
                        }
                    ]
                },
                {
                    prop: 'julyValue',
                    label: '7月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'misCode',
                            label: ``
                        }
                    ]
                },
                {
                    prop: 'augustValue',
                    label: '8月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'misCode',
                            label: ``
                        }
                    ]
                },
                {
                    prop: 'septemberValue',
                    label: '9月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'misCode',
                            label: ``
                        }
                    ]
                },
                {
                    prop: 'octoberValue',
                    label: '10月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'misCode',
                            label: ``
                        }
                    ]
                },
                {
                    prop: 'novemberValue',
                    label: '11月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'misCode',
                            label: ``
                        }
                    ]
                },
                {
                    prop: 'decemberValue',
                    label: '12月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'misCode',
                            label: ``
                        }
                    ]
                },
                {
                    prop: 'totalAnnual',
                    label: '合计',
                    width: '150',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'misCode',
                            label: ``
                        }
                    ]
                }
            ]
        }
    ]
}

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
export function preformTableLabel (targetYear) {
    return [
        {
            prop: 'misCode',
            label: '',
            fixed: true,
            width: '120px',
            children: [
                {
                    prop: 'misCode',
                    width: '120px',
                    label: '公司编码',
                    children: [
                        {
                            prop: 'misCode',
                            width: '120px',
                            label: '-'
                        }
                    ]
                }
            ]
        },
        {
            prop: 'companyName',
            label: '',
            fixed: true,
            width: '120px',
            children: [
                {
                    prop: 'companyName',
                    width: '120px',
                    label: '全部',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'companyName',
                            width: '120px',
                            label: '合计'
                        }
                    ]
                }
            ]
        },
        {
            label: targetYear + '年度履约值利润指标',
            children: [
                {
                    prop: 'januaryValue',
                    label: '1月',
                    width: '120px',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'januaryValue',
                            width: '120px',
                            label: '-'
                        }
                    ]
                },
                {
                    prop: 'februaryValue',
                    label: '2月',
                    width: '120px',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'februaryValue',
                            width: '120px',
                            label: '-'
                        }
                    ]
                },
                {
                    prop: 'marchValue',
                    label: '3月',
                    width: '120px',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'marchValue',
                            width: '120px',
                            label: '-'
                        }
                    ]
                },
                {
                    prop: 'aprilValue',
                    label: '4月',
                    width: '120px',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'aprilValue',
                            width: '120px',
                            label: '-'
                        }
                    ]
                },
                {
                    prop: 'mayValue',
                    label: '5月',
                    width: '120px',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'mayValue',
                            width: '120px',
                            label: '-'
                        }
                    ]
                },
                {
                    prop: 'juneValue',
                    label: '6月',
                    width: '120px',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'juneValue',
                            width: '120px',
                            label: '-'
                        }
                    ]
                },
                {
                    prop: 'julyValue',
                    label: '7月',
                    width: '120px',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'julyValue',
                            width: '120px',
                            label: '-'
                        }
                    ]
                },
                {
                    prop: 'augustValue',
                    label: '8月',
                    width: '120px',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'augustValue',
                            width: '120px',
                            label: '-'
                        }
                    ]
                },
                {
                    prop: 'septemberValue',
                    label: '9月',
                    width: '120px',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'septemberValue',
                            width: '120px',
                            label: '-'
                        }
                    ]
                },
                {
                    prop: 'octoberValue',
                    label: '10月',
                    width: '120px',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'octoberValue',
                            width: '120px',
                            label: '-'
                        }
                    ]
                },
                {
                    prop: 'novemberValue',
                    label: '11月',
                    width: '120px',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'novemberValue',
                            width: '120px',
                            label: '-'
                        }
                    ]
                },
                {
                    prop: 'decemberValue',
                    label: '12月',
                    width: '120px',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'decemberValue',
                            width: '120px',
                            label: '-'
                        }
                    ]
                },
                {
                    prop: 'totalAnnual',
                    label: '合计',
                    width: '120px',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'totalAnnual',
                            width: '120px',
                            label: '-'
                        }
                    ]
                }
            ]
        }
    ]
}

// 冲刺值
export function sprintTableLabel (targetYear) {
    return [
        {
            prop: 'subsectionName',
            label: '',
            fixed: true,
            width: '120px',
            showOverflowTooltip: true,
            children: [
                {
                    prop: 'subsectionName',
                    width: '120px',
                    label: `分部`,
                    children: [
                        {
                            prop: 'subsectionName',
                            width: '120px',
                            label: `-`
                        }
                    ]
                }
            ]
        },
        {
            prop: 'regionName',
            label: '',
            fixed: true,
            width: '120px',
            showOverflowTooltip: true,
            children: [
                {
                    prop: 'regionName',
                    width: '120px',
                    label: `大区`,
                    children: [
                        {
                            prop: 'regionName',
                            width: '120px',
                            label: `合计`
                        }
                    ]
                }
            ]
        },
        {
            label: targetYear + '年度冲刺值利润指标',
            width: '1440',
            children: [
                {
                    prop: 'januaryValue',
                    label: '1月',
                    width: '120px',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'januaryValue',
                            width: '120px',
                            label: `-`
                        }
                    ]
                },
                {
                    prop: 'februaryValue',
                    label: '2月',
                    width: '120px',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'februaryValue',
                            width: '120px',
                            label: `-`
                        }
                    ]
                },
                {
                    prop: 'marchValue',
                    label: '3月',
                    width: '120px',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'marchValue',
                            width: '120px',
                            label: `-`
                        }
                    ]
                },
                {
                    prop: 'aprilValue',
                    label: '4月',
                    width: '120px',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'aprilValue',
                            width: '120px',
                            label: `-`
                        }
                    ]
                },
                {
                    prop: 'mayValue',
                    label: '5月',
                    width: '120px',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'mayValue',
                            width: '120px',
                            label: `-`
                        }
                    ]
                },
                {
                    prop: 'juneValue',
                    label: '6月',
                    width: '120px',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'juneValue',
                            width: '120px',
                            label: `-`
                        }
                    ]
                },
                {
                    prop: 'julyValue',
                    label: '7月',
                    width: '120px',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'julyValue',
                            width: '120px',
                            label: `-`
                        }
                    ]
                },
                {
                    prop: 'augustValue',
                    label: '8月',
                    width: '120px',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'augustValue',
                            width: '120px',
                            label: `-`
                        }
                    ]
                },
                {
                    prop: 'septemberValue',
                    label: '9月',
                    width: '120px',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'septemberValue',
                            width: '120px',
                            label: `-`
                        }
                    ]
                },
                {
                    prop: 'octoberValue',
                    label: '10月',
                    width: '120px',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'octoberValue',
                            width: '120px',
                            label: `-`
                        }
                    ]
                },
                {
                    prop: 'novemberValue',
                    label: '11月',
                    width: '120px',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'novemberValue',
                            width: '120px',
                            label: `-`
                        }
                    ]
                },
                {
                    prop: 'decemberValue',
                    label: '12月',
                    width: '120px',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'decemberValue',
                            width: '120px',
                            label: `-`
                        }
                    ]
                },
                {
                    prop: 'totalAnnual',
                    label: '合计',
                    width: 150,
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'totalAnnual',
                            width: '120px',
                            label: `-`
                        }
                    ]
                }
            ]
        }
    ]
}

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
        { prop: 'misCode', label: '公司编码', fixed: true, showOverflowTooltip: true },
        { prop: 'companyName', label: queryDim, fixed: true, showOverflowTooltip: true },
        {
            label: 'XXXX年度履约值利润指标',
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
}  

// 履约值
export function sprintTableLabel (queryDim) {
    return [
        { prop: 'misCode', label: '分部', fixed: true, showOverflowTooltip: true },
        { prop: 'companyName', label: queryDim, fixed: true, showOverflowTooltip: true },
        {
            label: 'XXXX年度冲刺值利润指标',
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
}  
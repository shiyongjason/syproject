
// 平台公司逾期汇总表
export const platformSummarySheet = function (N) {
    return [
        {
            prop: '',
            fixed: true,
            minWidth: '400',
            children: [
                {

                    label: '公司编码',
                    children: [
                        {
                            prop: 'misCode',
                            minWidth: '100',
                            label: '-'
                        }
                    ]
                },
                {
                    label: '公司名称',
                    children: [
                        {
                            prop: 'companyName',
                            minWidth: '100',
                            label: '-',
                            showOverflowTooltip: true
                        }
                    ]
                },
                {

                    label: '分部',
                    minWidth: '100',
                    children: [
                        {
                            prop: 'subsectionName',
                            minWidth: '100',
                            label: '-',
                            showOverflowTooltip: true
                        }
                    ]
                },
                {
                    label: '大区',
                    minWidth: '100',
                    children: [
                        {
                            prop: 'regionName',
                            minWidth: '100',
                            label: '合计',
                            showOverflowTooltip: true
                        }
                    ]
                }
            ]
        },
        {
            label: `本月累计至${N - 1}日(笔数)`,
            className: 'colorInfo',
            children: [
                {
                    prop: 'yesterdayReceivableNumber',
                    label: '应收笔数',
                    width: '100',
                    className: 'lightBlueStyle',
                    children: [
                        {
                            prop: 'yesterdayReceivableNumber',
                            minWidth: '100',
                            label: '-',
                            showOverflowTooltip: true
                        }
                    ]

                },
                {
                    prop: 'yesterdayTimelyRepaymentNumber',
                    label: '及时回款笔数',
                    className: 'lightBlueStyle',
                    width: '110',
                    children: [
                        {
                            prop: 'yesterdayTimelyRepaymentNumber',
                            minWidth: '110',
                            label: '-',
                            showOverflowTooltip: true
                        }
                    ]
                },
                {
                    prop: 'yesterdayTimelyRepaymentRateNumber',
                    label: '回款及时率',
                    className: 'lightBlueStyle',
                    width: '130',
                    children: [
                        {
                            prop: 'yesterdayTimelyRepaymentRateNumber',
                            minWidth: '130',
                            label: '-',
                            showOverflowTooltip: true,
                            unit: '%'
                        }
                    ]
                }
            ]
        },
        {
            label: `本月累计至${N}日(笔数)`,
            className: 'colorInfo',
            children: [
                {
                    prop: 'receivableNumber',
                    label: '应收笔数',
                    minWidth: '100',
                    className: 'lightBlueStyle',
                    children: [
                        {
                            prop: 'receivableNumber',
                            minWidth: '100',
                            label: '-',
                            showOverflowTooltip: true
                        }
                    ]
                },
                {
                    prop: 'timelyRepaymentNumber',
                    label: '及时回款笔数',
                    minWidth: '110',
                    className: 'lightBlueStyle',
                    children: [
                        {
                            prop: 'timelyRepaymentNumber',
                            minWidth: '110',
                            label: '-',
                            showOverflowTooltip: true
                        }
                    ]
                },
                {
                    prop: 'timelyRepaymentRateNumber',
                    label: '回款及时率',
                    minWidth: '130',
                    className: 'lightBlueStyle',
                    children: [
                        {
                            prop: 'timelyRepaymentRateNumber',
                            minWidth: '130',
                            label: '-',
                            showOverflowTooltip: true,
                            unit: '%'
                        }
                    ]
                },
                {
                    prop: 'increaseAndDecreaseNumber',
                    label: '环比增减',
                    className: 'repaymentStyle',
                    minWidth: '130',
                    displayAs: 'money',
                    children: [
                        {
                            prop: 'increaseAndDecreaseNumber',
                            minWidth: '130',
                            label: '-',
                            showOverflowTooltip: true,
                            unit: '%'

                        }
                    ]
                }
            ]
        },
        {
            label: `本月累计至${N - 1}日(金额)`,
            className: 'colorBlue',
            children: [
                {
                    prop: 'yesterdayReceivableAmount',
                    label: '应收金额',
                    width: '100',
                    className: 'lightBlueStyle',
                    children: [
                        {
                            prop: 'yesterdayReceivableAmount',
                            minWidth: '100',
                            label: '-',
                            displayAs: 'money',
                            showOverflowTooltip: true
                        }
                    ]

                },
                {
                    prop: 'yesterdayTimelyRepaymentAmount',
                    label: '及时回款金额',
                    className: 'lightBlueStyle',
                    width: '120',
                    children: [
                        {
                            prop: 'yesterdayTimelyRepaymentAmount',
                            minWidth: '120',
                            displayAs: 'money',
                            label: '-',
                            showOverflowTooltip: true
                        }
                    ]
                },
                {
                    prop: 'yesterdayTimelyRepaymentRateAmount',
                    label: '回款及时率',
                    className: 'lightBlueStyle',
                    minWidth: '140',
                    children: [
                        {
                            prop: 'yesterdayTimelyRepaymentRateAmount',
                            minWidth: '140',
                            label: '-',
                            showOverflowTooltip: true,
                            unit: '%'
                        }
                    ]
                }
            ]
        },
        {
            label: `本月累计至${N}日(金额)`,
            className: 'colorBlue',
            children: [
                {
                    prop: 'receivableAmount',
                    label: '应收金额',
                    minWidth: '100',
                    className: 'lightBlueStyle',
                    children: [
                        {
                            prop: 'receivableAmount',
                            displayAs: 'money',
                            minWidth: '200',
                            label: '-',
                            showOverflowTooltip: true
                        }
                    ]
                },
                {
                    prop: 'timelyRepaymentAmount',
                    label: '及时回款金额',
                    className: 'lightBlueStyle',
                    minWidth: '120',
                    children: [
                        {
                            prop: 'timelyRepaymentAmount',
                            displayAs: 'money',
                            minWidth: '120',
                            label: '-',
                            showOverflowTooltip: true
                        }
                    ]
                },
                {
                    prop: 'timelyRepaymentRateAmount',
                    label: '回款及时率',
                    className: 'lightBlueStyle',
                    minWidth: '130',
                    children: [
                        {
                            prop: 'timelyRepaymentRateAmount',
                            minWidth: '130',
                            label: '-',
                            showOverflowTooltip: true,
                            unit: '%'
                        }
                    ]
                },
                {
                    prop: 'increaseAndDecreaseAmount',
                    label: '环比增减',
                    className: 'repaymentStyle',
                    minWidth: '140',
                    children: [
                        {
                            prop: 'increaseAndDecreaseAmount',
                            minWidth: '130',
                            label: '-',
                            showOverflowTooltip: true,
                            unit: '%'
                        }
                    ]
                }
            ]
        }
    ]
}

export const overDueTotal = {
    companyName: null,
    increaseAndDecreaseAmount: null,
    increaseAndDecreaseNumber: null,
    misCode: null,
    receivableAmount: null,
    receivableNumber: null,
    regionCode: null,
    regionName: null,
    subsectionCode: null,
    subsectionName: null,
    timelyRepaymentAmount: null,
    timelyRepaymentNumber: null,
    timelyRepaymentRateAmount: null,
    timelyRepaymentRateNumber: null,
    yesterdayReceivableAmount: null,
    yesterdayReceivableNumber: null,
    yesterdayTimelyRepaymentAmount: null,
    yesterdayTimelyRepaymentNumber: null,
    yesterdayTimelyRepaymentRateAmount: null,
    yesterdayTimelyRepaymentRateNumber: null
}

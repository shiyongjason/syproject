
// 平台公司逾期汇总表
export const platformSummarySheet = [
    {
        label: '-',
        fixed: true,
        children: [
            {

                minWidth: '100',
                label: '公司编码',
                fixed: true,
                children: [
                    {
                        prop: 'companyName',
                        minWidth: '100',
                        label: '合计'
                    }
                ]
            },
            {
                prop: 'companyName',
                label: '公司名称',
                minWidth: '100',
                fixed: true,
                children: [
                    {
                        minWidth: '100',
                        label: '-',
                        showOverflowTooltip: true
                    }
                ]
            },
            {

                label: '分部',
                minWidth: '100',
                fixed: true,
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
                        label: '-',
                        showOverflowTooltip: true
                    }
                ]
            }
        ]
    },
    {
        label: '本月累计至N-1日(笔数)',
        className: 'colorInfo',
        children: [
            {
                prop: 'yesterdayReceivableNumber',
                label: '应收笔数',
                width: '100',
                displayAs: 'fundMoney',
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
                width: '130',
                displayAs: 'fundMoney',
                children: [
                    {
                        prop: 'yesterdayTimelyRepaymentRateNumber',
                        minWidth: '130',
                        label: '-',
                        showOverflowTooltip: true
                    }
                ]
            }
        ]
    },
    {
        label: '本月累计至N日(笔数)',
        className: 'colorInfo',
        children: [
            {
                prop: 'receivableNumber',
                label: '应收笔数',
                minWidth: '100',
                displayAs: 'fundMoney',
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
                displayAs: 'fundMoney',
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
                displayAs: 'timelyRepaymentRateNumber',
                children: [
                    {
                        prop: 'misCode',
                        minWidth: '130',
                        label: '-',
                        showOverflowTooltip: true
                    }
                ]
            },
            {
                prop: 'increaseAndDecreaseNumber',
                label: '环比增减',
                className: 'repaymentStyle',
                minWidth: '130',
                displayAs: 'fundMoney',
                children: [
                    {
                        prop: 'increaseAndDecreaseNumber',
                        minWidth: '130',
                        label: '-',
                        showOverflowTooltip: true
                    }
                ]
            }
        ]
    },
    {
        label: '本月累计至N-1日(金额)',
        className: 'colorBlue',
        children: [
            {
                prop: 'yesterdayReceivableAmount',
                label: '应收金额',
                width: '100',
                displayAs: 'fundMoney',
                children: [
                    {
                        prop: 'yesterdayReceivableAmount',
                        minWidth: '100',
                        label: '-',
                        showOverflowTooltip: true
                    }
                ]

            },
            {
                prop: 'yesterdayTimelyRepaymentAmount',
                label: '及时回款金额',
                width: '120',
                displayAs: 'fundMoney',
                children: [
                    {
                        prop: 'yesterdayTimelyRepaymentAmount',
                        minWidth: '120',
                        label: '-',
                        showOverflowTooltip: true
                    }
                ]
            },
            {
                prop: 'yesterdayTimelyRepaymentRateAmount',
                label: '回款及时率',
                minWidth: '140',
                displayAs: 'fundMoney',
                children: [
                    {
                        prop: 'yesterdayTimelyRepaymentRateAmount',
                        minWidth: '140',
                        label: '-',
                        showOverflowTooltip: true
                    }
                ]
            }
        ]
    },
    {
        label: '本月累计至N日(金额)',
        className: 'colorBlue',
        children: [
            {
                prop: 'receivableAmount',
                label: '应收金额',
                minWidth: '100',
                displayAs: 'fundMoney',
                children: [
                    {
                        prop: 'receivableAmount',
                        minWidth: '100',
                        label: '-',
                        showOverflowTooltip: true
                    }
                ]
            },
            {
                prop: 'timelyRepaymentAmount',
                label: '及时回款金额',
                minWidth: '120',
                displayAs: 'fundMoney',
                children: [
                    {
                        prop: 'timelyRepaymentAmount',
                        minWidth: '120',
                        label: '-',
                        showOverflowTooltip: true
                    }
                ]
            },
            {
                prop: 'timelyRepaymentRateAmount',
                label: '回款及时率',
                minWidth: '130',
                displayAs: 'fundMoney',
                children: [
                    {
                        prop: 'timelyRepaymentRateAmount',
                        minWidth: '130',
                        label: '-',
                        showOverflowTooltip: true
                    }
                ]
            },
            {
                prop: 'increaseAndDecreaseAmount',
                label: '环比增减',
                className: 'repaymentStyle',
                minWidth: '140',
                displayAs: 'fundMoney',
                children: [
                    {
                        prop: 'increaseAndDecreaseAmount',
                        minWidth: '130',
                        label: '-',
                        showOverflowTooltip: true
                    }
                ]
            }
        ]
    }
]

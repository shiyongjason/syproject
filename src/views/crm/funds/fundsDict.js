const FundsDict = Object.freeze({
    paymentFlagArrays: {
        title: '账单支付状态',
        list: [
            {
                key: 0,
                value: '待支付'
            },
            {
                key: 1,
                value: '支付待确认'
            },
            {
                key: 2,
                value: '已支付'
            },
            {
                key: 3,
                value: '支付失败'
            },
            {
                key: 4,
                value: '已取消'
            }
        ]
    },
    repaymentTypeArrays: {
        title: '账单类型',
        list: [
            {
                key: '1',
                value: '首付款'
            },
            {
                key: '3',
                value: '服务费'
            },
            {
                key: '2',
                value: '剩余货款'
            },
            {
                key: '4',
                value: '预付款'
            }
        ]
    },
    bizType: {
        title: '业务类型',
        list: [
            {
                key: 1,
                value: '票据'
            },
            {
                key: 2,
                value: '货物'
            },
            {
                key: 3,
                value: '上游支付凭证'
            }, {
                key: 4,
                value: '还款支付凭证'
            }, {
                key: 5,
                value: '采购单'
            }
        ]
    }
})

export default FundsDict

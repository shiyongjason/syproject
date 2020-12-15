const PaymentOrderDict = Object.freeze({
    status: {
        title: '状态',
        list: [
            {
                key: 0,
                value: '支付单待审核'
            },
            {
                key: 1,
                value: '首付款待支付'
            },
            {
                key: 2,
                value: '首付款待确认'
            },
            {
                key: 8,
                value: '待收货'
            },
            {
                key: 9,
                value: '尾款待支付'
            },
            {
                key: 10,
                value: '尾款待确认'
            },
            {
                key: 11,
                value: '支付单完成'
            },
            {
                key: 12,
                value: '支付单关闭'
            }
        ]
    },
    paymentFlag: {
        title: '支付状态',
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
            }, {
                key: 3,
                value: '支付失败'
            }, {
                key: 4,
                value: '已取消'
            }
        ]
    },
    applyType: {
        title: '',
        list: [
            {
                key: 0,
                value: '待支付'
            },
            {
                key: 1,
                value: '支付待确认'
            }
        ]
    }
})

export default PaymentOrderDict

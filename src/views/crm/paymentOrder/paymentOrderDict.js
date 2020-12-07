const PaymentOrderDict = Object.freeze({
    status: {
        title: '状态',
        list: [
            {
                key: 1,
                value: '待提交'
            },
            {
                key: 2,
                value: '采购单待确认'
            },
            {
                key: 3,
                value: '变更待确认'
            },
            {
                key: 4,
                value: '采购中'
            },
            {
                key: 5,
                value: '采购单完成'
            },
            {
                key: 6,
                value: '采购单关闭'
            }
        ]
    }
})

export default PaymentOrderDict

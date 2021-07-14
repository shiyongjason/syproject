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
                value: '剩余货款待支付'
            },
            {
                key: 10,
                value: '剩余货款待确认'
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
        title: '申请类型',
        list: [
            {
                key: 1,
                value: '一次性采购'
            },
            {
                key: 2,
                value: '分批采购'
            }
        ]
    },
    supplierPaymentMethod: {
        title: '上游货款方式',
        list: [
            {
                key: 1,
                value: '先款后货'
            },
            {
                key: 2,
                value: '先货后款'
            }
        ]
    },
    closeReasonCode: {
        title: '支付单关闭原因对应code',
        list: [
            {
                key: 1,
                value: '支付单审核不通过'
            },
            {
                key: 2,
                value: '用户拒签订单及服务费确认函'
            },
            {
                key: 3,
                value: '用户主动取消'
            }
        ]
    },
    supplierPaymentType: {
        title: '上游支付方式',
        list: [
            {
                key: 1,
                value: '银行转账'
            },
            {
                key: 2,
                value: '银行承兑'
            }
        ]
    },
    accountReceivablePledgeType: {
        title: '应收账款质押',
        list: [
            {
                key: 1,
                value: '已质押'
            }
            // {
            //     key: 2,
            //     value: '放款前质押'
            // },
            // {
            //     key: 3,
            //     value: '其他'
            // }
        ]
    },
    orderLetterStatus: {
        title: '订单及服务费确认函状态',
        list: [
            {
                key: 0,
                value: '未签约'
            },
            {
                key: 1,
                value: '已签约'
            },
            {
                key: 2,
                value: '客户已拒签'
            }
        ]
    },
    approvalStatus: {
        title: '审核结果',
        list: [
            {
                key: 1,
                value: '通过'
            },
            {
                key: 2,
                value: '不通过'
            }
        ]
    }
})

export default PaymentOrderDict

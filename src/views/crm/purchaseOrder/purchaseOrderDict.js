const PurchaseOrderDict = Object.freeze({
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
    },
    coManager: {
        title: '共管户信息',
        list: [
            {
                key: false,
                value: '未确认'
            },
            {
                key: true,
                value: '已确认'
            }
        ]
    },
    freeInterestType: {
        title: '免息方式',
        list: [
            {
                key: 0,
                value: '无'
            },
            {
                key: 1,
                value: '1个月'
            },
            {
                key: 2,
                value: '2个月'
            },
            {
                key: 3,
                value: '3个月'
            },
            {
                key: 4,
                value: '4个月'
            },
            {
                key: 5,
                value: '5个月'
            },
            {
                key: 6,
                value: '6个月'
            }
        ]

    },
    signResult: {
        title: '签约结果',
        list: [
            {
                key: 1,
                value: '确认签约完成'
            },
            {
                key: 2,
                value: '驳回'
            }
        ]
    },
    contractStatus: {
        title: '合同状态',
        list: [
            {
                key: 1,
                value: '草稿'
            },
            {
                key: 2,
                value: '待分财审核'
            }, {
                key: 3,
                value: '分财审核未通过'
            }, {
                key: 4,
                value: '待风控审核'
            }, {
                key: 5,
                value: '风控审核未通过'
            }, {
                key: 6,
                value: '待法务审核'
            }, {
                key: 7,
                value: '法务审核未通过'
            }, {
                key: 8,
                value: '待客户签署'
            }, {
                key: 9,
                value: '客户拒签'
            }, {
                key: 10,
                value: '待平台签署'
            }, {
                key: 11,
                value: '平台签署未通过'
            }, {
                key: 12,
                value: '合同已签署'
            }, {
                key: 13,
                value: '异常关闭'
            }, {
                key: 14,
                value: '超时关闭'
            }, {
                key: 15,
                value: '用印发起失败'
            }, {
                key: 16,
                value: '发起线上待客户签署'
            }
        ]
    },
    contractIsRunning: {
        title: '状态',
        list: [
            {
                key: 0,
                value: '待生效'
            },
            {
                key: 1,
                value: '生效中'
            },
            {
                key: 2,
                value: '已失效'
            }
        ]
    },
    contractType: {
        title: '合同类型', // 10000：其他合同 10001：担保合同 10002：应收账款质押合同 10003：销售合同 10005：采购合同
        list: [
            {
                key: 10000,
                value: '其他合同'
            },
            {
                key: 10001,
                value: '担保合同'
            },
            {
                key: 10002,
                value: '应收账款质押合同'
            },
            {
                key: 10003,
                value: '销售合同'
            },
            {
                key: 10005,
                value: '采购合同'
            }
        ]
    },
    changeResult: {
        title: '变更结果',
        list: [
            {
                key: 1,
                value: '已确认'
            },
            {
                key: 2,
                value: '已驳回'
            },
            {
                key: 0,
                value: '待确认'
            }
        ]
    },
    changeResultDialog: {
        title: '变更结果',
        list: [
            {
                key: 1,
                value: '确认变更'
            },
            {
                key: 2,
                value: '驳回'
            }
        ]
    },
    changedContract: {
        title: '采购单变更合同信息状态',
        list: [
            {
                key: 1,
                value: '新增'
            },
            {
                key: 2,
                value: '变更'
            }
        ]
    },
    fileName: {
        title: '采购单变更弹窗变更字段',
        list: [
            {
                key: 'purch_batch_amount',
                value: '采购单金额'
            },
            {
                key: 'purchase_details',
                value: '采购明细表'
            },
            {
                key: 'purch_order_purch_batch',
                value: '采购批次'
            }, {
                key: 'purch_order_latest_shipment_date',
                value: '最迟发货日期'
            }, {
                key: 'purch_order_shipping_address',
                value: '收货地址'
            }, {
                key: 'advance_payment_proportion',
                value: '经销商预付款比例'
            }, {
                key: 'loan_month',
                value: '剩余货款支付周期'
            }, {
                key: 'hosjoy_account_name',
                value: '收款账户户名'
            }, {
                key: 'hosjoy_account_number',
                value: '收款账户银行账号'
            }, {
                key: 'hosjoy_account_bank',
                value: '收款账户开户行'
            }, {
                key: 'regulatory_account_name',
                value: '监管账户户名'
            }, {
                key: 'regulatory_account_number',
                value: '监管账户银行账号'
            }, {
                key: 'regulatory_account_bank',
                value: '监管账户开户行'
            }
        ]
    }
})

export default PurchaseOrderDict

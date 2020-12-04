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
                key: 0,
                value: '未知'
            },
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
    changeResult: {
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
    }
})

export default PurchaseOrderDict

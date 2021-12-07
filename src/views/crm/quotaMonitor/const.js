export const eventTypeMap = new Map([
    [1, '通用额度设置'],
    [2, '客户临时额度设置'],
    [3, '评审决议通过'],
    [4, '评审决议变更通过'],
    [5, '临时额度自动失效 '],
    [6, '临时额度手动失效'],
    [7, '提交支付单'],
    [8, '尾款支付成功'],
    [9, '支付单取消']
])

export const eventType = [
    { key: 1, value: '通用额度设置' },
    { key: 2, value: '客户临时额度设置' },
    { key: 3, value: '评审决议通过' },
    { key: 4, value: '评审决议变更通过' },
    { key: 5, value: '临时额度自动失效' },
    { key: 6, value: '临时额度手动失效' },
    { key: 7, value: '提交支付单' },
    { key: 8, value: '尾款支付成功' },
    { key: 9, value: '支付单取消' }
]

export const changedType = [
    { key: 1, value: '增加' },
    { key: 2, value: '扣减' },
    { key: 3, value: '冻结' },
    { key: 4, value: '释放' }
]

export const quotaType = [
    { key: 1, value: '通用额度' },
    { key: 2, value: '客户临时额度' },
    { key: 3, value: '项目专项额度' }
]
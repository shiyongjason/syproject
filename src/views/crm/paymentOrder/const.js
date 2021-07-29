export const PAYMENT_ORDER_STATUS_OPTIONS = new Map([
    [14, '待分财审核'],
    [0, '待项目运营审核'],
    [15, '流程审批中'],
    [1, '首付款待支付'],
    [2, '首付款待确认'],
    [8, '待收货'],
    [9, '剩余货款待支付'],
    [10, '剩余货款待确认'],
    [11, '支付单完成'],
    [12, '支付单关闭']
])

export const PAYMENT_ORDER_STATUS_KEY = {
    // 待分财审核
    'FINANCE_AUDIT': 14,
    // 待项目运营审核
    'OPERATE_AUDIT': 0,
    // 首付款待确认
    'DOWN_PAYMENT_CONFIRM': 2,
    // 剩余货款待确认
    'REMAINING_PAYMENT_CONFIRM': 10
}

const PAYMENT_ORDER_STATUS_OPTIONS = new Map([
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

const PAYMENT_ORDER_STATUS_ALL = new Map([
    [0, '待项目运营审核'],
    [1, '首付款待支付'],
    [2, '首付款待确认'],
    [3, '上游支付确认中'],
    [4, '上游支付中'],
    [5, '待出票'],
    [6, '正在出票'],
    [7, '待发货'],
    [8, '待收货'],
    [9, '剩余货款待支付'],
    [10, '剩余货款待确认'],
    [11, '支付单完成'],
    [12, '支付单关闭'],
    [13, '支付单取消'], // 目前需求中支付单取消 = 支付单关闭，这个状态现在无效，但数据库中定义了，所以留着
    [14, '待分财审核'],
    [15, '流程审批中']
])

const PAYMENT_ORDER_STATUS_KEY = {
    // 待分财审核
    'FINANCE_AUDIT': 14,
    // 待项目运营审核
    'OPERATE_AUDIT': 0,
    // 首付款待确认
    'DOWN_PAYMENT_CONFIRM': 2,
    // 剩余货款待确认
    'REMAINING_PAYMENT_CONFIRM': 10
}

// 申请类型
const APPLY_TYPE = new Map([
    [1, '一次性采购'],
    [2, '分批采购']
])

const SUPPLIER_PAYMENT_METHOD = new Map([
    [1, '先款后货'],
    [2, '先货后款']
])

export default {
    PAYMENT_ORDER_STATUS_OPTIONS,
    PAYMENT_ORDER_STATUS_ALL,
    PAYMENT_ORDER_STATUS_KEY,
    APPLY_TYPE,
    SUPPLIER_PAYMENT_METHOD
}
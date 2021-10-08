const PAYMENT_ORDER_STATUS_OPTIONS = new Map([
    [14, '待分财审核'],
    [0, '待项目运营审核'],
    [15, '流程审批中'],
    [1, '首付款待支付'],
    [2, '首付款待确认'],
    [8, '待收货'],
    [9, '剩余货款待支付'],
    // [10, '剩余货款待确认'],
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
    // 流程审批中
    'DING_AUDIT': 15,
    // 首付款待支付
    'DOWN_PAYMENT_WAITING_PAY': 1,
    // 首付款待确认
    'DOWN_PAYMENT_CONFIRM': 2,
    // 待收货
    'WAITING_RECEIVED': 8,
    // 剩余货款待支付
    'REMAINING_PAYMENT_WAITING_PAY': 9,
    // 剩余货款待确认
    // 'REMAINING_PAYMENT_CONFIRM': 10,
    // 支付单完成
    'FINISH': 11,
    // 支付单关闭
    'CLOSED': 12
}

// 采购批次
const APPLY_TYPE = new Map([
    [1, '一次性采购'],
    [2, '分批采购']
])

// 上游货款方式
const SUPPLIER_PAYMENT_METHOD = new Map([
    [1, '先款后货'],
    [2, '先货后款']
])

const SUPPLIER_PAYMENT_TYPE = new Map([
    [1, '银行转账'],
    [2, '银行承兑']
])

const APPROVAL_STATUS = new Map([
    [1, '通过'],
    [2, '不通过']
])
// 审核状态：通过
const APPROVAL_STATUS_KEY_PASS = 1
// 审核状态：不通过
const APPROVAL_STATUS_KEY_NO_PASS = 2

// 下游合作方式
const DEALER_COOPERATION_METHOD = new Map([
    [1, '垫资代采'],
    [2, '代收代付']
])

// 放款交接状态
const DEALER_COOPERATION_STUTAS = new Map([
    [1, '待对接'],
    [2, '已对接']
])

// 上游支付进度
const DEALER_SCHEDULE = new Map([
    [1, '待支付'],
    [2, '已支付'],
    [3, '部分支付']
])
// 应收账款质押
const ACCOUNT_RECEIVABLE_PLEDGE_TYPE = new Map([
    [1, '已质押']
])
// 订单及服务费确认函状态
const ORDER_LETTER_STATUS = new Map([
    [0, '未签约'],
    [1, '已签约'],
    [2, '客户已拒签']
])
// 支付状态
const PAYMENT_FLAG = new Map([
    [0, '待支付'],
    [1, '支付待确认'],
    [2, '已支付'],
    [3, '支付失败'],
    [4, '已取消']
])
// 支付状态KEY值
const PAYMENT_FLAG_KEY = {
    // 待支付
    'WAITING': 0,
    // 支付待确认
    'CONFIRM': 1,
    // 已支付
    'PAID': 2,
    // 支付失败
    'FAIL': 3,
    // 已取消
    'CANCEL': 4
}

export default {
    PAYMENT_ORDER_STATUS_OPTIONS,
    PAYMENT_ORDER_STATUS_ALL,
    PAYMENT_ORDER_STATUS_KEY,
    APPLY_TYPE,
    SUPPLIER_PAYMENT_METHOD,
    SUPPLIER_PAYMENT_TYPE,
    APPROVAL_STATUS,
    APPROVAL_STATUS_KEY_PASS,
    APPROVAL_STATUS_KEY_NO_PASS,
    DEALER_COOPERATION_METHOD,
    ACCOUNT_RECEIVABLE_PLEDGE_TYPE,
    ORDER_LETTER_STATUS,
    PAYMENT_FLAG,
    PAYMENT_FLAG_KEY,
    DEALER_SCHEDULE,
    DEALER_COOPERATION_STUTAS
}

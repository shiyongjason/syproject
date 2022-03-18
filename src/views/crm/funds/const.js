// 还款类型KEY值
const REPAYMENT_TYPE_KEY = {
    // 首付款
    'DOWN_PAYMENT': '1',
    // 尾款
    'BALANCE_PAYMENT': '2',
    // 服务费
    'SERVICE_FEE': '3',
    // 预付款
    'ADVANCE_PAYMENT': '4'
}
const REPAYMENT_TYPE_MAP = new Map([
    [ REPAYMENT_TYPE_KEY.DOWN_PAYMENT, { name: '首付款' } ],
    [ REPAYMENT_TYPE_KEY.BALANCE_PAYMENT, { name: '剩余货款' } ],
    [ REPAYMENT_TYPE_KEY.SERVICE_FEE, { name: '服务费' } ],
    [ REPAYMENT_TYPE_KEY.ADVANCE_PAYMENT, { name: '预付款' } ]
])

const PAYMENT_FLAG_MAP = new Map([
    [0, '待支付'],
    [1, '支付待确认'],
    [2, '已支付'],
    [4, '已取消']
])

export default {
    REPAYMENT_TYPE_KEY,
    REPAYMENT_TYPE_MAP,
    PAYMENT_FLAG_MAP
}
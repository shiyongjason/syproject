
// 订单状态 子订单状态，10:待支付，15：待支付尾款 20:待发货，30:待收货，40:已完成,50：已关闭，60退款中，70已退款, 80=退货中, 100=换货中, 110=已换货
export const ORDER_STATUS_OPTIONS = [
    { label: '全部', value: '' },
    { label: '待发货', value: '20' },
    { label: '待收货', value: '30' },
    { label: '已完成', value: '40' },
    { label: '已关闭', value: '50' },
    { label: '退款中', value: '60' },
    { label: '已退款', value: '70' },
    { label: '退货中', value: '80' },
    { label: '换货中', value: '100' },
    { label: '已换货', value: '110' }
]
export const ORDER_STATUS_MAP = new Map([
    [20, '待发货'],
    [30, '待收货'],
    [40, '已完成'],
    [50, '已关闭'],
    [60, '退款中'],
    [70, '已退款'],
    [80, '退货中'],
    [100, '换货中'],
    [110, '已换货']
])
// 商品状态
export const PRODUCT_STATUS_OPTIONS = [
    { label: '待发货', value: '20' },
    { label: '待收货', value: '30' },
    { label: '已完成', value: '40' },
    { label: '已关闭', value: '50' },
    { label: '退款中', value: '60' },
    { label: '已退款', value: '70' },
    { label: '退货中', value: '80' },
    // { label: '已退货', value: '90' },
    { label: '换货中', value: '100' },
    { label: '已换货', value: '110' }
]
export const PRODUCT_STATUS_MAP = new Map([
    [20, '待发货'],
    [30, '待收货'],
    [40, '已完成'],
    [50, '已关闭'],
    [60, '退款中'],
    [70, '已退款'],
    [80, '退货中'],
    // [90, '已退货'],
    [100, '换货中'],
    [110, '已换货']
])
// 订单渠道
export const ORDER_CHANNERL_OPTIONS = [
    { label: '全部', value: '' },
    { label: 'APP', value: '1' },
    { label: '微信小程序', value: '2' }
]
export const ORDER_CHANNERL_MAP = new Map([
    [1, 'APP'],
    [2, '微信小程序']
])
// 是否自营
export const SELF_SUPPORT_OPTIONS = [
    { label: '全部', value: '' },
    { label: '是', value: '1' },
    { label: '否', value: '0' }
]
export const SELF_SUPPORT_MAP = new Map([
    [true, '是'],
    [false, '否']
])
// 券类型
export const COUPONS_TYPE_OPTIONS = [
    { label: '全部', value: '' },
    { label: '满减', value: '1' },
    { label: '无门槛', value: '2' }
]
export const COUPONS_TYPE_MAP = new Map([
    [1, '满减'],
    [2, '无门槛']
])
// 活动类型
export const ACTIVITY_TYPE_OPTIONS = [
    { label: '全部', value: '' },
    { label: '满减', value: '1' },
    { label: '折扣', value: '2' }
]
export const ACTIVITY_TYPE_MAP = new Map([
    [1, '满减'],
    [2, '折扣']
])

export const CASH_WITHDRAWAL_MAP = new Map([
    [20, '处理中'],
    [30, '成功'],
    [40, '失败']
])
// 资金代采商家明细类型
export const BUSINESS_DETAIL_OPTIONS = [
    { label: '全部', value: '' },
    { label: '销售回款', value: '1' },
    { label: '提现', value: '3' }
]
export const BUSINESS_DETAIL_MAP = new Map([
    [1, '销售回款'],
    [3, '提现']
])
// 资金代采商家明细状态
export const STAUTS_OPTIONS = [
    { label: '全部', value: '' },
    { label: '冻结中', value: '10' },
    { label: '已解冻', value: '20' }
]
export const STAUTS_MAP = new Map([
    [10, '冻结中'],
    [20, '已解冻']
])
// 逾期否
export const OVERDUE_OPTIONS = [
    { label: '全部', value: '' },
    { label: '是', value: true },
    { label: '否', value: false }
]
export const OVERDUE_MAP = new Map([
    [true, '是'],
    [false, '否']
])
// 资金状态
export const CAPITAL_STATUS_OPTIONS = [
    { label: '全部', value: '0' },
    { label: '未回款', value: '10' },
    { label: '部分回款', value: '20' },
    { label: '已回款', value: '30' }
]
export const CAPITAL_STATUS_MAP = new Map([
    [10, '未回款'],
    [20, '部分回款'],
    [30, '已回款']
])
// 资金状态
export const CAPITAL_OPTIONS = [
    { label: '全部', value: '0' },
    { label: '未回款', value: '10' },
    { label: '部分回款', value: '20' },
    { label: '已回款', value: '30' }
]
// 资金状态
export const CAPITALS_OPTIONS = [
    { label: '全部', value: '0' },
    { label: '未回款', value: '10' },
    { label: '部分回款', value: '20' }
]
export const CAPITALS_MAP = new Map([
    [10, '未回款'],
    [20, '部分回款'],
    [30, '已回款']
])
// 商家明细 回款期限
export const DEADLINE_OPTIONS = [
    { label: '最终回款日期', value: '1' },
    { label: '最近回款日期', value: '2' }
]
// 商家详情 审核时间
export const ADUITLINE_OPTIONS = [
    { label: '审核日期', value: '1' },
    { label: '申请日期', value: '2' }
]
// 商家详情 代采提交日期
export const MINADUITLINE_OPTIONS = [
    { label: '代采提交日期', value: '1' },
    { label: '出款确认日期', value: '2' },
    { label: '最终回款日期', value: '3' },
    { label: '最近回款日期', value: '4' }
]
// 商家详情 回款代采提交日期
export const RETAADUITLINE_OPTIONS = [
    { label: '代采提交日期', value: '1' },
    { label: '出款确认日期', value: '2' },
    { label: '回款日期', value: '3' }
]
// 回款类型
export const DEADLINE_TYPE_OPTIONS = [
    { label: '全部', value: '' },
    { label: '销售订单', value: '1' },
    { label: '提前还款', value: '2' }
]
export const DEADLINE_TYPE_MAP = new Map([
    [1, '销售订单'],
    [2, '提前还款']
])
// 资金同步状态
export const STAUTS_TOGER_OPTIONS = [
    { label: '全部', value: '' },
    { label: '未同步', value: '10' },
    { label: '同步中', value: '20' },
    { label: '同步失败', value: '30' },
    { label: '同步成功', value: '40' },
    { label: '不处理', value: '50' }
]
export const STAUTS_TOGER_MAP = new Map([
    [10, '未同步'],
    [20, '同步中'],
    [30, '同步失败'],
    [40, '同步成功'],
    [50, '不处理']
])
// 运费订单状态
export const FREIGHT_STATUS_OPTIONS = [
    { label: '全部', value: '' },
    { label: '待付款', value: '10' },
    { label: '待完成发货', value: '20' },
    { label: '已完成发货', value: '30' },
    { label: '已开票', value: '40' },
    { label: '已退款', value: '50' },
    { label: '已关闭', value: '60' }
]
export const FREIGHT_STATUS_MAP = new Map([
    [10, '待付款'],
    [20, '待完成发货'],
    [30, '已完成发货'],
    [40, '已开票'],
    [50, '已退款'],
    [60, '已关闭']
])
// 运费商品性质
export const MERCHANT_TYPE_OPTIONS = [
    { label: '全部', value: '' },
    { label: '自营', value: '1' },
    { label: 'POP', value: '2' }
]
export const MERCHANT_TYPE_MAP = new Map([
    [1, '自营'],
    [2, 'POP']
])
// 运费价格来源
export const SOURCES_PRICE_OPTIONS = [
    { label: '全部', value: '' },
    { label: '系统计算', value: '1' },
    { label: '人工设置', value: '2' }
]
export const SOURCES_PRICE_MAP = new Map([
    [1, '系统计算'],
    [2, '人工设置']
])
// MIS资金同步状态
export const SYNCHROMIZED_STATE_OPTIONS = [
    { label: '全部', value: '' },
    { label: '未处理', value: '10' },
    { label: '处理中', value: '20' },
    { label: '处理失败', value: '30' },
    { label: '处理成功', value: '40' }
]
export const SYNCHROMIZED_STATE_MAP = new Map([
    [10, '未处理'],
    [20, '处理中'],
    [30, '处理失败'],
    [40, '处理成功']
])
//  运费类型
export const FREIGHT_TYPE_OPTIONS = [
    { label: '全部', value: '' },
    { label: '运费收款', value: '1' },
    { label: '运费退款', value: '-1' }
]
export const FREIGHT_TYPE_MAP = new Map([
    [1, '运费收款'],
    [-1, '运费退款']
])
// 支付方式
export const PAY_WAY_OPTIONS = [
    { label: '全部', value: '' },
    { label: '帐期支付', value: '1' },
    { label: '线下支付', value: '2' },
    { label: '在线支付', value: '4' }
]
export const PAY_WAY_MAP = new Map([
    [1, '帐期支付'],
    [2, '线下支付'],
    [4, '在线支付']
])

// 操作动作
export const OPERATIONAL_OPTIONS = [
    { label: '全部', value: '' },
    { label: '订单创建', value: '1' },
    { label: '订单支付', value: '5' },
    { label: '发货', value: '6' },
    { label: '发货取消', value: '7' },
    { label: '订单关闭', value: '10' },
    { label: '确认收货', value: '12' },
    { label: '申请开票', value: '15' },
    { label: '发票审核', value: '16' },
    { label: '发票开具', value: '17' },
    { label: '发票拒审', value: '18' },
    { label: '退款申请', value: '20' },
    { label: '退款审核', value: '25' },
    { label: '退款撤销', value: '26' },
    { label: '退款', value: '30' },
    { label: '运费商品单分享全部发货', value: '31' },
    { label: '关联商品订单关闭', value: '32' },
    { label: '修改运费', value: '33' },
    { label: '支付运费', value: '34' }
]
export const OPERATIONAL_MAP = new Map([
    [1, '订单创建'],
    [5, '订单支付'],
    [6, '发货'],
    [7, '发货取消'],
    [10, '订单关闭'],
    [12, '确认收货'],
    [15, '申请开票'],
    [16, '发票审核'],
    [17, '发票开具'],
    [18, '发票拒审'],
    [20, '退款申请'],
    [25, '退款审核'],
    [26, '退款撤销'],
    [30, '退款'],
    [31, '运费商品单分享全部发货'],
    [32, '关联商品订单关闭'],
    [33, '修改运费'],
    [34, '支付运费']
])
// 线上运费明细状态
export const ONLINE_FREIGHT_STATUS_OPTIONS = [
    { label: '全部', value: '' },
    { label: '待完成发货', value: '20' },
    { label: '已完成发货', value: '30' },
    { label: '已开票', value: '40' },
    { label: '已退款', value: '50' }
]
export const ONLINE_FREIGHT_STATUS_MAP = new Map([
    [20, '待完成发货'],
    [30, '已完成发货'],
    [40, '已开票'],
    [50, '已退款']
])

// 交易记录 类型
export const DEA_TYPE_MAP = new Map([
    [1, '销售回款'],
    [2, '提前还款'],
    [4, '预付款']
])

// 预付款付款方式
export const PAY_METHOD = [
    {
        label: '网银支付',
        value: 20
    },
    {
        label: '线下转账',
        value: 10
    }
]
// 支付方式
export const PAY_METHOD_OPTIONS = [
    { label: '全部', value: '' },
    { label: '快捷支付（信用卡）', value: 21 },
    { label: '快捷支付（储蓄卡）', value: 22 },
    { label: '微信支付', value: 40 },
    // { label: '微信支付（小程序）', value: 41 },
    { label: '微信支付（小程序）', value: 42 },
    { label: '支付宝支付', value: 50 },
    { label: '账期支付', value: 1 },
    { label: '公司转账', value: 2 },
    { label: '余额支付', value: 10 },
    { label: '活动钱包支付', value: 11 },
    { label: '组合支付', value: 5 }
]

export const PAY_METHOD_MAP = new Map([
    [21, '快捷支付（信用卡）'],
    [22, '快捷支付（储蓄卡）'],
    [40, '微信支付'],
    // [41, '微信支付（小程序）'],
    [42, '微信支付（小程序）'],
    [50, '支付宝支付'],
    [1, '账期支付'],
    [2, '公司转账'],
    [10, '余额支付'],
    [11, '活动钱包支付'],
    [5, '组合支付']
])

export const CHILD_ORDER_TYPE = [
    { label: '全部', value: 0 },
    { label: '常规', value: 1 },
    { label: '售后', value: 2 }
]

/** 支付方式 */
export const PAYMENT_METHOD = new Map([
    ['', '全部'],
    ['21', '快捷支付（信用卡）'],
    ['22', '快捷支付（储蓄卡）'],
    ['40', '微信支付'],
    ['42', '微信支付（小程序）'],
    ['50', '支付宝支付'],
    ['1', '账期支付'],
    ['2', '公司转账'],
    ['10', '余额支付'],
    ['5', '组合支付']
])
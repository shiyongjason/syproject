
// 订单状态
export const ORDER_STATUS_OPTIONS = [
    { label: '全部', value: '' },
    { label: '待发货', value: '20' },
    { label: '待收货', value: '30' },
    { label: '已完成', value: '40' },
    { label: '退款中', value: '60' },
    { label: '已退款', value: '70' }
]
export const ORDER_STATUS_MAP = new Map([
    [20, '待发货'],
    [30, '待收货'],
    [40, '已完成'],
    [60, '退款中'],
    [70, '已退款']
])
// 商品状态
export const PRODUCT_STATUS_OPTIONS = [
    { label: '待发货', value: '20' },
    { label: '待收货', value: '30' },
    { label: '已完成', value: '40' },
    { label: '退款中', value: '60' },
    { label: '已退款', value: '70' }
]
export const PRODUCT_STATUS_MAP = new Map([
    [20, '待发货'],
    [30, '待收货'],
    [40, '已完成'],
    [60, '退款中'],
    [70, '已退款']
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

// 运费订单状态
export const FREIGHT_STATUS_OPTIONS = [
    { label: '全部', value: '' },
    { label: '待付款', value: '10', name: 'all' },
    { label: '待完成发货', value: '20', name: 'unpaid' },
    { label: '待发货', value: '30', name: 'pendingShipment' },
    { label: '已完成发货', value: '40', name: 'makeInvoice' },
    { label: '已开票', value: '50', name: 'haveMake' },
    { label: '已退款', value: '60', name: 'refunded' },
    { label: '已关闭', value: '70', name: 'closed' }
]
export const FREIGHT_STATUS_MAP = new Map([
    [10, '待付款'],
    [20, '待完成发货'],
    [30, '待收货'],
    [40, '已完成发货'],
    [50, '已开票'],
    [60, '已退款'],
    [70, '已关闭']
])
// 运费商品性质
export const MERCHANT_TYPE_OPTIONS = [
    { label: '全部', value: '' },
    { label: 'POP', value: '10' },
    { label: '自营', value: '20' }
]
export const MERCHANT_TYPE_MAP = new Map([
    [10, 'POP'],
    [20, '自营']
])
// 运费价格来源
export const SOURCES_PRICE_OPTIONS = [
    { label: '全部', value: '' },
    { label: '系统', value: '10' },
    { label: '人工', value: '20' }
]
export const SOURCES_PRICE_MAP = new Map([
    [10, '系统'],
    [20, '人工']
])
// 资金同步状态
export const SYNCHROMIZED_STATE_OPTIONS = [
    { label: '全部', value: '' },
    { label: '系统', value: '10' },
    { label: '人工', value: '20' }
]
export const SYNCHROMIZED_STATE_MAP = new Map([
    [10, '系统'],
    [20, '人工']
])
//  类型
export const FREIGHT_TYPE_OPTIONS = [
    { label: '全部', value: '' },
    { label: '运费收款', value: '10' },
    { label: '运费退款', value: '20' }
]
export const FREIGHT_TYPE_MAP = new Map([
    [10, '系统'],
    [20, '人工']
])

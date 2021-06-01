
// 运费订单状态
export const ORDER_STATUS_OPTIONS = [
    { label: '待付款', value: '10' },
    { label: '待完成发货', value: '20' },
    { label: '待发货', value: '30' },
    { label: '已完成发货', value: '40' },
    { label: '已开票', value: '50' },
    { label: '已退款', value: '60' },
    { label: '已关闭', value: '70' }
]
export const ORDER_STATUS_MAP = new Map([
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
    { label: 'POP', value: '10' },
    { label: '自营', value: '20' }
]
export const MERCHANT_TYPE_MAP = new Map([
    [10, 'POP'],
    [20, '自营']
])
// 运费价格来源
export const SOURCES_PRICE_OPTIONS = [
    { label: '系统', value: '10' },
    { label: '人工', value: '20' }
]
export const SOURCES_PRICE_MAP = new Map([
    [10, '系统'],
    [20, '人工']
])
// 资金同步状态
export const SYNCHROMIZED_STATE_OPTIONS = [
    { label: '系统', value: '10' },
    { label: '人工', value: '20' }
]
export const SYNCHROMIZED_STATE_MAP = new Map([
    [10, '系统'],
    [20, '人工']
])

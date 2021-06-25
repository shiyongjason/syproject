
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
// 资金代采商家明细类型
export const BUSINESS_DETAIL_OPTIONS = [
    { label: '全部', value: '' },
    { label: '销售回款', value: '1' },
    { label: '提现', value: '2' }
]
export const BUSINESS_DETAIL_MAP = new Map([
    [1, '销售回款'],
    [2, '提现']
])
// 资金代采商家明细状态
export const STAUTS_OPTIONS = [
    { label: '全部', value: '' },
    { label: '未处理', value: '1' },
    { label: '处理中', value: '2' },
    { label: '成功', value: '3' },
    { label: '失败', value: '4' },
    { label: '关闭', value: '5' },
    { label: '冻结中', value: '6' }
]
export const STAUTS_MAP = new Map([
    [1, '未处理'],
    [2, '处理中'],
    [3, '成功'],
    [4, '失败'],
    [5, '关闭'],
    [6, '冻结中']
])


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
    { label: '部分汇款', value: '20' },
    { label: '已回款', value: '30' }
]
export const CAPITAL_STATUS_MAP = new Map([
    [10, '未回款'],
    [20, '部分汇款'],
    [30, '已回款']
])
// 资金状态
export const CAPITALS_OPTIONS = [
    { label: '全部', value: '0' },
    { label: '未回款', value: '10' },
    { label: '部分汇款', value: '20' },
    { label: '已回款', value: '30' }
]
export const CAPITALS_MAP = new Map([
    [10, '未回款'],
    [20, '部分汇款'],
    [30, '已回款']
])
// 商家明细 回款期限
export const DEADLINE_OPTIONS = [
    { label: '最终回款日期', value: '1' },
    { label: '最近回款日期', value: '2' }
]
// 商家详情 审核时间
export const ADUITLINE_OPTIONS = [
    { label: '申请日期', value: '10' },
    { label: '审核日期', value: '20' }
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

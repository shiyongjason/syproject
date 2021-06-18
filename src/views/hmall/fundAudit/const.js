// 商家类型
export const BUSINESS_TYPE_OPTIONS = [
    { label: '全部', value: '' },
    { label: '体系内', value: '1' },
    { label: '体系外', value: '2' }
]
export const BUSINESS_TYPE_MAP = new Map([
    [1, '体系内'],
    [2, '体系外']
])
// 审核状态
export const AUDIT_STATUS_OPTIONS = [
    { label: '全部', value: '' },
    { label: '未审核', value: '1' },
    { label: '通过', value: '2' },
    { label: '失败', value: '3' }
]
export const AUDIT_STATUS_MAP = new Map([
    [1, '未审核'],
    [2, '通过'],
    [3, '失败']
])
// 期限
export const DEADLINE_OPTIONS = [
    { label: '全部', value: '' },
    { label: '3个月', value: '1' },
    { label: '6个月', value: '2' },
    { label: '12个月', value: '3' }
]
export const DEADLINE_MAP = new Map([
    [1, '3个月'],
    [2, '6个月'],
    [3, '12个月']
])
// 订单审核列表审核状态
export const AUDITLIST_STATUS_OPTIONS = [
    { label: '全部', value: '' },
    { label: '待审核', value: '1' },
    { label: '审批不通过', value: '2' },
    { label: '待打首付款', value: '3' },
    { label: '待确认首付款', value: '4' },
    { label: '待实施采购', value: '5' },
    { label: '采购已实施', value: '6' }
]
export const AUDITLIST_STATUS_MAP = new Map([
    [1, '待审核'],
    [2, '审批不通过'],
    [3, '待打首付款'],
    [4, '待确认首付款'],
    [5, '待实施采购'],
    [6, '采购已实施']
])
// 订单审核列表审核状态tab
export const AUDIT_TAB_OPTIONS = [
    { label: '全部', value: '0' },
    { label: '审核通过', value: '1' },
    { label: '审核不通过', value: '2' }
]
// 预付款状态
export const PAYMENT_STATUS_OPTIONS = [
    { label: '全部', value: '' },
    { label: '已支付', value: '1' },
    { label: '未支付', value: '2' }
]
export const PAYMENT_STATUS_MAP = new Map([
    [1, '已支付'],
    [2, '未支付']
])
// 订单状态
export const ORDER_STATUS_OPTIONS = [
    { label: '全部', value: '' },
    { label: '开启', value: '1' },
    { label: '关闭', value: '2' }
]
export const ORDER_STATUS_MAP = new Map([
    [1, '开启'],
    [2, '关闭']
])
// 订单同步状态
export const ORDER_SYNCHRONOUS_OPTIONS = [
    { label: '全部', value: '' },
    { label: '已同步', value: '1' },
    { label: '未同步', value: '2' }
]
export const ORDER_SYNCHRONOUS_MAP = new Map([
    [1, '已同步'],
    [2, '未同步']
])
// 资金同步状态
export const SYNCHRONOUS_OPTIONS = [
    { label: '全部', value: '' },
    { label: '已同步', value: '1' },
    { label: '未同步', value: '2' }
]
export const SYNCHRONOUS_MAP = new Map([
    [1, '已同步'],
    [2, '未同步']
])
// 出款状态
export const PARAGRAPH_STATUS_OPTIONS = [
    { label: '全部', value: '' },
    { label: '未采购', value: '1' },
    { label: '已采购', value: '2' }
]
export const PARAGRAPH_STATUS_MAP = new Map([
    [1, '未采购'],
    [2, '已采购']
])
// 资金状态
export const FUND_STATUS_OPTIONS = [
    { label: '全部', value: '' },
    { label: '已使用', value: '1' },
    { label: '未使用', value: '2' }
]
export const FUND_STATUS_MAP = new Map([
    [1, '已使用'],
    [2, '未使用']
])
// 货物状态
export const GOODS_STATUS_OPTIONS = [
    { label: '全部', value: '' },
    { label: '未入仓', value: '1' },
    { label: '已入仓', value: '2' }
]
export const GOODS_STATUS_MAP = new Map([
    [1, '未入仓'],
    [2, '已入仓']
])

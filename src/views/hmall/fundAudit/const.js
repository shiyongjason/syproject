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
    { label: '未审核', value: '10' },
    { label: '通过', value: '20' },
    { label: '失败', value: '30' }
]
export const AUDIT_STATUS_MAP = new Map([
    [10, '未审核'],
    [20, '通过'],
    [30, '失败'],
    [40, '已失效']
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
    { label: '审核通过', value: '20' },
    { label: '审核不通过', value: '60' }
]
// 预付款状态
export const PAYMENT_STATUS_OPTIONS = [
    { label: '全部', value: '' },
    { label: '已支付', value: '20' },
    { label: '未支付', value: '10' }
]
export const PAYMENT_STATUS_MAP = new Map([
    [20, '已支付'],
    [10, '未支付']
])
// 订单状态
export const ORDER_STATUS_OPTIONS = [
    { label: '全部', value: '' },
    { label: '开启', value: true },
    { label: '关闭', value: false }
]
export const ORDER_STATUS_MAP = new Map([
    [1, '开启'],
    [0, '关闭']
])
// 订单同步状态
export const ORDER_SYNCHRONOUS_OPTIONS = [
    { label: '全部', value: '' },
    { label: '已同步', value: '40' },
    { label: '未同步', value: '10' }
]
export const ORDER_SYNCHRONOUS_MAP = new Map([
    [40, '已同步'],
    [10, '未同步'],
    [20, '同步中'],
    [30, '同步失败'],
    [50, '不处理']
])
// 资金同步状态
export const SYNCHRONOUS_OPTIONS = [
    { label: '全部', value: '' },
    { label: '已同步', value: '40' },
    { label: '未同步', value: '10' }
]
export const SYNCHRONOUS_MAP = new Map([
    [40, '已同步'],
    [10, '未同步'],
    [20, '同步中'],
    [30, '同步失败'],
    [50, '不处理']
])
// 出款状态
export const PARAGRAPH_STATUS_OPTIONS = [
    { label: '全部', value: '' },
    { label: '未出款', value: '10' },
    { label: '已出款', value: '20' }
]
export const PARAGRAPH_STATUS_MAP = new Map([
    [10, '未出款'],
    [20, '已出款']
])
// 资金状态
export const FUND_STATUS_OPTIONS = [
    { label: '全部', value: '' },
    { label: '已使用', value: '20' },
    { label: '未使用', value: '10' }
]
export const FUND_STATUS_MAP = new Map([
    [20, '已使用'],
    [10, '未使用']
])
// 货物状态
export const GOODS_STATUS_OPTIONS = [
    { label: '全部', value: '' },
    { label: '未到仓', value: '20' },
    { label: '部分到仓', value: '30' },
    { label: '已入库', value: '40' }
]
export const GOODS_STATUS_MAP = new Map([
    [20, '未到仓'],
    [30, '部分到仓'],
    [40, '已入库']
])
// 平台确认状态
export const PLATFORM_STATUS_OPTIONS = [
    { label: '全部', value: '' },
    { label: '已确认', value: '20' },
    { label: '未确认', value: '10' },
    { label: '确认不通过', value: '30' }
]
export const PLATFORM_STATUS_MAP = new Map([
    [20, '已确认'],
    [10, '未确认'],
    [30, '确认不通过']
])
// 额度状态
export const LIMIT_STATUS_MAP = new Map([
    [true, '生效'],
    [false, '失效']
])
// 审核状态
export const AUDIT_OPTIONS = [
    { label: '全部', value: '' },
    { label: '待审核', value: '10' },
    { label: '审核通过', value: '20' },
    { label: '审核不通过', value: '60' }
]
export const AUDIT_MAP = new Map([
    [10, '待审核'],
    [20, '审核通过'],
    [60, '审核不通过']
])
// 预付款付款方式
export const PAY_OPTIONS = [
    { label: '线下转账', value: 10 },
    { label: '企业网银支付', value: 20 }
]
// 单位
export const UNIT_MAP = new Map([
    [1, '个'],
    [2, '台'],
    [3, '件'],
    [4, '套']
])
// 资金同步状态
export const FUND_SYNC_STATUS_OPTIONS = [
    { label: '全部', value: '' },
    { label: '未同步', value: '10' },
    { label: '同步中', value: '20' },
    { label: '同步失败', value: '30' },
    { label: '同步成功', value: '40' },
    { label: '不处理', value: '50' }
]
export const FUND_SYNC_STATUS_MAP = new Map([
    [40, '同步成功'],
    [10, '未同步'],
    [20, '同步中'],
    [30, '同步失败'],
    [50, '不处理']
])

// 订单状态
export const ORDER_STATUS_OPTIONS = [
    { label: '全部', value: '' },
    { label: '待发货', value: '20' },
    { label: '待收货', value: '30' },
    { label: '已完成', value: '40' },
    { label: '退款中', value: '60' },
    { label: '已退款', value: '70' }
]

export const SETTING_REQUIRED_MAP = new Map([
    [0, '是'],
    [1, '否']
])

export const SETTING_TYPE_MAP = new Map([
    [0, '输入框'],
    [1, '下拉框']
])

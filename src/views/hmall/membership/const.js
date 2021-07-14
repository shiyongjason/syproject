// 商家角色
export const BUSINESS_ROLE_OPTIONS = [
    { label: '全部', value: '' },
    { label: '商品运营型', value: '1' },
    { label: '商品型', value: '2' },
    { label: '运营型', value: '3' },
    { label: '无权限', value: '4' }
]
export const BUSINESS_ROLE_MAP = new Map([
    [1, '商品运营型'],
    [2, '商品型'],
    [3, '运营型'],
    [4, '无权限']
])
// 资金业务开通状态
export const OPENING_STATUS_OPTIONS = [
    { label: '全部', value: '' },
    { label: '开启', value: true },
    { label: '关闭', value: false }
]
export const OPENING_STATUS_MAP = new Map([
    [true, '开启'],
    [false, '关闭']
])

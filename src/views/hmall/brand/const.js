export const BRAND_STATUS = [
    { label: '全部', value: '' },
    { label: '生效', value: '1' },
    { label: '失效', value: '2' }
]

export const AUDIT_STATUS_MAP = new Map([
    [0, '待审核'],
    [1, '审核通过'],
    [2, '审核未通过'],
    [3, '过期失效']
])
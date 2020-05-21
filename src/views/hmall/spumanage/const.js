export const AUDIT_STATUS = [
    { label: '全部', value: '' },
    { label: '待审核', value: '0' },
    { label: '审核通过', value: '1' },
    { label: '审核不通过', value: '2' }
]
export const SHELF_STATUS = [
    { label: '全部', value: '' },
    { label: '下架', value: '0' },
    { label: '上架', value: '1' }
]

export const SHARE_STATUS = [
    { label: '全部', value: '' },
    { label: '下架', value: false },
    { label: '上架', value: true }
]

export const AUDIT_STATUS_MAP = new Map([
    [0, '待审核'],
    [1, '审核通过'],
    [2, '审核未通过'],
    [3, '过期失效']
])
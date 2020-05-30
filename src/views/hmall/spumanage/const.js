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
    { label: '否', value: false },
    { label: '是', value: true }
]

export const SHELF_STATUS_MAP = new Map([
    [false, '下架'],
    [true, '上架']
])
export const SHARE_STATUS_MAP = new Map([
    [false, '否'],
    [true, '是']
])

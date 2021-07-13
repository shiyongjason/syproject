export const PRODUCT_STATUS = [
    { label: '生效商品', value: 'EFFECTIVE' },
    { label: '失效商品', value: 'EFFICACY' },
    { label: '待审核', value: 'AUDIT' },
    { label: '未通过', value: 'REJECT' }
]

export const PRODUCT_AUDIT_STATUS = [
    { label: '全部', value: '4' },
    { label: '待审核', value: '0' },
    { label: '审核通过', value: '1' },
    { label: '审核未通过', value: '2' }
]
export const PROD_STATUS = [
    { label: '全部', value: '' },
    { label: '待审核', value: '0' },
    { label: '审核通过', value: '1' },
    { label: '审核未通过', value: '2' }
]
export const PRODUCT_AUDIT_MAP = new Map([
    [0, '待审核'],
    [1, '审核通过'],
    [2, '审核未通过']
])

/**
 * 生效商品
 */
export const EFFECTIVE = 'EFFECTIVE'

/**
 * 失效商品
 */
export const EFFICACY = 'EFFICACY'

/**
 * 待审核
 */
export const AUDIT = 'AUDIT'

/**
 * 未通过
 */
export const REJECT = 'REJECT'

/**
 * 全部
 */
export const ALL = 'ALL'

/**
 * 待审核
 */
export const AWAITE = 'AWAITE'

/**
 * 审核通过
 */
export const PASS = 'PASS'

/**
 * 审核未通过
 */
export const NOT = 'NOT'

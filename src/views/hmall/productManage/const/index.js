export const PRODUCT_STATUS = [
    { label: '生效商品', value: 'EFFECTIVE' },
    { label: '失效商品', value: 'EFFICACY' },
    { label: '待审核', value: 'AUDIT' },
    { label: '未通过', value: 'REJECT' }
]

export const PRODUCT_AUDIT_STATUS = [
    { label: '全部', value: 1 },
    { label: '待审核', value: 2 },
    { label: '审核通过', value: 3 },
    { label: '审核未通过', value: 4 }
]

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

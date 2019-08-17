import instance from '@/api/axios_new.js'

// 优惠劵审核列表和查询
export const findCouponList = (params) => instance.get('/ops/api/boss/coupon', { params })

// 优惠劵审核
export const createCouponReview = (params) => instance.post('/ops/api/boss/coupon/audit', params)

// 优惠劵详情
export const findCouponDetails = (params) => instance.get(`/ops/api/boss/coupon/info/${params.id}`)

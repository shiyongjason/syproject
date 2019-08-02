import instance from '@/api/axios_new.js'

// 会员店列表和查询
export const findMemberList = (params) => instance.get('/merchant/api/members/boss/member-shop/page', { params })

// 会员店审核
export const createMemberReview = (params) => instance.put(`/merchant/api/members/boss/member-shop/audit/${params.id}`, params)

// 会员店审核详情
export const findMemberDetails = (params) => instance.get('/merchant/api/members/member-shop/detail', { params })

import instance from '@/api/axios_new.js'

// 会员店列表和查询
export const findMemberList = (params) => instance.get('/merchant/api/members/page', { params })

// 会员店审核
export const createMemberReview = (params) => instance.put(`/merchant/api/members/${params.id}`, params)

// 会员店审核详情
export const findMemberDetails = (params) => instance.get(`/merchant/api/members/${params.id}`)
// 会员拉新
export const getRecomendboss = (params) => instance.get(`/merchant/api/members/recommended/boss`, { params })
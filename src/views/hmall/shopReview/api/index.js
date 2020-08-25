import instance from '@/api/axios_new.js'

// 查看活动信息
export const findActiveDetails = (params) => instance.get(`/ops/api/boss/activity/info/${params.activityId}`)
// 活动审核列表
export const findActiveList = (params) => instance.get(`/ops/api/boss/activity`, { params })
// 活动审核操作
export const createActiveReview = (params) => instance.post(`ops/api/boss/activity/audit`, params)

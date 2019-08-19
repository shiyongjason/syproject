import instance from '@/api/axios_new.js'
// 获取B2b用户信息
export const getB2bUserInfo = (params) => { instance.get(instance + 'test', params) }

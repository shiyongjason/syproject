import axios from 'axios'

// 登录
export const login = (params) => axios.post('/auth/login', params)
// 生成图片验证码
export const getVerifica = (params) => axios.get('/uaa/api/verification-code', { params })
// 获取手机验证码
export const getMobileVerifica = (params) => axios.get('/uaa/api/account/reset-password/init', { params })
// 确认手机验证码
export const confirmMobileVerifica = (params) => axios.get('/uaa/api/account/reset-password/confirm', { params })
// 重置密码
export const resetPassword = (params) => axios.post('/uaa/api/account/reset-password/finish', params)
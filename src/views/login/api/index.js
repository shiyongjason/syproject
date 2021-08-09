import axios from 'axios'
import { ossUrl } from '@/api/config'
// 登录
export const login = (params) => axios.post('/auth/login', params)
// 获取老boss用户信息
export const getUserdata = (params) => axios.get(ossUrl + '/api/login/bossLogin', { params })
// 获取菜单列表
export const findMenuList = (params) => axios.get('/uaa/api/auth/details', params)

// 发送短信验证码
export const sendMobileVerifica = (params) => axios.get('/uaa/auth/phone-login/send-verification-code', params)
// 手机验证码登录
export const phoneLogin = (params) => axios.post('/uaa/auth/phone-login', params)

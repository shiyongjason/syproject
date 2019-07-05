import axios from 'axios'
import { ossUrl } from '@/api/config'
// 登录
export const login = (params) => axios.post('/auth/login', params)
// 获取老boss用户信息
export const getUserdata = (params) => axios.get(ossUrl + '/api/login/bossLogin', { params })

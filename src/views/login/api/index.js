import axios from 'axios'

// 登录
export const login = (params) => axios.post('/api/auth/login', params)
// 获取老boss用户信息
export const getUserdata = (params) => axios.get('/api/login/bossLogin', { params })

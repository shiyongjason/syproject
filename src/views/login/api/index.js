import axios from 'axios'

// 登录
export const login = (params) => axios.post('/api/auth/login', params)

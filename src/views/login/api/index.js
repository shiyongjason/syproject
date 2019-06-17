import axios from 'axios'

// 登录
export const login = (params) => axios.post('http://192.168.27.226:31000/auth/login', params)

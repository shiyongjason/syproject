import axios from 'axios'
// 生成验证码
export const getVerifica = (params) => axios.get('/uaa/api/verification-code', params)
// 修改密码
export const editPassword = (params) => axios.post('/uaa/api/account/change-password', params)

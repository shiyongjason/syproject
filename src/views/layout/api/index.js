import axios from 'axios'

// 修改密码
export const changePassword = (params) => axios.put('/uaa/api/user/change-password', params)

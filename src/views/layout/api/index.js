import axios from 'axios'

// 修改密码
export const changePassword = (params) => axios.put('/uaa/api/users/change-password', params)

// 获取菜单列表
export const findMenuList = (params) => axios.get('/uaa/auth/details', params)

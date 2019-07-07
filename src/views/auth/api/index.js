import axios from 'axios'

// 获取菜单列表
export const findMenuList = (params) => axios.get('http://192.168.20.166:30000/uaa/employee/auth-list/1001', params)

// 角色权限保存
export const saveAuthRole = (params) => axios.post('http://192.168.20.166:30000/uaa/employee/auth', params)

// 员工查询
export const getRoleInfo = (params) => axios.get(`http://192.168.20.166:30000/uaa/employee/${params}`)
import axios from 'axios'

// 获取菜单列表
export const findMenuList = (params) => axios.get(`/uaa/api/employee/auth-list/${params}`, params)

// 角色权限保存
export const saveAuthRole = (params) => axios.post('/uaa/api/employee/auth', params)

// 员工查询
export const getRoleInfo = (params) => axios.get(`/uaa/api/employee/${params}`)
// 获取BOSS组织结构树
export const findBOSSOrganization = () => axios.get('/uaa/api/department/getDepartmentTree')

// 查询组织机构人员
export const findOrganizationEmployee = (params) => axios.post('/uaa/api/employee/queryListByDeptCode', params)

// 查询岗位信息
export const findList = (params) => axios.get(`/uaa/position/list?positionName=${params}`, params)

// 增加岗位信息
export const addList = (params) => axios.post('/uaa/position', params)

// 更新岗位信息
export const updateList = (params) => axios.put('/uaa/position', params)

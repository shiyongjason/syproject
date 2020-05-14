import axios from 'axios'

// 获取菜单列表
export const findMenuList = (params) => axios.get(`/uaa/employee/auth-list/${params}`, params)

// 角色权限保存
export const saveAuthRole = (params) => axios.post('/uaa/employee/auth', params)

// 员工查询
export const getRoleInfo = (params) => axios.get(`/uaa/employee/${params}`)

// 获取BOSS组织结构树
export const findBOSSOrganization = () => axios.get('/uaa/department/getDepartmentTree')

// 查询组织机构人员
export const findOrganizationEmployee = (params) => axios.post('/uaa/employee/queryListByDeptCode', params)

// 查询岗位信息
export const findpostList = (params) => axios.get(`/uaa/position/list?positionName=${params}`, params)

// 增加岗位信息
export const addpostList = (params) => axios.post('/uaa/position', params)

// 更新岗位信息
export const updatepostList = (params) => axios.put('/uaa/position', params)

// 删除岗位信息
export const deletepostList = (params) => axios.delete(`/uaa/position/${params}`, params)

/*
    路由配置
*/
// 查询所有权限集合
export const getAuth = (params) => axios.get(`/uaa/api/auth`)
// 新增权限 一级菜单 parentCode = 0
export const addAuth = (params) => axios.post(`/uaa/api/auth`, params)
// 新增权限类别
export const addAuthType = (params) => axios.post(`/uaa/api/auth/type`, params)
// 新增权限资源
export const addAuthResource = (params) => axios.post(`/uaa/api/auth/resource`, params)
// 修改权限资源
export const editAuthResource = (params) => axios.put(`/uaa/api/auth/resource`, params)
// 修改权限
export const editAuth = (params) => axios.put(`/uaa/api/auth`, params)
// 清空缓存
export const clearCache = (params) => axios.get(`/api/auth/refresh`)
// 同步机构
export const syncOrg = (params) => axios.post(`/backend/api/organizations/sync-jinyun`, params)
// 删除权限
export const deleteAuth = (authCode) => axios.delete(`/uaa/api/auth/${authCode}`)
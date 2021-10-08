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
export const findpostList = (params) => axios.get(`/uaa/position?positionName=${params}`, params)

// 增加岗位信息
export const addpostList = (params) => axios.post('/uaa/position', params)

// 更新岗位信息
export const updatepostList = (params) => axios.put(`/uaa/position/${params.id}`, params)

// 删除岗位信息
export const deletepostList = (params) => axios.delete(`/uaa/position/${params}`, params)

// 人员信息
export const getEmployeeInfo = (params) => axios.get(`/uaa/employee/contracts/${params}`, params)

// 岗位人员查询
export const postConfiguration = (params) => axios.get(`/uaa/position/user?positionCode=${params}`, params)

// 岗位保存
export const postSave = (params) => axios.post('/uaa/position/user', params)

// 岗位详情
export const postDetail = (params) => axios.get(`/uaa/position/${params}`, params)

// 岗位新增-权限集合
export const postAuthList = (params) => axios.get('/uaa/position/auth-list', params)

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
// 查询大区分部
export const getOrganizationTree = () => axios.get(`/uaa/department/region-subsections`)

// 大区和分部
export const getRegionsubs = (params) => axios.get(`/uaa/department/region-subsections`, { params })
export const getJobSubs = (params) => axios.get(`/uaa/employee/subsection/${params.jobNumber}/${params.authCode}`)

// 查询具体员工的权限（动态匹配岗位权限）
export const dynamicMatchPermission = (params) => axios.get(`/uaa/employee/position-auth-list/${params.jobNumber}`, { params })

// 重置权限
export const resetPermission = (params) => axios.patch(`/uaa/employee/${params.jobNumber}/reset`)

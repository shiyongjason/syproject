import axios from 'axios'

// 获取BOSS组织结构树
export const findBOSSOrganization = () => axios.get('/uaa/department/getDepartmentTree')

// 查询组织机构人员
export const findOrganizationEmployee = (params) => axios.post('/uaa/employee/queryListByDeptCode', params)

import axios from 'axios'
import { interfaceUrl } from '@/api/config'
// 根据机构id查询机构：大区 | 分部 | 区域列表
export const findDepartment = (params) => axios.get(`/uaa/department/${params.pkDeptDoc}/${params.deptType}`)
// 查询平台公司
export const findPlatformslist = (params) => axios.get(interfaceUrl + 'develop/developbasicinfo/queryCompany', { params })

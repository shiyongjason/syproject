import axios from 'axios'
import {interfaceUrl, B2bUrl } from '@/api/config'
// 台账列表
export const getAccountList = (params) => axios.get(interfaceUrl + `backend/account/list`, params)

// 分部列表查询
export const findBranchList = (params) => axios.get(interfaceUrl + 'rms/dept/queryDeptList', { params })

// 分部列表查询
export const findBranchListNew = (params) => axios.get(interfaceUrl + 'rms/subsectiontarget/subsection', { params })

// 新增各类台账
export const addAccount = (params) => axios.post(interfaceUrl + 'backend/account',  params )

export const findPlatformslist = (params) => axios.get(interfaceUrl + 'develop/developbasicinfo/queryCompany', { params})